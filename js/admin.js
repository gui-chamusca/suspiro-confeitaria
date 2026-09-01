// Admin Panel - Suspirô Confeitaria

// Senha padrão (em produção, usar hash)
const DEFAULT_PASSWORD = "suspiro2026";

// Estado do admin
let isLoggedIn = false;
let editingItemId = null;
let currentItemImage = null;

// Dados iniciais do cardápio (mesmos do app.js)
const defaultMenuItems = [
    {
        id: 1,
        name: "Brigadeiro",
        price: 3.00,
        description: "Brigadeiro tradicional cremoso, feito com leite condensado e chocolate.",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIiB2aWV3Qm94PSIwIDAgMTgwIDE4MCI+PHJlY3Qgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNCNUQ4Q0MiLz48Y2lyY2xlIGN4PSI5MCIgY3k9IjkwIiByPSI1MCIgZmlsbD0iIzREMjYxQyIvPjxjaXJjbGUgY3g9IjkwIiBjeT0iOTAiIHI9IjMwIiBmaWxsPSIjNkIzQTIwIi8+PC9zdmc+",
        category: "Doces",
        available: true
    },
    {
        id: 2,
        name: "Bolo de Cenoura",
        price: 45.00,
        description: "Bolo fofo de cenoura com cobertura generosa de chocolate.",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIiB2aWV3Qm94PSIwIDAgMTgwIDE4MCI+PHJlY3Qgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNCNUQ4Q0MiLz48cmVjdCB4PSI0MCIgeT0iNjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNzAiIHJ4PSIxMCIgZmlsbD0iI0VBNjMxNiIvPjxyZWN0IHg9IjMwIiB5PSI1MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIyMCIgcng9IjUiIGZpbGw9IiM0QTJEQjgiLz48L3N2Zz4=",
        category: "Bolos",
        available: true
    },
    {
        id: 3,
        name: "Torta de Limão",
        price: 55.00,
        description: "Torta cremosa de limão com merengue tostado e base de biscoito.",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIiB2aWV3Qm94PSIwIDAgMTgwIDE4MCI+PHJlY3Qgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNCNUQ4Q0MiLz48cmVjdCB4PSIzMCIgeT0iNzAiIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHJ4PSIxMCIgZmlsbD0iI0Y3RkZCNyIvPjxyZWN0IHg9IjI1IiB5PSI2MCIgd2lkdGg9IjEzMCIgaGVpZ2h0PSIxNSIgcng9IjgiIGZpbGw9IiNGRkZGRkYiLz48L3N2Zz4=",
        category: "Tortas",
        available: true
    },
    {
        id: 4,
        name: "Cookie de Chocolate",
        price: 8.00,
        description: "Cookie crocante com gotas de chocolate belga derretido.",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIiB2aWV3Qm94PSIwIDAgMTgwIDE4MCI+PHJlY3Qgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNCNUQ4Q0MiLz48Y2lyY2xlIGN4PSI5MCIgY3k9IjkwIiByPSI1MCIgZmlsbD0iI0Q0QTU3NCIvPjxjaXJjbGUgY3g9IjcwIiBjeT0iODAiIHI9IjgiIGZpbGw9IiM0QTJEQjgiLz48Y2lyY2xlIGN4PSIxMTAiIGN5PSI4NSIgcj0iNiIgZmlsbD0iIzRBMkRCOCIvPjxjaXJjbGUgY3g9IjkwIiBjeT0iMTA1IiByPSI3IiBmaWxsPSIjNEEyREI4Ii8+PC9zdmc+",
        category: "Cookies",
        available: true
    },
    {
        id: 5,
        name: "Cupcake de Morango",
        price: 12.00,
        description: "Cupcake fofinho com cobertura de cream cheese e morango fresco.",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIiB2aWV3Qm94PSIwIDAgMTgwIDE4MCI+PHJlY3Qgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNCNUQ4Q0MiLz48cGF0aCBkPSJNNjAgMTIwIEwxMjAgMTIwIEwxMTAgODAgTDcwIDgwIFoiIGZpbGw9IiNGRkZGRkYiLz48Y2lyY2xlIGN4PSI5MCIgY3k9IjcwIiByPSIyNSIgZmlsbD0iI0ZGNkI2QSIvPjxwYXRoIGQ9Ik04NSA1NSBMMTAwIDUwIEw5NSA2NSBaIiBmaWxsPSIjRkY0NDRCIi8+PC9zdmc+",
        category: "Cupcakes",
        available: true
    },
    {
        id: 6,
        name: "Pavê de Morango",
        price: 65.00,
        description: "Camadas de biscoito champagne, creme pasteleiro e morangos frescos.",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIiB2aWV3Qm94PSIwIDAgMTgwIDE4MCI+PHJlY3Qgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNCNUQ4Q0MiLz48cmVjdCB4PSIzMCIgeT0iNjAiIHdpZHRoPSIxMjAiIGhlaWdodD0iNzAiIHJ4PSI1IiBmaWxsPSIjRkZGQ0E5Ii8+PHJlY3QgeD0iMzAiIHk9IjcwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRkY0NDRCIi8+PHJlY3QgeD0iMzAiIHk9IjkwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRkZGQ0E5Ii8+PC9zdmc+",
        category: "Tortas",
        available: true
    },
    {
        id: 7,
        name: "Rosquinha de Açúcar",
        price: 5.00,
        description: "Rosquinha caseira fofinha polvilhada com açúcar e canela.",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIiB2aWV3Qm94PSIwIDAgMTgwIDE4MCI+PHJlY3Qgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNCNUQ4Q0MiLz48Y2lyY2xlIGN4PSI5MCIgY3k9IjkwIiByPSI0MCIgZmlsbD0iI0Q0QTU3NCIvPjxjaXJjbGUgY3g9IjkwIiBjeT0iOTAiIHI9IjE1IiBmaWxsPSIjQjVEOENDIi8+PC9zdmc+",
        category: "Doces",
        available: true
    },
    {
        id: 8,
        name: "Beijinho",
        price: 3.00,
        description: "Beijinho cremoso de coco com cobertura de granulado dourado.",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIiB2aWV3Qm94PSIwIDAgMTgwIDE4MCI+PHJlY3Qgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNCNUQ4Q0MiLz48Y2lyY2xlIGN4PSI5MCIgY3k9IjkwIiByPSIzMCIgZmlsbD0iI0ZGRTY4QyIvPjxjaXJjbGUgY3g9IjkwIiBjeT0iOTAiIHI9IjIwIiBmaWxsPSIjRkZGQ0E5Ii8+PC9zdmc+",
        category: "Doces",
        available: true
    }
];

