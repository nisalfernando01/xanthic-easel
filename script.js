// --- Product Data ---
const products = [
    {
        id: '001',
        title: '001. Crabbing',
        priceBySizes: {
            '20x30': 25000.00,
            '30x40': 35000.00
        },
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: '002',
        title: '002. Fin & Shadow',
        priceBySizes: {
            '20x30': 28500.00,
            '30x40': 38500.00
        },
        image: 'https://images.unsplash.com/photo-1531959870249-9f9b729efcf4?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: '003',
        title: '003. August in Cantabria',
        priceBySizes: {
            '20x30': 22000.00,
            '30x40': 32000.00
        },
        image: 'https://images.unsplash.com/photo-1473116763249-56381a34c256?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: '004',
        title: '004. Rack',
        priceBySizes: {
            '20x30': 30000.00,
            '30x40': 40000.00
        },
        image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1000&auto=format&fit=crop'
    }
];

// --- Page Logic ---

document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the product page
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const mainImage = document.getElementById('main-image');

    if (productId && mainImage) {
        // We are on product.html
        loadProductPage(productId);
    }
});

function loadProductPage(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const titleEl = document.getElementById('product-title');
    const priceEl = document.getElementById('product-price');
    const imageEl = document.getElementById('main-image');
    const sizeSelect = document.getElementById('size-select');
    const frameSelect = document.getElementById('frame-select');
    const quantityInput = document.getElementById('quantity-input');
    const addBtn = document.getElementById('add-to-cart-btn');

    // Set static details
    titleEl.innerText = product.title;
    imageEl.src = product.image;
    document.title = `Xanthic Easel | ${product.title}`;

    const currentUrl = window.location.href;

    // Initialize Snipcart Button Attributes
    addBtn.dataset.itemId = product.id;
    addBtn.dataset.itemName = product.title;
    addBtn.dataset.itemUrl = currentUrl;
    addBtn.dataset.itemImage = product.image;

    // Function to update price and button attributes based on options
    function updateProductState() {
        const selectedSize = sizeSelect.value;
        const selectedFrame = frameSelect.value;
        const currentPrice = product.priceBySizes[selectedSize];

        // Update displayed price
        if (currentPrice) {
            priceEl.innerText = `LKR ${currentPrice.toLocaleString()}`;
            // Update Snipcart price
            addBtn.dataset.itemPrice = currentPrice;
        }

        // Update Snipcart custom attributes to match selection
        addBtn.dataset.itemCustom1Value = selectedSize;
        addBtn.dataset.itemCustom2Value = selectedFrame;

        // Note: Snipcart reads data attributes when clicked. 
        // We are keeping the DOM attributes in sync with the form.
    }

    // Initialize and listen for changes
    if (sizeSelect && frameSelect) {
        updateProductState();
        sizeSelect.addEventListener('change', updateProductState);
        frameSelect.addEventListener('change', updateProductState);
    }

    // Handle Quantity directly with Snipcart? 
    // Snipcart usually handles quantity in the cart, but we can pass it if needed.
    // For simplicity, we just let Snipcart handle quantity in the popup, 
    // OR we can update data-item-quantity if we want to support the input field.
    if (quantityInput) {
        quantityInput.addEventListener('change', () => {
            addBtn.dataset.itemQuantity = quantityInput.value;
        });
        // Init quantity
        addBtn.dataset.itemQuantity = quantityInput.value;
    }
}

// Slideshow Script
const slides = document.querySelectorAll('.slide');
if (slides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 2500);
}
