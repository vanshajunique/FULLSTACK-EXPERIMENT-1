const products = [
    {
        id: 1,
        name: 'Wireless Headphones',
        price: 129.99,
        category: 'electronics'
    },
    {
        id: 2,
        name: 'Saree',
        price: 49.99,
        category: 'fashion'
    },
    {
        id: 3,
        name: 'Nike Shoes',
        price: 149.99,
        category: 'fashion'
    },
    {
        id: 4,
        name: 'Wireless Mouse',
        price: 34.99,
        category: 'electronics'
    },
    {
        id: 5,
        name: 'Bluetooth Speaker',
        price: 89.99,
        category: 'electronics'
    },
    {
        id: 6,
        name: 'Cotton T-Shirt',
        price: 24.99,
        category: 'clothing'
    },
    {
        id: 7,
        name: 'Denim Jeans',
        price: 59.99,
        category: 'clothing'
    },
    {
        id: 8,
        name: 'Laptop Stand',
        price: 45.99,
        category: 'electronics'
    }
];

const categoryFilter = document.getElementById('categoryFilter');
const productsContainer = document.getElementById('productsContainer');

function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = '';

    if (productsToDisplay.length === 0) {
        productsContainer.innerHTML = '<div class="empty-message">No products found in this category</div>';
        return;
    }

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price}</div>
            <div class="product-category category-${product.category}">
                ${product.category}
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
}

function filterProducts(selectedCategory) {
    if (selectedCategory === 'all') {

        return products;
    } else {
        return products.filter(product => product.category === selectedCategory);
    }
}

function handleFilterChange(event) {
    const selectedCategory = event.target.value;
    const filteredProducts = filterProducts(selectedCategory);
    displayProducts(filteredProducts);
}

categoryFilter.addEventListener('change', handleFilterChange);

displayProducts(products);