// Inicializar admin
function initAdmin() {
    // Verificar se está logado
    const loggedIn = sessionStorage.getItem('suspiroAdminLoggedIn');
    if (loggedIn === 'true') {
        isLoggedIn = true;
        showAdminPanel();
    }

    // Carregar cardápio
    loadMenu();

    // Event listeners
    setupEventListeners();
}

// Carregar cardápio
function loadMenu() {
    const savedMenu = localStorage.getItem('suspiroMenu');
    if (savedMenu) {
        return JSON.parse(savedMenu);
    } else {
        // Salvar cardápio padrão
        localStorage.setItem('suspiroMenu', JSON.stringify(defaultMenuItems));
        return defaultMenuItems;
    }
}

// Salvar cardápio
function saveMenu(menu) {
    localStorage.setItem('suspiroMenu', JSON.stringify(menu));
}

// Renderizar lista de itens
function renderItemsList() {
    const itemsList = document.getElementById('itemsList');
    const menu = loadMenu();

    itemsList.innerHTML = '';

    menu.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'admin-item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="admin-item-image">
            <div class="admin-item-info">
                <div class="admin-item-name">${item.name}</div>
                <div class="admin-item-details">${item.description}</div>
                <div class="admin-item-details">Categoria: ${item.category} | ${item.available ? 'Disponível' : 'Indisponível'}</div>
            </div>
            <span class="admin-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
            <div class="admin-item-actions">
                <button class="edit-btn" onclick="editItem(${item.id})">Editar</button>
                <button class="delete-btn" onclick="deleteItem(${item.id})">Excluir</button>
            </div>
        `;
        itemsList.appendChild(itemDiv);
    });
}

// Editar item
function editItem(itemId) {
    const menu = loadMenu();
    const item = menu.find(i => i.id === itemId);
    if (!item) return;

    editingItemId = itemId;
    currentItemImage = item.image;

    // Preencher formulário
    document.getElementById('formTitle').textContent = 'Editar Item';
    document.getElementById('saveItemBtn').textContent = 'Salvar Alterações';
    document.getElementById('cancelBtn').style.display = 'block';
    document.getElementById('itemId').value = itemId;
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('itemDescription').value = item.description;
    document.getElementById('itemCategory').value = item.category;
    document.getElementById('itemAvailable').checked = item.available;

    // Mostrar preview da imagem
    const preview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    previewImg.src = item.image;
    preview.classList.add('active');

    // Rolar para o formulário
    document.getElementById('itemForm').scrollIntoView({ behavior: 'smooth' });
}

// Excluir item
function deleteItem(itemId) {
    showModal('Excluir Item', 'Tem certeza que deseja excluir este item do cardápio?', () => {
        let menu = loadMenu();
        menu = menu.filter(i => i.id !== itemId);
        saveMenu(menu);
        renderItemsList();
        showSuccessMessage('Item excluído com sucesso!');
    });
}

// Limpar formulário
function clearForm() {
    editingItemId = null;
    currentItemImage = null;
    document.getElementById('formTitle').textContent = 'Adicionar Novo Item';
    document.getElementById('saveItemBtn').textContent = 'Adicionar Item';
    document.getElementById('cancelBtn').style.display = 'none';
    document.getElementById('itemForm').reset();
    document.getElementById('itemId').value = '';
    document.getElementById('imagePreview').classList.remove('active');
    document.getElementById('itemAvailable').checked = true;
}

// Salvar item
function saveItem(e) {
    e.preventDefault();

    const menu = loadMenu();
    const name = document.getElementById('itemName').value.trim();
    const price = parseFloat(document.getElementById('itemPrice').value);
    const description = document.getElementById('itemDescription').value.trim();
    const category = document.getElementById('itemCategory').value;
    const available = document.getElementById('itemAvailable').checked;
    const image = currentItemImage || generatePlaceholderImage(name);

    if (editingItemId) {
        // Editar item existente
        const index = menu.findIndex(i => i.id === editingItemId);
        if (index !== -1) {
            menu[index] = {
                ...menu[index],
                name,
                price,
                description,
                category,
                available,
                image
            };
        }
    } else {
        // Adicionar novo item
        const newId = menu.length > 0 ? Math.max(...menu.map(i => i.id)) + 1 : 1;
        menu.push({
            id: newId,
            name,
            price,
            description,
            category,
            available,
            image
        });
    }

    saveMenu(menu);
    renderItemsList();
    clearForm();
    showSuccessMessage(editingItemId ? 'Item atualizado com sucesso!' : 'Item adicionado com sucesso!');
}

// Gerar imagem placeholder
function generatePlaceholderImage(name) {
    const colors = ['#F4A3A0', '#B5D8CC', '#FFE4B5', '#E6E6FA', '#98FB98'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const initial = name.charAt(0).toUpperCase();
    
    return `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
            <rect width="180" height="180" fill="${color}"/>
            <text x="90" y="90" font-family="Arial" font-size="48" fill="#333" text-anchor="middle" dominant-baseline="middle">${initial}</text>
        </svg>
    `)}`;
}

