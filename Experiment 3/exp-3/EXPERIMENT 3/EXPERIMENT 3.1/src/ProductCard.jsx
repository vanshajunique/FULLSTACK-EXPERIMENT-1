import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({
    id,
    name,
    price,
    category,
    image,
    rating,
    stock
}) => {
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    function getStockStatusText() {
        if (stock === 0) {
            return 'Out of Stock';
        } else if (stock < 5) {
            return 'Low Stock';
        } else {
            return 'In Stock';
        }
    }


    function getStockStatusClass() {
        if (stock === 0) {
            return 'out-of-stock';
        } else if (stock < 5) {
            return 'low-stock';
        } else {
            return 'in-stock';
        }
    }

    function createStarRating() {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;
        
        const filledStars = '★'.repeat(fullStars);
        const unfilledStars = '☆'.repeat(emptyStars);
        
        return filledStars + unfilledStars;
    }

    function handleAddToCartClick() {
        setIsAddedToCart(true);
        
        setTimeout(() => {
            setIsAddedToCart(false);
        }, 2000);
    }

    function getButtonText() {
        if (isAddedToCart) {
            return '✓ Added!';
        } else {
            return 'Add to Cart';
        }
    }

    function isCartButtonDisabled() {
        return stock === 0;
    }

    const stockStatusText = getStockStatusText();
    const stockStatusClass = getStockStatusClass();
    const starRating = createStarRating();
    const buttonText = getButtonText();
    const buttonIsDisabled = isCartButtonDisabled();

    return (
        <div className="product-card">
            
            <div className="product-image">
                {image ? (
                    <img src={image} alt={name} />
                ) : (
                    <div className="image-placeholder">{name}</div>
                )}
            </div>

            <div className="product-info">
                
                <h3 className="product-name">{name}</h3>
                
                <div className="product-rating">
                    {starRating}
                    <span className="rating-count">({rating}/5)</span>
                </div>

                <div className="product-category">
                    {category}
                </div>

                <div className="product-price">
                    ${price.toFixed(2)}
                </div>

                <div className={`stock-status ${stockStatusClass}`}>
                    {stockStatusText} ({stock} available)
                </div>

                <button
                    className={`add-to-cart-btn ${isAddedToCart ? 'added' : ''}`}
                    onClick={handleAddToCartClick}
                    disabled={buttonIsDisabled}
                >
                    {buttonText}
                </button>
                
            </div>
        </div>
    );
};

export default ProductCard;
