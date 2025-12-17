function placeOrder() {
    fetch("https://kavno-hoodies-backend.onrender.com/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: "customer@mail.com",
            product: "Black Hoodie",
            price: 799
        })
    })
        .then(res => res.json())
        .then(data => alert(data.message))
        .catch(err => alert("Order failed"));
}
