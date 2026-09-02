// Admin Panel - Suspirô Confeitaria

// Estado do admin
let isLoggedIn = false;
let editingItemId = null;
let currentItemImage = null;
let adminToken = null;
let menuItems = [];

// ==================== INICIALIZAÇÃO ====================

// Inicializar admin
async function initAdmin() {
    // Verificar se está logado
    const savedToken = sessionStorage.getItem('suspiroAdminToken');
    if (savedToken) {
        adminToken = savedToken;
        isLoggedIn = true;
        showAdminPanel();
    }

    // Event listeners
    setupEventListeners();
}

// ==================== API ====================

// Buscar cardápio da API
async function loadMenuFromAPI() {
    try {
        const response = await fetch('/api/menu');
        if (response.ok) {
            const data = await response.json();
            menuItems = data.items || [];
            return menuItems;
        }
    } catch (error) {
        console.error('Erro ao carregar cardápio:', error);
    }
    return [];
}

// Salvar cardápio na API
async function saveMenuToAPI(menu) {
    try {
        const response = await fetch('/api/menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Admin-Password': adminToken
            },
            body: JSON.stringify({ items: menu })
        });
        
        if (response.ok) {
            return true;
        } else {
            const error = await response.json();
            throw new Error(error.error || 'Erro ao salvar');
        }
    } catch (error) {
        console.error('Erro ao salvar cardápio:', error);
        alert('Erro ao salvar: ' + error.message);
        return false;
    }
}

// Buscar configurações da API
async function loadConfigFromAPI() {
    try {
        const response = await fetch('/api/config');
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error('Erro ao carregar configurações:', error);
    }
    return {};
}

// Salvar configurações na API
async function saveConfigToAPI(config) {
    try {
        const response = await fetch('/api/config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Admin-Password': adminToken
            },
            body: JSON.stringify(config)
        });
        
        if (response.ok) {
            return true;
        } else {
            const error = await response.json();
            throw new Error(error.error || 'Erro ao salvar');
        }
    } catch (error) {
        console.error('Erro ao salvar configurações:', error);
        alert('Erro ao salvar: ' + error.message);
        return false;
    }
}

// ==================== LOGIN ====================

// Login
async function login(password) {
    try {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        });
        
        if (response.ok) {
            const data = await response.json();
            adminToken = password;
            isLoggedIn = true;
            sessionStorage.setItem('suspiroAdminToken', password);
            showAdminPanel();
            return true;
        }
        return false;
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return false;
    }
}

// Logout
function logout() {
    isLoggedIn = false;
    adminToken = null;
    sessionStorage.removeItem('suspiroAdminToken');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
}

// Mostrar painel admin
async function showAdminPanel() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    
    // Carregar dados da API
    await loadMenuFromAPI();
    renderItemsList();
    await loadConfigUI();
}

// ==================== MENU ====================

// Renderizar lista de itens
function renderItemsList() {
    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = '';

    menuItems.forEach(item => {
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
    const item = menuItems.find(i => i.id === itemId);
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
    showModal('Excluir Item', 'Tem certeza que deseja excluir este item do cardápio?', async () => {
        menuItems = menuItems.filter(i => i.id !== itemId);
        await saveMenuToAPI(menuItems);
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
async function saveItem(e) {
    e.preventDefault();

    const name = document.getElementById('itemName').value.trim();
    const price = parseFloat(document.getElementById('itemPrice').value);
    const description = document.getElementById('itemDescription').value.trim();
    const category = document.getElementById('itemCategory').value;
    const available = document.getElementById('itemAvailable').checked;
    const image = currentItemImage || generatePlaceholderImage(name);

    if (editingItemId) {
        // Editar item existente
        const index = menuItems.findIndex(i => i.id === editingItemId);
        if (index !== -1) {
            menuItems[index] = {
                ...menuItems[index],
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
        const newId = menuItems.length > 0 ? Math.max(...menuItems.map(i => i.id)) + 1 : 1;
        menuItems.push({
            id: newId,
            name,
            price,
            description,
            category,
            available,
            image
        });
    }

    const saved = await saveMenuToAPI(menuItems);
    if (saved) {
        renderItemsList();
        clearForm();
        showSuccessMessage(editingItemId ? 'Item atualizado com sucesso!' : 'Item adicionado com sucesso!');
    }
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

// ==================== CONFIGURAÇÕES ====================

// Carregar configurações na UI
async function loadConfigUI() {
    const config = await loadConfigFromAPI();
    document.getElementById('businessName').value = config.businessName || 'Suspirô Confeitaria';
    document.getElementById('ownerName').value = config.ownerName || 'Graci';
    document.getElementById('whatsappNumber').value = config.whatsappNumber || '5511972006824';
}

// Salvar configurações
async function saveConfig() {
    const config = {
        businessName: document.getElementById('businessName').value,
        ownerName: document.getElementById('ownerName').value,
        whatsappNumber: document.getElementById('whatsappNumber').value
    };

    // Salvar nova senha se fornecida
    const newPassword = document.getElementById('newPassword').value;
    if (newPassword) {
        config.adminPassword = newPassword;
        document.getElementById('newPassword').value = '';
    }

    const saved = await saveConfigToAPI(config);
    if (saved) {
        showSuccessMessage('Configurações salvas com sucesso!');
    }
}

// ==================== UI ====================

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

// ==================== EVENT LISTENERS ====================

// Setup event listeners
function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const password = document.getElementById('password').value;
        const success = await login(password);
        if (!success) {
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
