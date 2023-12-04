
const socket = new WebSocket('ws://localhost:8080');
socket.addEventListener('open', function (event) {
    console.log('Conexión establecida con el servidor WebSocket');
});

socket.addEventListener('message', function (event) {
    const updatedProducts = JSON.parse(event.data);

    // Actualizar la lista de productos 
    const productContainer = document.querySelector('.product-list');
    productContainer.innerHTML = '';

    updatedProducts.forEach(product => {
        const productItem = document.createElement('li');
        productItem.innerHTML = `
            <h2>${product.title}</h2>
            <p>Description: ${product.description}</p>
            <p>Price: $${product.price}</p>
            <img src="${product.thumbnail}" alt="${product.title} Image">
            <p>Code: ${product.code}</p>
            <p class="stock ${product.stock ? 'available' : 'out-of-stock'}">Stock: ${product.stock}</p>
            <button class="add-to-cart" data-product-code="${product.code}">Agregar al Carrito</button>
            <button class="remove-from-cart" data-product-code="${product.code}">Eliminar del Carrito</button>
        `;

        productContainer.appendChild(productItem);
    });
});

document.addEventListener('click', function (event) {
    const target = event.target;
    if (target.tagName === 'BUTTON' && target.classList.contains('add-to-cart')) {
        const productCode = target.dataset.productCode;
        addToCart(productCode);
    } else if (target.tagName === 'BUTTON' && target.classList.contains('remove-from-cart')) {
        const productCode = target.dataset.productCode;
        removeFromCart(productCode);
    }
});


//  agregar producto al carrito
async function addToCart(productCode) {
    try {
        const response = await fetch(`/api/cart/add/${productCode}`, {
            method: 'POST',
        });

        if (response.ok) {
            console.log(`Producto agregado al carrito - Código: ${productCode}`);
        } else {
            console.error('Error al agregar el producto al carrito');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

// eliminar un producto del carrito
async function removeFromCart(productCode) {
    try {
        const response = await fetch(`/api/cart/remove/${productCode}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log(`Producto eliminado del carrito - Código: ${productCode}`);
        } else {
            console.error('Error al eliminar el producto del carrito');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}
