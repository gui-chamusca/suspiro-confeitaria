// Sistema de Carrinho - Suspirô Confeitaria
// Funções auxiliares para gerenciamento do carrinho

// Obter total do carrinho
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Obter quantidade total de itens
function getCartItemCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Limpar carrinho
function clearCart() {
    cart = [];
    saveCart();
    updateCart();
}

// Verificar se carrinho está vazio
function isCartEmpty() {
    return cart.length === 0;
}

// Obter resumo do carrinho
function getCartSummary() {
    const total = getCartTotal();
    const itemCount = getCartItemCount();
    const items = cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity
    }));

    return {
        items,
        itemCount,
        total
    };
}

// Formatar valor em Real
function formatCurrency(value) {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

// Salvar preferências do cliente
function saveCustomerPrefs(name, tower, apartment) {
    const prefs = { name, tower, apartment };
    localStorage.setItem('suspiroCustomerPrefs', JSON.stringify(prefs));
}

// Carregar preferências do cliente
function loadCustomerPrefs() {
    const saved = localStorage.getItem('suspiroCustomerPrefs');
    if (saved) {
        const prefs = JSON.parse(saved);
        document.getElementById('customerName').value = prefs.name || '';
        document.getElementById('tower').value = prefs.tower || '';
        document.getElementById('apartment').value = prefs.apartment || '';
    }
}

// Auto-preencher dados do cliente
document.addEventListener('DOMContentLoaded', () => {
    loadCustomerPrefs();

    // Salvar dados quando preenchidos
    const form = document.getElementById('customerForm');
    if (form) {
        form.addEventListener('input', () => {
            const name = document.getElementById('customerName').value;
            const tower = document.getElementById('tower').value;
            const apartment = document.getElementById('apartment').value;
            if (name && tower && apartment) {
                saveCustomerPrefs(name, tower, apartment);
            }
        });
    }
});
