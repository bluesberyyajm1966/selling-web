let cart = [];
let cartCount = document.getElementById('cart-count');
let cartModal = document.getElementById('cart-modal');
let cartItemsList = document.getElementById('cart-items-list');
let cartTotal = document.getElementById('cart-total');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        const productName = this.getAttribute('data-name');
        const productPrice = parseFloat(this.getAttribute('data-price'));

        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }
        
        updateCart();
    });
});

function updateCart() {
    cartCount.textContent = cart.length;
    cartItemsList.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p>${item.name} - $${item.price} x ${item.quantity}</p>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartItemsList.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);

    // Event listener for remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            cart = cart.filter(item => item.id !== productId);
            updateCart();
        });
    });
}

// Open Cart Modal
document.getElementById('cart-link').addEventListener('click', function() {
    cartModal.style.display = 'flex';
});

// Close Cart Modal
document.querySelector('.close-modal').addEventListener('click', function() {
    cartModal.style.display = 'none';
});
