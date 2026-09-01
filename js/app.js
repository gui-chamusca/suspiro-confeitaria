// Dados iniciais do cardápio
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

// Configurações do app
const appConfig = {
    businessName: "Suspirô Confeitaria",
    ownerName: "Graci",
    whatsappNumber: "5511999999999"
};

// Estado do aplicativo
let menuItems = [];
let cart = [];
let currentCarouselIndex = 0;
let currentLightboxIndex = 0;
let currentView = 'carousel'; // 'carousel' ou 'list'

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

    // Renderizar cardápio
    renderMenu();
    updateCart();
    
    // Carregar preferência de visualização
    loadViewPreference();
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
    renderCarouselView();
    renderListView();
}

// Renderizar visualização em carrossel
function renderCarouselView() {
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselDots = document.getElementById('carouselDots');
    carouselTrack.innerHTML = '';
    carouselDots.innerHTML = '';

    const availableItems = menuItems.filter(item => item.available);

    // Criar itens do carrossel
    availableItems.forEach((item, index) => {
        const carouselItem = createCarouselItem(item);
        carouselTrack.appendChild(carouselItem);

        // Criar dot
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        carouselDots.appendChild(dot);
    });

    // Inicializar carrossel
    updateCarousel();
}

// Renderizar visualização em lista
function renderListView() {
    const menuList = document.getElementById('menuList');
    menuList.innerHTML = '';

    const availableItems = menuItems.filter(item => item.available);

    availableItems.forEach(item => {
        const listItem = createListItem(item);
        menuList.appendChild(listItem);
    });
}

// Criar elemento do carrossel
function createCarouselItem(item) {
    const div = document.createElement('div');
    div.className = 'carousel-item';
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="carousel-item-image" onclick="openLightbox(${item.id})">
        <div class="carousel-item-content">
            <div class="carousel-item-category">${item.category}</div>
            <h3 class="carousel-item-name">${item.name}</h3>
            <p class="carousel-item-description">${item.description}</p>
            <div class="carousel-item-footer">
                <span class="carousel-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                <button class="add-btn" onclick="addToCart(${item.id})">Adicionar</button>
            </div>
            <div class="carousel-item-zoom">Clique na imagem para ampliar</div>
        </div>
    `;
    return div;
}

// Criar elemento da lista
function createListItem(item) {
    const div = document.createElement('div');
    div.className = 'menu-list-item';
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="menu-list-item-image" onclick="openLightbox(${item.id})">
        <div class="menu-list-item-content">
            <div class="menu-list-item-header">
                <h3 class="menu-list-item-name">${item.name}</h3>
                <span class="menu-list-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
            </div>
            <p class="menu-list-item-description">${item.description}</p>
            <div class="menu-list-item-footer">
                <span class="menu-list-item-category">${item.category}</span>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span class="menu-list-item-zoom" onclick="openLightbox(${item.id})">Ver detalhes</span>
                    <button class="add-btn" onclick="addToCart(${item.id})">Adicionar</button>
                </div>
            </div>
        </div>
    `;
    return div;
}

// Alternar visualização
function switchView(view) {
    currentView = view;
    
    const carouselContainer = document.getElementById('carouselContainer');
    const carouselDots = document.getElementById('carouselDots');
    const listContainer = document.getElementById('listContainer');
    const carouselViewBtn = document.getElementById('carouselViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    
    if (view === 'carousel') {
        carouselContainer.style.display = 'flex';
        carouselDots.style.display = 'flex';
        listContainer.style.display = 'none';
        carouselViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    } else {
        carouselContainer.style.display = 'none';
        carouselDots.style.display = 'none';
        listContainer.style.display = 'block';
        carouselViewBtn.classList.remove('active');
        listViewBtn.classList.add('active');
    }
    
    // Salvar preferência
    localStorage.setItem('suspiroViewPreference', view);
}

// Carregar preferência de visualização
function loadViewPreference() {
    const savedView = localStorage.getItem('suspiroViewPreference');
    if (savedView) {
        switchView(savedView);
    }
}

// Navegação do carrossel
function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.carousel-dot');
    
    track.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentCarouselIndex);
    });
}

function goToSlide(index) {
    const availableItems = menuItems.filter(item => item.available);
    currentCarouselIndex = Math.max(0, Math.min(index, availableItems.length - 1));
    updateCarousel();
}

function nextSlide() {
    const availableItems = menuItems.filter(item => item.available);
    currentCarouselIndex = (currentCarouselIndex + 1) % availableItems.length;
    updateCarousel();
}

function prevSlide() {
    const availableItems = menuItems.filter(item => item.available);
    currentCarouselIndex = (currentCarouselIndex - 1 + availableItems.length) % availableItems.length;
    updateCarousel();
}

