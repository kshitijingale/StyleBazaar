export const addItemToCart = (item, next) => {
    let cart = []
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push(item)
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    next()
}

export const removeItemFromCart = (productId) => {
    let cart = []
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
    }
    cart.forEach((product, index) => {
        if (product._id === productId) {
            cart.splice(index, 1)
        }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
}

export const loadCart = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
}

