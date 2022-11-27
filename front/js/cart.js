function getCart() {        // Même fonction que pour le fichier product.js
    if (localStorage.cart != null) {
        console.log(localStorage.cart);
        let cart = JSON.parse(localStorage.cart);
        return cart;
    } else {
        let cart = [];
        return cart;
    }
}

let recapSection = document.getElementById("cart__items");      
let cart = getCart();
let totalPrice = parseInt(0);
let totalQuantity = parseInt(0);
console.log(cart.length);
console.log(cart);

if (cart.length == 0) {     // Affichage du message en cas de panier vide
    document.querySelector("h1").innerHTML = "Votre panier est vide.";
    document.getElementById("totalPrice").innerHTML = 0;
    document.getElementById("totalQuantity").innerHTML = 0;
} else {        // Sinon on parcourt notre panier
    for (let i = 0; i < cart.length; i++) {     // Pour chaque id présent dans le cart
        fetch("http://localhost:3000/api/products/"+ cart[i][0])     // Récupérer les données 
            .then(function(res) {
                if (res.ok) {       // Tester les données
                    return res.json();
                }
            })
            .then(function(data) {      // Utiliser les données
                const productCard = '<article class=\"cart__item\" data-id=\"'+ cart[i][0] +'\" data-color=\"'+ cart[i][1] +'\"><div class=\"cart__item__img\"><img src=\"'+ data.imageUrl +'\" alt=\"'+ data.altTxt +'\"></div><div class=\"cart__item__content\"><div class=\"cart__item__content__description\"><h2>'+ data.name +'</h2><p>'+ cart[i][1] +'</p><p>'+ data.price +' €</p></div><div class=\"cart__item__content__settings\"><div class=\"cart__item__content__settings__quantity\"><p>Qté : </p><input type=\"number\" class=\"itemQuantity\" name=\"itemQuantity\" min=\"1\" max=\"100\" value=\"'+ cart[i][2] +'\"></div><div class=\"cart__item__content__settings__delete\"><p class=\"deleteItem\">Supprimer</p></div></div></div></article>';
                recapSection.innerHTML += productCard;
                totalPrice += parseInt(data.price)*parseInt(cart[i][2]);
                totalQuantity += parseInt(cart[i][2]);
                document.getElementById("totalPrice").innerHTML = totalPrice;
                document.getElementById("totalQuantity").innerHTML = totalQuantity;
            })
            .catch(function(err) {      // En cas d'erreur
                console.log(err);
            });
    }
}