// Lightbox
function openLightbox(itemId) {
    const availableItems = menuItems.filter(item => item.available);
    currentLightboxIndex = availableItems.findIndex(item => item.id === itemId);
    
    if (currentLightboxIndex === -1) return;
    
    updateLightbox();
    document.getElementById('lightboxOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightboxOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightbox() {
    const availableItems = menuItems.filter(item => item.available);
    const item = availableItems[currentLightboxIndex];
    
    if (!item) return;
    
    document.getElementById('lightboxImage').src = item.image;
    document.getElementById('lightboxImage').alt = item.name;
    document.getElementById('lightboxTitle').textContent = item.name;
    document.getElementById('lightboxDescription').textContent = item.description;
    document.getElementById('lightboxPrice').textContent = `R$ ${item.price.toFixed(2).replace('.', ',')}`;
}

function nextLightboxSlide() {
    const availableItems = menuItems.filter(item => item.available);
    currentLightboxIndex = (currentLightboxIndex + 1) % availableItems.length;
    updateLightbox();
}

function prevLightboxSlide() {
    const availableItems = menuItems.filter(item => item.available);
    currentLightboxIndex = (currentLightboxIndex - 1 + availableItems.length) % availableItems.length;
    updateLightbox();
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
            quantity: 1
        });
    }

    saveCart();
    updateCart();

    // Feedback visual
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Adicionado';
    btn.style.background = '#25D366';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 1000);
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
    const cartTotal = document.getElementById('cartTotal');
    const totalValue = document.getElementById('totalValue');
    const whatsappBtn = document.getElementById('whatsappBtn');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Adicione itens ao seu pedido</p>';
        cartTotal.style.display = 'none';
        whatsappBtn.disabled = true;
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-qty">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    ${item.quantity}x R$ ${item.price.toFixed(2).replace('.', ',')}
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <span class="cart-item-price">R$ ${itemTotal.toFixed(2).replace('.', ',')}</span>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
        `;
        cartItems.appendChild(itemDiv);
    });

    totalValue.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    cartTotal.style.display = 'flex';
    whatsappBtn.disabled = false;
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

    let message = `🧁 *Pedido ${appConfig.businessName}*\n\n`;
    message += `Olá ${appConfig.ownerName}! Gostaria de fazer o pedido:\n\n`;

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `• ${item.quantity}x ${item.name} - R$ ${itemTotal.toFixed(2).replace('.', ',')}\n`;
    });

    message += `\n💰 *Total: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
    message += `📍 *Localização:*\n`;
    message += `Torre: ${tower}\n`;
    message += `Apartamento: ${apartment}\n\n`;
    message += `👤 *Nome:* ${name}\n`;
    message += `\nObrigado! 😊`;

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

    // Botões de alternância de visualização
    document.getElementById('carouselViewBtn').addEventListener('click', () => switchView('carousel'));
    document.getElementById('listViewBtn').addEventListener('click', () => switchView('list'));

    // Botões do carrossel
    document.getElementById('carouselPrev').addEventListener('click', prevSlide);
    document.getElementById('carouselNext').addEventListener('click', nextSlide);

    // Botões do lightbox
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', prevLightboxSlide);
    document.getElementById('lightboxNext').addEventListener('click', nextLightboxSlide);
    document.getElementById('lightboxOverlay').addEventListener('click', (e) => {
        if (e.target === document.getElementById('lightboxOverlay')) {
            closeLightbox();
        }
    });

    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('lightboxOverlay').classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevLightboxSlide();
            if (e.key === 'ArrowRight') nextLightboxSlide();
        } else {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        }
    });

    // Botão do WhatsApp
    document.getElementById('whatsappBtn').addEventListener('click', () => {
        const message = formatOrderMessage();
        if (message) {
            showOrderPreview(message);
        }
    });

    // Modal
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('btnCancel').addEventListener('click', closeModal);
    document.getElementById('btnConfirm').addEventListener('click', confirmOrder);
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
        if (e.target === document.getElementById('modalOverlay')) {
            closeModal();
        }
    });

    // Touch swipe para carrossel
    let touchStartX = 0;
    let touchEndX = 0;

    document.getElementById('carouselTrack').addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.getElementById('carouselTrack').addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            nextSlide();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            prevSlide();
        }
    }
});

// Mostrar preview do pedido
function showOrderPreview(message) {
    const modal = document.getElementById('modalOverlay');
    const preview = document.getElementById('orderPreview');
    preview.textContent = message;
    modal.classList.add('active');
}

// Fechar modal
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

// Confirmar pedido
function confirmOrder() {
    const message = formatOrderMessage();
    if (message) {
        sendToWhatsApp(message);
        closeModal();
        // Limpar carrinho após envio
        cart = [];
        saveCart();
        updateCart();
        document.getElementById('customerForm').reset();
    }
}
