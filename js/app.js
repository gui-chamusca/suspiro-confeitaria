// Dados iniciais do cardápio
const defaultMenuItems = [
    {
        id: 1,
        name: "Suspiros Clássicos",
        price: 12.00,
        description: "Merengues leves e crocantes, derretendo na boca. Fofurinha da vovó.",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTIwIDEyMCI+PHJlY3Qgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiNGRkU1RTEiLz48Y2lyY2xlIGN4PSI2MCIgY3k9IjUwIiByPSIyNSIgZmlsbD0iI0ZGQ0I5NSIvPjxwYXRoIGQ9Ik00MCA4MCBRNjAgNjAgODAgODAiIHN0cm9rZT0iI0U4OTE4RSIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+PC9zdmc+",
        category: "Doces",
        available: true,
        badge: null
    },
    {
        id: 2,
        name: "Bolo de Paçoca",
        price: 28.00,
        description: "Massa fofinha com pedaços de paçoca e cobertura caramelizada.",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTIwIDEyMCI+PHJlY3Qgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiNGRkU1RTEiLz48cmVjdCB4PSIzMCIgeT0iNDAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI1MCIgcng9IjgiIGZpbGw9IiNENkE1NzQiLz48cmVjdCB4PSIyNSIgeT0iMzUiIHdpZHRoPSI3MCIgaGVpZ2h0PSIxNSIgcng9IjgiIGZpbGw9IiNGRkZGRkYiLz48L3N2Zz4=",
        category: "Bolos",
        available: true,
        badge: "popular"
    },
    {
        id: 3,
        name: "Brigadeiro Gourmet",
        price: 18.00,
        description: "Brigadeiro cremoso com granulado belga, no ponto perfeito.",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTIwIDEyMCI+PHJlY3Qgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiNGRkU1RTEiLz48Y2lyY2xlIGN4PSI2MCIgY3k9IjU1IiByPSIyMiIgZmlsbD0iIzRBMkRCOCIvPjxjaXJjbGUgY3g9IjYwIiBjeT0iNTUiIHI9IjEyIiBmaWxsPSIjNkIzQTIwIi8+PC9zdmc+",
        category: "Doces",
        available: true,
        badge: "popular"
    },
    {
        id: 4,
        name: "Mousse de Maracujá",
        price: 16.00,
        description: "Mousse aveludado com calda de maracujá fresco por cima.",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTIwIDEyMCI+PHJlY3Qgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiNGRkU1RTEiLz48cmVjdCB4PSIzMCIgeT0iNDUiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0MCIgcng9IjgiIGZpbGw9IiNGRkZDOTUiLz48cGF0aCBkPSIzMCA1NSBRNjAgNDAgOTAgNTUiIHN0cm9rZT0iI0ZGQjc1NCIgc3Ryb2tlLXdpZHRoPSI0IiBmaWxsPSJub25lIi8+PC9zdmc+",
        category: "Tortas",
        available: true,
        badge: null
    },
    {
        id: 5,
        name: "Beijinho de Coco",
        price: 14.00,
        description: "Docinho de coco fresco com toque de leite condensado e cravo.",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTIwIDEyMCI+PHJlY3Qgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiNGRkU1RTEiLz48Y2lyY2xlIGN4PSI2MCIgY3k9IjU1IiByPSIyMiIgZmlsbD0iI0ZGRUZGQSIvPjxjaXJjbGUgY3g9IjYwIiBjeT0iNTUiIHI9IjEyIiBmaWxsPSIjRkZGQ0E5Ii8+PC9zdmc+",
        category: "Doces",
        available: true,
        badge: null
    },
    {
        id: 6,
        name: "Bolo de Cenoura",
        price: 45.00,
        description: "Bolo fofo de cenoura com cobertura generosa de chocolate belga.",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTIwIDEyMCI+PHJlY3Qgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiNGRkU1RTEiLz48cmVjdCB4PSIyNSIgeT0iNDUiIHdpZHRoPSI3MCIgaGVpZ2h0PSI0NSIgcng9IjgiIGZpbGw9IiNFQTYzMTYiLz48cmVjdCB4PSIyMCIgeT0iMzgiIHdpZHRoPSI4MCIgaGVpZ2h0PSIxNSIgcng9IjgiIGZpbGw9IiM0QTJEQjgiLz48L3N2Zz4=",
        category: "Bolos",
        available: true,
        badge: null
    },
    {
        id: 7,
        name: "Torta de Limão",
        price: 55.00,
        description: "Torta cremosa de limão com merengue tostado e base de biscoito.",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTIwIDEyMCI+PHJlY3Qgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiNGRkU1RTEiLz48cmVjdCB4PSIyNSIgeT0iNTAiIHdpZHRoPSI3MCIgaGVpZ2h0PSI0MCIgcng9IjgiIGZpbGw9IiNGRkZGIjciLz48cmVjdCB4PSIyMCIgeT0iNDMiIHdpZHRoPSI4MCIgaGVpZ2h0PSIxMiIgcng9IjgiIGZpbGw9IiNGRkZGRkYiLz48L3N2Zz4=",
        category: "Tortas",
        available: true,
        badge: "new"
    },
    {
        id: 8,
        name: "Cookie de Chocolate",
        price: 8.00,
        description: "Cookie crocante com gotas de chocolate belga derretido.",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTIwIDEyMCI+PHJlY3Qgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiNGRkU1RTEiLz48Y2lyY2xlIGN4PSI2MCIgY3k9IjU1IiByPSIyNSIgZmlsbD0iI0Q0QTU3NCIvPjxjaXJjbGUgY3g9IjQ1IiBjeT0iNDUiIHI9IjUiIGZpbGw9IiM0QTJEQjgiLz48Y2lyY2xlIGN4PSI3MCIgY3k9IjQ4IiByPSI0IiBmaWxsPSIjNEEyREI4Ii8+PC9zdmc+",
        category: "Cookies",
        available: true,
        badge: "new"
    }
];

