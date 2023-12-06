function showAlert(title, comment, icon, button) {
    swal(title, comment, {
        icon: icon,
        buttons: {
            confirm: {
                className: button
            }
        }
    });
}

let allProducts = [

    {
        id: 1,
        name: "fresh apple",
        image: "apples.png",
        price: 800,
    },
    {
        id: 2,
        name: "Green Brocolli",
        image: "Brocolli.jpg",
        price: 600,
    },
    {
        id: 3,
        name: "Fresh Banana",
        image: "Banana.jpg",
        price: 650,
    },
    {
        id: 4,
        name: "Green Cabbage",
        image: "Cabbage.jpg",
        price: 400,
    },
    {
        id: 5,
        name: "Fresh Okro",
        image: "Okro.jpg",
        price: 500,
    },
    {
        id: 6,
        name: "Fresh Carrot",
        image: "Carrot.jpg",
        price: 700,
    },


    {
        id: 7,
        name: "Fresh Potatoes",
        image: "Potatoes.jpg",
        price: 500,
    },
    {
        id: 8,
        name: "Fresh Oranges",
        image: "Oranges.jpg",
        price: 480,
    },
    {
        id: 9,
        name: "Green Lettuce",
        image: "Lettuce.jpg",
        price: 650,
    },
    {
        id: 10,
        name: "Green Cucumber",
        image: "Cucumber.png",
        price: 180,
    },

    {
        id: 11,
        name: "Fresh Tomatoes",
        image: "Tomatoes.jpg",
        price: 500,
    },
    {
        id: 12,
        name: "Fresh Watermelon",
        image: "watermelon.png",
        price: 450,
    },
    {
        id: 13,
        name: "Fresh Grapes",
        image: "Grapes.jpg",
        price: 650,
    },
    {
        id: 21,
        name: "Fresh Watermelon",
        image: "watermelon.png",
        price: 450,
    },
    {
        id: 14,
        name: "Fresh Peppers",
        image: "Peppers.png",
        price: 150,
    },

    {
        id: 15,
        name: "Fresh Pineapple",
        image: "Pineapple.jpg",
        price: 400,
    },
    {
        id: 16,
        name: "Green Peas",
        image: "Peas.jpg",
        price: 600,
    },
    {
        id: 17,
        name: "Fresh Lemon",
        image: "Lemon.jpg",
        price: 180
    },


    {
        id: 18,
        name: "Fresh Pears",
        image: "pears-28f8900.jpg",
        price: 400,
    },
    {
        id: 20,
        name: "SourSops",
        image: "Soursops.jpeg",
        price: 800,
    },
    {
        id: 19,
        name: "Green Lime",
        image: "organic-lime.jpg",
        price: 600,
    },

];
const _$ = (el) => document.querySelector(el);
const productWrap = _$(".products-wrap"), cartWrap = _$(".cart-wrap"), cartTotal = _$(".total"), cartLabel = _$(".cart-label");
let cartContent = JSON.parse(localStorage.getItem("fruveg_cart")) || [];
showCartContent(cartContent)

allProducts.forEach(product => {
    //destructure each product object 
    const { id, image, name, price } = product;
    productWrap.innerHTML += `
    <div class="box">
        <img src="./images/${image}" alt="">
        <h3>${name}</h3>
        <div class="price">&#8358;${price}</div>
        <div class="stars">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star-half-alt"></i>
        </div>
        <button onclick="addToCart(${id})" class="btn">Add to cart</button>
    </div>	
`;
})
function addToCart(id) {
    const foundProduct = cartContent.find(item => item.id === id);
    if (foundProduct) {
        // showAlert("Product already in Cart", "You have this product in cart already", "warning", "btn btn-warning");
        cartContent = cartContent.map(cartItem => {
            if (cartItem.id === id) {
                return { ...cartItem, qty: +cartItem.qty + 1 }
            }
            else return cartItem;
        });
        showCartContent(cartContent)
    }
    else {
        const foundProduct = allProducts.find(item => item.id === id);
        cartContent = [...cartContent, { ...foundProduct, qty: 1 }];
        showCartContent(cartContent);
    }
}

function showCartContent(cartContent) {
    cartWrap.innerHTML = "";
    cartContent.forEach(cartItem => {
        const { id, image, name, price, qty } = cartItem;
        cartWrap.innerHTML += `
        <div class="box">
            <div class="cart-remove" onclick="removeFromCart(${id})"><i class="fas fa-trash"></i></div>
            <img src="./images/${image}" alt="${name}">
            <div class="content">
            <h3>${name}</h3>
            <span class="price">&#8358;${price.toLocaleString()}</span>
            <span class="quantity">qty : ${qty}</span>
            </div>
        </div>`;
    });
    const total = cartContent.reduce((oldTotal, cartItem) => {
        return (cartItem.price * cartItem.qty) + oldTotal
    }, 0);
    cartTotal.innerHTML = `&#8358;${total.toLocaleString()}`;
    cartLabel.innerHTML = cartContent.length;
    console.log({total: cartContent.length})
    localStorage.setItem("fruveg_cart", JSON.stringify(cartContent))
}
function removeFromCart(id) {
    const filterIdOutOfCart = cartContent.filter(item => item.id !== id);
    cartContent = filterIdOutOfCart;
    showCartContent(cartContent);
}
function changeInCart(id, input) {
    
}
