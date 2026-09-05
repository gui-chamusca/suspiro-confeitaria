const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.static('.'));

// Servir arquivos .html sem extensão
app.get('/:name', (req, res) => {
    const filePath = path.join(__dirname, `${req.params.name}.html`);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Página não encontrada');
    }
});

// Caminhos dos arquivos
const MENU_FILE = path.join(__dirname, 'data', 'menu.json');
const CONFIG_FILE = path.join(__dirname, 'data', 'config.json');
const VENDAS_DIA_FILE = path.join(__dirname, 'data', 'vendas-dia.json');
const NOITES_PIZZA_FILE = path.join(__dirname, 'data', 'noites-pizza.json');
const FIADOS_FILE = path.join(__dirname, 'data', 'fiados.json');
const ENCOMENDAS_FILE = path.join(__dirname, 'data', 'encomendas.json');
const SABORES_PIZZA_FILE = path.join(__dirname, 'data', 'sabores-pizza.json');

function readJsonArray(file, fallback) {
    try {
        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, JSON.stringify(fallback, null, 2));
            return fallback;
        }
        const raw = fs.readFileSync(file, 'utf8') || '[]';
        return JSON.parse(raw);
    } catch (e) {
        return fallback;
    }
}
function writeJson(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Middleware de autenticação (senha via env na Railway, config.json só local)
function getAdminPassword() {
    if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
    try {
        const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
        return config.adminPassword || 'suspiro2026';
    } catch (error) {
        return 'suspiro2026';
    }
}
function authMiddleware(req, res, next) {
    const password = req.headers['x-admin-password'];
    if (password === getAdminPassword()) {
        next();
    } else {
        res.status(401).json({ error: 'Senha incorreta' });
    }
}

// ==================== ROTAS PÚBLICAS ====================

// GET /api/menu - Buscar cardápio (público)
app.get('/api/menu', (req, res) => {
    try {
        const data = fs.readFileSync(MENU_FILE, 'utf8');
        const menu = JSON.parse(data);
        res.json(menu);
    } catch (error) {
        console.error('Erro ao ler cardápio:', error);
        res.status(500).json({ error: 'Erro ao ler cardápio' });
    }
});

// GET /api/config - Buscar configurações (público)
app.get('/api/config', (req, res) => {
    try {
        const data = fs.readFileSync(CONFIG_FILE, 'utf8');
        const config = JSON.parse(data);
        // Não enviar a senha para o frontend
        const { adminPassword, ...publicConfig } = config;
        res.json(publicConfig);
    } catch (error) {
        console.error('Erro ao ler configurações:', error);
        res.status(500).json({ error: 'Erro ao ler configurações' });
    }
});

// ==================== ROTAS ADMIN (PROTEGIDAS) ====================

// POST /api/menu - Salvar cardápio (admin)
app.post('/api/menu', authMiddleware, (req, res) => {
    try {
        fs.writeFileSync(MENU_FILE, JSON.stringify(req.body, null, 2));
        res.json({ success: true, message: 'Cardápio atualizado!' });
    } catch (error) {
        console.error('Erro ao salvar cardápio:', error);
        res.status(500).json({ error: 'Erro ao salvar cardápio' });
    }
});

// POST /api/config - Salvar configurações (admin)
app.post('/api/config', authMiddleware, (req, res) => {
    try {
        // Manter a senha existente se não fornecida nova
        let existingConfig = {};
        try {
            const data = fs.readFileSync(CONFIG_FILE, 'utf8');
            existingConfig = JSON.parse(data);
        } catch (e) {
            // Ignorar erro
        }
        
        const newConfig = {
            ...req.body,
            adminPassword: req.body.adminPassword || existingConfig.adminPassword || 'suspiro2026'
        };
        
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(newConfig, null, 2));
        res.json({ success: true, message: 'Configurações salvas!' });
    } catch (error) {
        console.error('Erro ao salvar configurações:', error);
        res.status(500).json({ error: 'Erro ao salvar configurações' });
    }
});

// POST /api/auth - Verificar senha (admin)
app.post('/api/auth', (req, res) => {
    const { password } = req.body;
    if (password === getAdminPassword()) {
        res.json({ success: true, token: password });
    } else {
        res.status(401).json({ success: false, error: 'Senha incorreta' });
    }
});

// ==================== MEU NEGOCINHO (Graci, sem integração) ====================