// Configurações do app
const appConfig = {
    businessName: "Suspirô Confeitaria",
    ownerName: "Graci",
    whatsappNumber: "5511972006824"
};

// Estado do aplicativo
let menuItems = [];
let cart = [];

// Inicializar o app
function initApp() {
    // Carregar cardápio do localStorage ou usar padrão
    const savedMenu = localStorage.getItem('suspiroMenu');
    if (savedMenu) {
        menuItems = JSON.parse(savedMenu);
    } else {
        menuItems = defaultMenuItems;
        saveMenu();
    }

    // Carregar carrinho do localStorage
    const savedCart = localStorage.getItem('suspiroCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    // Carregar configurações
    loadConfig();

    // Renderizar cardápio
    renderMenu();
    updateCart();
}

// Carregar configurações
function loadConfig() {
    const savedConfig = localStorage.getItem('suspiroConfig');
    if (savedConfig) {
        const config = JSON.parse(savedConfig);
        appConfig.businessName = config.businessName || appConfig.businessName;
        appConfig.ownerName = config.ownerName || appConfig.ownerName;
        appConfig.whatsappNumber = config.whatsappNumber || appConfig.whatsappNumber;
    }
}

// Salvar cardápio no localStorage
function saveMenu() {
    localStorage.setItem('suspiroMenu', JSON.stringify(menuItems));
}

// Salvar carrinho no localStorage
function saveCart() {
    localStorage.setItem('suspiroCart', JSON.stringify(cart));
}

// Renderizar cardápio
function renderMenu() {
    const menuList = document.getElementById('menuList');
    menuList.innerHTML = '';

    const availableItems = menuItems.filter(item => item.available);

    availableItems.forEach(item => {
        const menuItem = createMenuItem(item);
        menuList.appendChild(menuItem);
    });
}

// Criar elemento do cardápio
function createMenuItem(item) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    
    let badgeHTML = '';
    if (item.badge === 'popular') {
        badgeHTML = '<span class="menu-item-badge badge-popular">🔥 Popular</span>';
    } else if (item.badge === 'new') {
        badgeHTML = '<span class="menu-item-badge badge-new">✨ Novo</span>';
    }
    
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="menu-item-image" onclick="openLightbox(${item.id})">
        <div class="menu-item-content">
            <div class="menu-item-header">
                <h3 class="menu-item-name">${item.name}</h3>
                ${badgeHTML}
            </div>
            <p class="menu-item-description">${item.description}</p>
            <div class="menu-item-footer">
                <span class="menu-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                <button class="add-btn" onclick="addToCart(${item.id})">+ Adicionar</button>
            </div>
        </div>
    `;
    return div;
}

// Adicionar item ao carrinho
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const existingItem = cart.find(i => i.id === itemId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        });
    }

    saveCart();
    updateCart();
    showToast(`${item.name} adicionado!`);
}

// Remover item do carrinho
function removeFromCart(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    saveCart();
    updateCart();
}

// Atualizar quantidade
function updateQuantity(itemId, delta) {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        saveCart();
        updateCart();
    }
}

// Atualizar exibição do carrinho
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const totalValue = document.getElementById('totalValue');
    const cartTotalHeader = document.getElementById('cartTotalHeader');
    const cartCount = document.getElementById('cartCount');
    const cartBar = document.getElementById('cartBar');
    const cartBarCount = document.getElementById('cartBarCount');
    const cartBarTotal = document.getElementById('cartBarTotal');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Atualizar header
    cartTotalHeader.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    cartCount.textContent = count;

    // Atualizar barra do carrinho
    if (cartBar && cartBarCount && cartBarTotal) {
        if (cart.length === 0) {
            cartBar.style.display = 'none';
            document.body.classList.remove('has-cart-bar');
        } else {
            cartBar.style.display = 'flex';
            cartBarCount.textContent = `(${count}) ${count === 1 ? 'item' : 'itens'}`;
            cartBarTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
            document.body.classList.add('has-cart-bar');
        }
    }

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        cartFooter.style.display = 'none';
        return;
    }

    cartItems.innerHTML = '';

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <span class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
        `;
        cartItems.appendChild(itemDiv);
    });

    totalValue.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    cartFooter.style.display = 'block';
}

