const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.static('.'));

// Caminhos dos arquivos
const MENU_FILE = path.join(__dirname, 'data', 'menu.json');
const CONFIG_FILE = path.join(__dirname, 'data', 'config.json');

// Middleware de autenticação
function authMiddleware(req, res, next) {
    const password = req.headers['x-admin-password'];
    
    // Ler senha do config
    let adminPassword = 'suspiro2026';
    try {
        const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
        adminPassword = config.adminPassword || adminPassword;
    } catch (error) {
        console.log('Usando senha padrão');
    }
    
    if (password === adminPassword) {
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
    
    let adminPassword = 'suspiro2026';
    try {
        const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
        adminPassword = config.adminPassword || adminPassword;
    } catch (error) {
        // Ignorar erro
    }
    
    if (password === adminPassword) {
        res.json({ success: true, token: password });
    } else {
        res.status(401).json({ success: false, error: 'Senha incorreta' });
    }
});

// ==================== INICIAR SERVIDOR ====================

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});