// GET públicos (leitura simples, sem senha para facilitar uso em casa)
app.get('/api/vendas-dia', (req, res) => {
    res.json(readJsonArray(VENDAS_DIA_FILE, []));
});
app.get('/api/noites-pizza', (req, res) => {
    res.json(readJsonArray(NOITES_PIZZA_FILE, []));
});
app.get('/api/fiados', (req, res) => {
    res.json(readJsonArray(FIADOS_FILE, []));
});
app.get('/api/encomendas', (req, res) => {
    res.json(readJsonArray(ENCOMENDAS_FILE, []));
});
app.get('/api/sabores-pizza', (req, res) => {
    try {
        const raw = fs.readFileSync(SABORES_PIZZA_FILE, 'utf8');
        res.json(JSON.parse(raw));
    } catch (e) {
        res.json({ sabores: [], custo_x_padrao: 0 });
    }
});

// POST protegidos (exigem senha admin)
app.post('/api/vendas-dia', authMiddleware, (req, res) => {
    try {
        const arr = readJsonArray(VENDAS_DIA_FILE, []);
        const item = { id: Date.now(), ...req.body };
        arr.push(item);
        // fiados embutidos vão para fiados.json
        if (Array.isArray(req.body.fiados)) {
            const fi = readJsonArray(FIADOS_FILE, []);
            req.body.fiados.forEach(f => {
                if (f.nome && Number(f.valor) > 0) fi.push({ id: Date.now() + Math.random(), data: req.body.data, cliente: f.nome, valor: Number(f.valor), negocio: 'suspiro', pago: false, origem_id: item.id });
            });
            writeJson(FIADOS_FILE, fi);
        }
        writeJson(VENDAS_DIA_FILE, arr);
        res.json({ success: true, id: item.id });
    } catch (e) { res.status(500).json({ error: 'Erro ao salvar venda do dia' }); }
});

app.post('/api/noites-pizza', authMiddleware, (req, res) => {
    try {
        const arr = readJsonArray(NOITES_PIZZA_FILE, []);
        const item = { id: Date.now(), ...req.body };
        arr.push(item);
        if (Array.isArray(req.body.fiados)) {
            const fi = readJsonArray(FIADOS_FILE, []);
            req.body.fiados.forEach(f => {
                if (f.nome && Number(f.valor) > 0) fi.push({ id: Date.now() + Math.random(), data: req.body.data, cliente: f.nome, valor: Number(f.valor), negocio: 'pizza', pago: false, origem_id: item.id });
            });
            writeJson(FIADOS_FILE, fi);
        }
        writeJson(NOITES_PIZZA_FILE, arr);
        res.json({ success: true, id: item.id });
    } catch (e) { res.status(500).json({ error: 'Erro ao salvar noite de pizza' }); }
});

app.post('/api/encomendas', authMiddleware, (req, res) => {
    try {
        const arr = readJsonArray(ENCOMENDAS_FILE, []);
        const item = { id: Date.now(), status: 'aberta', ...req.body };
        arr.push(item);
        writeJson(ENCOMENDAS_FILE, arr);
        res.json({ success: true, id: item.id });
    } catch (e) { res.status(500).json({ error: 'Erro ao salvar encomenda' }); }
});

app.put('/api/encomendas/:id', authMiddleware, (req, res) => {
    try {
        const arr = readJsonArray(ENCOMENDAS_FILE, []);
        const idx = arr.findIndex(x => String(x.id) === String(req.params.id));
        if (idx < 0) return res.status(404).json({ error: 'Não achado' });
        arr[idx] = { ...arr[idx], ...req.body };
        writeJson(ENCOMENDAS_FILE, arr);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: 'Erro ao atualizar' }); }
});

app.put('/api/fiados/:id', authMiddleware, (req, res) => {
    try {
        const arr = readJsonArray(FIADOS_FILE, []);
        const idx = arr.findIndex(x => String(x.id) === String(req.params.id));
        if (idx < 0) return res.status(404).json({ error: 'Não achado' });
        arr[idx] = { ...arr[idx], ...req.body };
        writeJson(FIADOS_FILE, arr);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: 'Erro ao atualizar fiado' }); }
});

app.delete('/api/vendas-dia/:id', authMiddleware, (req, res) => {
    const arr = readJsonArray(VENDAS_DIA_FILE, []).filter(x => String(x.id) !== String(req.params.id));
    writeJson(VENDAS_DIA_FILE, arr);
    res.json({ success: true });
});
app.delete('/api/noites-pizza/:id', authMiddleware, (req, res) => {
    const arr = readJsonArray(NOITES_PIZZA_FILE, []).filter(x => String(x.id) !== String(req.params.id));
    writeJson(NOITES_PIZZA_FILE, arr);
    res.json({ success: true });
});

// ==================== CONTÁBIL SEMANAL (só leitura agregada, fora do app da Graci) ====================
function mondayOf(dateStr) {
    const d = dateStr ? new Date(dateStr + 'T12:00:00') : new Date();
    const day = (d.getDay() + 6) % 7; // seg=0
    d.setDate(d.getDate() - day);
    return d;
}
function fmtD(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }

