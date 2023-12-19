export const addItemToCart = (item, next) => {
    let cart = []
    if (localStorage.getItem('cart')) {
        item.count = 1;
        cart = JSON.parse(localStorage.getItem('cart'))
    }
    cart.push(item)
    localStorage.setItem("cart", JSON.stringify(cart));
    next()
}

export const removeItemFromCart = (productId) => {
    let cart = []
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
    }
    cart.forEach((product, index) => {
        if (product._id === productId) {
            cart.splice(index, 1)
        }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
}

export const loadCart = () => {
    if (localStorage.getItem('cart')) {
        return JSON.parse(localStorage.getItem('cart'))
    }
}

export const updateCart = (updatedItems) => {
    if (localStorage.getItem('cart')) {
        return localStorage.setItem("cart", JSON.stringify(updatedItems));
    }
}

