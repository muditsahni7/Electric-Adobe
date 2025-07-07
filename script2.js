document.addEventListener('DOMContentLoaded', () => { // <--- IMPORTANT: Wrap everything in DOMContentLoaded

    // --- Global Variables (moved inside DOMContentLoaded to ensure elements exist) ---
    let cartnum = 0;
    let cartprice = 0;

    // --- References to static DOM Elements ---
    const menuBtn = document.getElementById('menu-btn');
    const dropMenu = document.getElementById('drop_nav');
    const productsContainer = document.getElementById('product-container'); // Container for product cards
    const cartDisplayElement = document.getElementById('cart-items-display'); // New: Container for items INSIDE the cart
    const cartNumDisplay = document.getElementById('cart-num'); // The little badge number
    const cartPriceDisplay = document.getElementById('cartp'); // The total price display
    const cartContainer = document.getElementById('crt'); // The main cart sidebar div
    const cartDesktopIcon = document.getElementById('cart_icon_desktop'); // The desktop cart open button
    const cartSmIcon = document.getElementById('cart_icon_sm'); // The small screen cart open button
    const crtBtn = document.getElementById('crt-btn'); // The 'x' close button inside the cart

    // New: References for custom link click events
    const desktopContactLink = document.getElementById('desktopContactLink');
    const footerContactUsLink = document.getElementById('footerContactUsLink');


    // --- Event Listeners ---

    // 1. Mobile Menu Toggle
    if (menuBtn && dropMenu) {
        menuBtn.addEventListener('click', () => {
            dropMenu.classList.toggle("hidden");
        });
    } else {
        console.error("Menu button or dropdown menu not found.");
    }

    // 2. Add to Cart Logic (using event delegation on product-container)
    if (productsContainer && cartDisplayElement && cartNumDisplay && cartPriceDisplay) {
        productsContainer.addEventListener('click', function (event) {
            const clickedElement = event.target;

            if (clickedElement.classList.contains('add-t-cart')) {
                const productCard = clickedElement.closest('.pcard');
                if (productCard) {
                    const productName = productCard.querySelector('.product-title').textContent;
                    // Ensure productPrice is parsed correctly, remove '$' if present
                    const productPriceText = productCard.querySelector('.product-price').textContent;
                    const productPrice = Number(productPriceText.replace('₹', '').replace(',', '')); // Handle Indian Rupee symbol and commas
                    const imageSrc = productCard.querySelector('.product-image').src;

                    cartnum += 1;
                    cartprice += productPrice;

                    // Update the total quantity and price displays
                    cartNumDisplay.innerText = cartnum;
                    cartPriceDisplay.innerText = cartprice.toFixed(2); // Format price for display

                    // Create elements using createElement (more robust than innerHTML for appending)
                    const newItemDiv = document.createElement('div');
                    newItemDiv.classList.add('flex', 'items-center', 'gap-2', 'rounded-md', 'p-2'); // Tailwind classes

                    newItemDiv.innerHTML = `
                        <img src="${imageSrc}" class="h-28 w-28 object-cover rounded-md"/>
                        <div>
                            <h1 class="text-md font-semibold">${productName}</h1>
                            <p>₹${productPrice.toFixed(2)}</p>
                            </div>
                    `;
                    
                    // Append the new item div to the *dedicated cart items display container*
                    cartDisplayElement.appendChild(newItemDiv); 
                    
                    console.log(`Added: ${productName}, Price: ₹${productPrice.toFixed(2)}, Total Cart Value: ₹${cartprice.toFixed(2)}, Items in Cart: ${cartnum}`);

                    // Optional: Open the cart automatically when an item is added
                    // if (cartContainer && cartContainer.classList.contains('hidden')) {
                    //     cartContainer.classList.remove('hidden');
                    // }
                }
            }
        });
    } else {
        console.error("Products container or cart display elements not found for 'add to cart' functionality.");
    }

    // 3. Cart Toggle (Desktop Icon)
    if (cartDesktopIcon && cartContainer) {
        cartDesktopIcon.addEventListener('click', () => {
            cartContainer.classList.toggle("hidden");
            console.log('Cart visibility toggled by desktop icon.');
            // Adjust body scroll lock based on visibility
            // if (cartContainer.classList.contains('hidden')) {
            //     document.body.classList.remove('no-scroll');
            // } else {
            //     document.body.classList.add('no-scroll');
            // }
        });
    } else {
        console.error("Desktop cart icon or cart container not found for toggling.");
    }

    // 4. Cart Toggle (Small Screen Icon)
    if (cartSmIcon && cartContainer) {
        cartSmIcon.addEventListener('click', () => {
            cartContainer.classList.toggle("hidden");
            console.log('Cart visibility toggled by small screen icon.');
            // Adjust body scroll lock based on visibility
            // if (cartContainer.classList.contains('hidden')) {
            //     document.body.classList.remove('no-scroll');
            // } else {
            //     document.body.classList.add('no-scroll');
            // }
        });
    } else {
        console.error("Small screen cart icon or cart container not found for toggling.");
    }

    // 5. Cart Close Button ('x') using Direct Listener (as it's static)
    if (crtBtn && cartContainer) {
        crtBtn.addEventListener('click', () => {
            // Consistent: Use classList.add to hide, like how it's initialized
            cartContainer.classList.add('hidden'); 
            console.log('Cart closed by "x" button.');
            // Optional: document.body.classList.remove('no-scroll');
        });
    } else {
        console.error("Cart close button or cart container not found for 'x' button functionality.");
    }

    // New: Custom dataLayer push for Contact links
    // Desktop navigation 'Contact' link
    if (desktopContactLink) {
        desktopContactLink.addEventListener('click', function(event) {
            // No event.preventDefault() here so the link navigates normally
            console.log('Pushing custom link click event for Desktop Contact link');
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'custom_link_click',
                'link_text': this.textContent,
                'link_url': this.href
            });
        });
    } else {
        console.warn("Desktop Contact link not found for dataLayer event.");
    }

    // Footer 'Contact Us' link
    if (footerContactUsLink) {
        footerContactUsLink.addEventListener('click', function(event) {
            // No event.preventDefault() here so the link navigates normally
            console.log('Pushing custom link click event for Footer Contact Us link');
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'custom_link_click',
                'link_text': this.textContent,
                'link_url': this.href
            });
        });
    } else {
        console.warn("Footer Contact Us link not found for dataLayer event.");
    }

    // --- IMPORTANT: Event Delegation for dynamic elements inside the cart (e.g., "Remove Item" buttons) ---
    // If you plan to add "Remove Item" buttons inside the dynamically added product divs in the cart,
    // you would add an event listener to 'cartDisplayElement' (the parent of those items)
    // and then check `event.target` for the 'remove-item-btn' class.
    // Example:
    // if (cartDisplayElement) {
    //     cartDisplayElement.addEventListener('click', function(event) {
    //         if (event.target.classList.contains('remove-item-btn')) {
    //             const itemToRemove = event.target.closest('.flex.items-center.gap-2'); // Adjust selector to find the item's parent div
    //             if (itemToRemove) {
    //                 // Get product info from itemToRemove to update cartprice/cartnum
    //                 const priceToRemove = parseFloat(itemToRemove.querySelector('p').textContent.replace('₹', ''));
    //                 itemToRemove.remove(); // Remove the item from the DOM
    //                 cartnum -= 1;
    //                 cartprice -= priceToRemove;
    //                 cartNumDisplay.innerText = cartnum;
    //                 cartPriceDisplay.innerText = cartprice.toFixed(2);
    //                 console.log('Item removed from cart.');
    //             }
    //         }
    //     });
    // }
});

 let slideIndex = 0;
        const slides = document.getElementById('carouselSlide');
        const dots = document.querySelectorAll('.carousel-dot');
        const totalSlides = slides.children.length;

        /**
         * Displays a specific slide in the carousel.
         * @param {number} n - The index of the slide to display.
         */
        function showSlides(n) {
            if (!slides || dots.length === 0) { // Add null checks for elements
                console.warn("Carousel elements not found. Carousel will not function.");
                return;
            }

            if (n >= totalSlides) {
                slideIndex = 0; // Loop back to the first slide
            }
            if (n < 0) {
                slideIndex = totalSlides - 1; // Loop back to the last slide
            }

            slides.style.transform = `translateX(${-slideIndex * 100}%)`;

            // Update active dot
            dots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (index === slideIndex) {
                    dot.classList.add('active');
                }
            });
        }

        /**
         * Moves the carousel to the next or previous slide.
         * @param {number} n - The number of slides to move (1 for next, -1 for previous).
         */
        function moveSlide(n) {
            slideIndex += n;
            showSlides(slideIndex);
        }

        /**
         * Jumps to a specific slide based on the dot clicked.
         * @param {number} n - The index of the slide to jump to.
         */
        function currentSlide(n) {
            slideIndex = n;
            showSlides(slideIndex);
        }

        // Auto-play the carousel
        setInterval(() => {
            moveSlide(1);
        }, 5000); // Change image every 5 seconds

        // Initial display of the first slide
        window.onload = function() {
            showSlides(slideIndex);
            // Any other existing onload functions from script.js would go here
            // For example, if script.js has an init function:
            // initCart();
        };

