// Integração WhatsApp - Suspirô Confeitaria
// Funções para envio de pedidos via WhatsApp

// Número do WhatsApp da Graci
const WHATSAPP_NUMBER = "5511999999999";

// Gerar link do WhatsApp
function generateWhatsAppLink(message) {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

// Abrir WhatsApp
function openWhatsApp(message) {
    const url = generateWhatsAppLink(message);
    window.open(url, '_blank');
}

// Formatar mensagem de pedido
function formatOrderMessage(orderData) {
    const { items, customer, total } = orderData;

    let message = `🧁 *Pedido Suspirô Confeitaria*\n\n`;
    message += `Olá Graci! Gostaria de fazer o pedido:\n\n`;

    items.forEach(item => {
        message += `• ${item.quantity}x ${item.name} - ${formatCurrency(item.totalPrice)}\n`;
    });

    message += `\n💰 *Total: ${formatCurrency(total)}*\n\n`;
    message += `📍 *Localização:*\n`;
    message += `Torre: ${customer.tower}\n`;
    message += `Apartamento: ${customer.apartment}\n\n`;
    message += `👤 *Nome:* ${customer.name}\n`;
    message += `\nObrigado! 😊`;

    return message;
}

// Criar mensagem de confirmação
function createConfirmationMessage(orderData) {
    const message = formatOrderMessage(orderData);
    return {
        message,
        whatsappUrl: generateWhatsAppLink(message)
    };
}

// Enviar pedido
function sendOrder(orderData) {
    const message = formatOrderMessage(orderData);
    openWhatsApp(message);
    return true;
}

// Verificar se WhatsApp está disponível
function isWhatsAppAvailable() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// Função alternativa para desktop
function sendOrderDesktop(orderData) {
    const message = formatOrderMessage(orderData);
    const url = generateWhatsAppLink(message);

    // Tentar abrir WhatsApp Web
    if (!isWhatsAppAvailable()) {
        const whatsappWebUrl = `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
        window.open(whatsappWebUrl, '_blank');
    } else {
        openWhatsApp(message);
    }
    return true;
}
