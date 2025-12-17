function placeOrder() {
    fetch("https://YOUR_BACKEND_URL/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: "customer@mail.com",
            product: "Black Hoodie",
            price: 799
        })
    })
        .then(res => res.json())
        .then(data => alert(data.message));
}
