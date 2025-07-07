

let menu_btn = document.getElementById('menu-btn');
let drop_menu = document.getElementById('drop_nav');

menu_btn.addEventListener('click', () => {
    drop_menu.classList.toggle("hidden")

})



let productName = '';
let productPrice = '';
let image = '';
let cartnum = 0;
let cartprice = 0;

const productsContainer = document.getElementById('product-container');
productsContainer.addEventListener('click', function (event) {
    const clickedElement = event.target;


    if (clickedElement.classList.contains('add-t-cart')) {
        const productCard = clickedElement.closest('.pcard');
        if (productCard) {
            let productName = productCard.querySelector('.product-title').textContent;
            let productPrice = Number(productCard.querySelector('.product-price').textContent);
            let productImage = productCard.querySelector('.product-image').src; // Changed 'image' to 'productImage' for clarity

            // Update cart numbers
            window.cartnum = (window.cartnum || 0) + 1; // Ensure cartnum is initialized
            window.cartprice = (window.cartprice || 0) + productPrice; // Ensure cartprice is initialized

            // Update the cart display in the DOM
            document.getElementById('cartp').innerText = window.cartprice;
            document.getElementById('cart-num').innerText = window.cartnum;

            // Push data to the data layer for the 'Add to Cart' event
            window.digitalData.cart = {
                itemCount: window.cartnum,
                totalPrice: window.cartprice
            };
            window.digitalData.product = {
                title: productName,
                price: productPrice,
                imageUrl: productImage
            };

            // Optionally, you can also push an event to indicate something happened
            // This is useful if you want to trigger rules on specific events
            window.digitalData.event = {
                name: "productAddedToCart",
                // You can add more event-specific data here
            };

            // Log for debugging
            console.log("digitalData after Add to Cart:", window.digitalData);

            // ... Your existing HTML content update logic for the cart sidebar ...
            targetElement = document.getElementById('crt');
            const newHtmlContent = `
                       <div class='flex items-center gap-2 rounded-md p-2'>
                            <img src=${productImage} class='h-28 w-28'/>
                            <div class='flex gap-3 items-center'>
                               <h1 class='text-md font-semibold'>${productName}</h1>
                               <p>${'$' + productPrice}</p>
                            </div>
                        </div>`;
            targetElement.innerHTML += newHtmlContent;

            console.log(`Adding to cart: Name: ${productName}, Price: ${productPrice} , cartprice: ${window.cartprice} , cart: ${window.cartnum} , src: ${productImage} `);
        }
    }

});



    const cartContainer = document.getElementById('crt'); 
    if (cartContainer) {
        
        cartContainer.addEventListener('click', function(event) {
            const clickedElement = event.target; 
            if (clickedElement.id === 'crt-btn') {
                document.getElementById('crt').classList.toggle("hidden")
            }
            
        });
    } 

document.getElementById('cart_icon_desktop').addEventListener(
    'click', () => {
        document.getElementById('crt').classList.toggle("hidden")

    }
)

document.getElementById('cart_icon_sm').addEventListener(
    'click', () => {
        document.getElementById('crt').classList.toggle("hidden")

    }
)