// Abrir/Fechar carrinho
function openCart() {
    document.getElementById('cartSidebar').classList.add('active');
    document.getElementById('cartOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// Lightbox
function openLightbox(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay active';
    overlay.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
            <img src="${item.image}" alt="${item.name}" class="lightbox-image">
            <div class="lightbox-caption">
                <h3 class="lightbox-title">${item.name}</h3>
                <p class="lightbox-description">${item.description}</p>
                <span class="lightbox-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
            </div>
        </div>
    `;
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeLightbox();
    });
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const overlay = document.querySelector('.lightbox-overlay');
    if (overlay) {
        overlay.remove();
        document.body.style.overflow = '';
    }
}

// Toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.querySelector('.toast-text').textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Formatar mensagem do pedido
function formatOrderMessage() {
    const name = document.getElementById('customerName').value;
    const tower = document.getElementById('tower').value;
    const apartment = document.getElementById('apartment').value;

    if (!name || !tower || !apartment) {
        alert('Por favor, preencha todos os dados (nome, torre e apartamento).');
        return null;
    }

    let message = `Oi, ${appConfig.ownerName}! Tudo bem? 😊\n\n`;
    message += `Sou o(a) ${name} e queria pedir:\n\n`;

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `• ${item.quantity}x ${item.name} - R$ ${itemTotal.toFixed(2).replace('.', ',')}\n`;
    });

    message += `\n💰 *Total: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
    message += `Moro na Torre ${tower}, apto ${apartment}.\n\n`;
    message += `Você tem aí? 😄\n\n`;
    message += `Obrigado(a)!`;

    return message;
}

// Enviar para WhatsApp
function sendToWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${appConfig.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initApp();

    // Abrir carrinho
    document.getElementById('cartBtn').addEventListener('click', openCart);

    // Fechar carrinho
    document.getElementById('cartClose').addEventListener('click', closeCart);
    document.getElementById('cartOverlay').addEventListener('click', closeCart);

    // WhatsApp
    document.getElementById('whatsappBtn').addEventListener('click', () => {
        const message = formatOrderMessage();
        if (message) {
            sendToWhatsApp(message);
            // Limpar carrinho após envio
            cart = [];
            saveCart();
            updateCart();
            closeCart();
            document.getElementById('customerForm').reset();
        }
    });

    // Botão da barra do carrinho
    const cartBarBtn = document.getElementById('cartBarBtn');
    if (cartBarBtn) {
        cartBarBtn.addEventListener('click', openCart);
    }
});