app.get('/api/resumo', (req, res) => {
    try {
        // default: semana atual seg-dom
        const base = mondayOf(req.query.ref);
        const de = req.query.de || fmtD(base);
        const fim = new Date(base); fim.setDate(fim.getDate() + 6);
        const ate = req.query.ate || fmtD(fim);
        const neg = req.query.negocio || 'tudo';

        const dias = readJsonArray(VENDAS_DIA_FILE, []).filter(x => x.data >= de && x.data <= ate);
        const pizzas = readJsonArray(NOITES_PIZZA_FILE, []).filter(x => x.data >= de && x.data <= ate);
        const fiados = readJsonArray(FIADOS_FILE, []).filter(x => !x.pago);
        const encs = readJsonArray(ENCOMENDAS_FILE, []).filter(x => x.status !== 'entregue');

        let susFat = 0, susGasto = 0; const porProduto = {};
        if (neg === 'tudo' || neg === 'suspiro') dias.forEach(d => {
            susFat += Number(d.total_vendas) || 0; susGasto += Number(d.gasto_total) || 0;
            if (d.itens) Object.entries(d.itens).forEach(([k, v]) => {
                porProduto[k] = porProduto[k] || { qtd: 0, valor: 0 };
                porProduto[k].qtd += Number(v.qtd) || 0; porProduto[k].valor += Number(v.valor) || 0;
            });
        });
        let pizFat = 0, pizCusto = 0, pizQtd = 0; const porSabor = {};
        if (neg === 'tudo' || neg === 'pizza') pizzas.forEach(p => {
            pizFat += Number(p.faturamento) || 0; pizCusto += Number(p.custo_total) || 0; pizQtd += Number(p.qtd) || 0;
            if (p.sabores) Object.entries(p.sabores).forEach(([k, v]) => {
                porSabor[k] = porSabor[k] || { fina: 0, grossa: 0 };
                porSabor[k].fina += Number(v.fina) || 0; porSabor[k].grossa += Number(v.grossa) || 0;
            });
        });
        res.json({
            de, ate, negocio: neg,
            suspiro: { faturamento: susFat, gasto: susGasto, sobrou: susFat - susGasto, margem: susFat ? (susFat - susGasto) / susFat : 0 },
            pizza: { faturamento: pizFat, custo: pizCusto, lucro: pizFat - pizCusto, margem: pizFat ? (pizFat - pizCusto) / pizFat : 0, qtd: pizQtd, ticket: pizQtd ? pizFat / pizQtd : 0 },
            total: { faturamento: susFat + pizFat, custo: susGasto + pizCusto, sobrou: (susFat - susGasto) + (pizFat - pizCusto) },
            fiado_aberto: fiados.reduce((s, f) => s + (Number(f.valor) || 0), 0),
            fiados_qtd: fiados.length,
            encomendas_abertas: encs.length,
            encomendas_falta: encs.reduce((s, e) => s + (Number(e.falta) || 0), 0),
            porProduto, porSabor,
            dias_qtd: dias.length, noites_qtd: pizzas.length
        });
    } catch (e) { res.status(500).json({ error: 'Erro no resumo' }); }
});

app.get('/api/export.csv', (req, res) => {
    try {
        const tipo = req.query.tipo || 'dia'; // dia | pizza | fiados | encomendas
        let rows = [];
        if (tipo === 'dia') rows = readJsonArray(VENDAS_DIA_FILE, []);
        else if (tipo === 'pizza') rows = readJsonArray(NOITES_PIZZA_FILE, []);
        else if (tipo === 'fiados') rows = readJsonArray(FIADOS_FILE, []);
        else rows = readJsonArray(ENCOMENDAS_FILE, []);
        if (!rows.length) { res.header('Content-Type', 'text/csv; charset=utf-8'); return res.send('sep=;\n(nenhum dado)\n'); }
        const cols = Object.keys(rows[0]);
        const esc = v => {
            if (v && typeof v === 'object') v = JSON.stringify(v);
            v = String(v ?? '');
            return `"${v.replace(/"/g, '""')}"`;
        };
        const csv = 'sep=;\n' + cols.join(';') + '\n' + rows.map(r => cols.map(c => esc(r[c])).join(';')).join('\n');
        res.header('Content-Type', 'text/csv; charset=utf-8');
        res.header('Content-Disposition', `attachment; filename="${tipo}-semana.csv"`);
        res.send('\ufeff' + csv);
    } catch (e) { res.status(500).json({ error: 'Erro export' }); }
});

// ==================== INICIAR SERVIDOR (rede local WiFi, sem internet) ====================

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na rede local porta ${PORT}`);
    console.log(`PC: http://127.0.0.1:${PORT}`);
    console.log(`Celular (mesma WiFi): http://192.168.0.10:${PORT}/meu-negocinho.html`);
});