// Login
function login(password) {
    // Verificar senha salva ou usar padrão
    const savedPassword = localStorage.getItem('suspiroAdminPassword') || DEFAULT_PASSWORD;
    
    if (password === savedPassword) {
        isLoggedIn = true;
        sessionStorage.setItem('suspiroAdminLoggedIn', 'true');
        showAdminPanel();
        return true;
    }
    return false;
}

// Logout
function logout() {
    isLoggedIn = false;
    sessionStorage.removeItem('suspiroAdminLoggedIn');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
}

// Mostrar painel admin
function showAdminPanel() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    renderItemsList();
    loadConfig();
}

// Carregar configurações
function loadConfig() {
    const config = JSON.parse(localStorage.getItem('suspiroConfig') || '{}');
    document.getElementById('businessName').value = config.businessName || 'Suspirô Confeitaria';
    document.getElementById('ownerName').value = config.ownerName || 'Graci';
    document.getElementById('whatsappNumber').value = config.whatsappNumber || '5511999999999';
}

// Salvar configurações
function saveConfig() {
    const config = {
        businessName: document.getElementById('businessName').value,
        ownerName: document.getElementById('ownerName').value,
        whatsappNumber: document.getElementById('whatsappNumber').value
    };
    localStorage.setItem('suspiroConfig', JSON.stringify(config));

    // Salvar nova senha se fornecida
    const newPassword = document.getElementById('newPassword').value;
    if (newPassword) {
        localStorage.setItem('suspiroAdminPassword', newPassword);
        document.getElementById('newPassword').value = '';
    }

    showSuccessMessage('Configurações salvas com sucesso!');
}

// Mostrar modal
function showModal(title, message, onConfirm) {
    const modal = document.getElementById('modalOverlay');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    modal.classList.add('active');

    const confirmBtn = document.getElementById('modalConfirm');
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
    newConfirmBtn.addEventListener('click', () => {
        onConfirm();
        closeModal();
    });
}

// Fechar modal
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

// Mostrar mensagem de sucesso
function showSuccessMessage(message) {
    const div = document.createElement('div');
    div.className = 'success-message';
    div.textContent = message;
    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}

// Setup event listeners
function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('password').value;
        if (!login(password)) {
            alert('Senha incorreta!');
        }
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Item form
    document.getElementById('itemForm').addEventListener('submit', saveItem);

    // Cancel button
    document.getElementById('cancelBtn').addEventListener('click', clearForm);

    // Save config
    document.getElementById('saveConfigBtn').addEventListener('click', saveConfig);

    // Image upload
    document.getElementById('itemImage').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                currentItemImage = event.target.result;
                const preview = document.getElementById('imagePreview');
                const previewImg = document.getElementById('previewImg');
                previewImg.src = currentItemImage;
                preview.classList.add('active');
            };
            reader.readAsDataURL(file);
        }
    });

    // Modal close
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalCancel').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
        if (e.target === document.getElementById('modalOverlay')) {
            closeModal();
        }
    });
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', initAdmin);
