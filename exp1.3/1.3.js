// Check for saved theme preference or default to dark mode
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeButton();
    }
}

// Toggle between light and dark mode
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    
    // Get current theme
    const isLightMode = document.body.classList.contains('light-mode');
    
    // Save preference to localStorage
    if (isLightMode) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
    
    // Update button text and icon
    updateThemeButton();
}

// Update button appearance based on current theme
function updateThemeButton() {
    const button = document.querySelector('.theme-toggle');
    const isLightMode = document.body.classList.contains('light-mode');
    
    if (isLightMode) {
        button.innerHTML = '<span class="theme-icon">🌙</span> Dark Mode';
    } else {
        button.innerHTML = '<span class="theme-icon">☀️</span> Light Mode';
    }
}

// Initialize theme when page loads
window.addEventListener('DOMContentLoaded', initializeTheme);
