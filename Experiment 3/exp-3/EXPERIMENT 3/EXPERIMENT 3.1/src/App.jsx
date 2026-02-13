import { useState } from 'react'
import ProductCard from './ProductCard'
import './App.css'

function App() {
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 129.99,
      category: 'Electronics',
      image: null,
      rating: 4.5,
      stock: 8
    },
    {
      id: 2,
      name: 'Bluetooth Speaker',
      price: 89.99,
      category: 'Electronics',
      image: null,
      rating: 4.0,
      stock: 3
    },
    {
      id: 3,
      name: 'USB-C Cable',
      price: 19.99,
      category: 'Electronics',
      image: null,
      rating: 4.8,
      stock: 0
    },
    {
      id: 4,
      name: 'Laptop Stand',
      price: 45.99,
      category: 'Accessories',
      image: null,
      rating: 4.3,
      stock: 12
    },
    {
      id: 5,
      name: 'Phone Case',
      price: 24.99,
      category: 'Accessories',
      image: null,
      rating: 4.6,
      stock: 2
    },
    {
      id: 6,
      name: 'Screen Protector',
      price: 9.99,
      category: 'Accessories',
      image: null,
      rating: 4.1,
      stock: 15
    }
  ];

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Product Store</h1>
        <p>Browse our collection of products</p>
      </header>

      <main className="products-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            category={product.category}
            image={product.image}
            rating={product.rating}
            stock={product.stock}
          />
        ))}
      </main>
    </div>
  )
}

export default App
