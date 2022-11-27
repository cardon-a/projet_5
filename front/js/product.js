const url = new URL(window.location);   // Récupération de l'url
const id = url.searchParams.get("id");      // Récupération de l'id

fetch("http://localhost:3000/api/products/"+id)     // Récupérer les données 
    .then(function(res) {
        if (res.ok) {       // Tester les données
            return res.json();
        }
    })
    .then(function(data) {     // Utiliser les données

        let titleHtml = document.querySelector("title");    // Modification du titre de la page
        titleHtml.innerHTML = data.name;

        let img = document.querySelector(".item__img");     // Modification de l'image
        img.innerHTML = "<img src=\""+data.imageUrl+"\" alt=\""+data.altTxt+"\">";

        let title = document.getElementById("title");       // Modification du nom du canapé
        title.innerHTML = data.name;

        let price = document.getElementById("price");       // Modification du prix
        price.innerHTML = data.price;

        let description = document.getElementById("description");   // Modification de la description
        description.innerHTML = data.description;

        let colors = document.getElementById("colors");     // Ajout des choix pour les couleurs
        for (let i = 0; i < data.colors.length; i++) {
            colors.innerHTML += "<option value=\""+data.colors[i]+"\">"+data.colors[i]+"</option>";
        }
    })
    .catch(function(err) {      // En cas d'erreur
        console.log("Une erreur est survenue lors de la récupération des données.");
    });


function getCart() {
    if (localStorage.cart != null) {
        console.log(localStorage.cart);
        let cart = JSON.parse(localStorage.cart);
        return cart;
    } else {
        let cart = [];
        return cart;
    }
}
console.log(localStorage.cart);
const addToCartBtn = document.getElementById("addToCart");      // Ajout d'une action lors du click sur le bouton addToCart
addToCartBtn.addEventListener("click", () => {
    let itemQuantity = document.getElementById("quantity");     // Récupération de la quantité et de la couleur choisie
    let itemColor = document.getElementById("colors");
    let cart = getCart();

    if (itemQuantity.value == 0 || itemColor.value == "") {     // Vérification des données renseignées par l'utilisateur
        return;
    }
    if (cart.length == 0) {     // Si le panier est vide, ajout direct de l'objet
        cart = [[id, itemColor.value, parseInt(itemQuantity.value)]];
    } else {        // Sinon vérification de l'existance de l'objet dans notre panier
        let itemExist = false;
        for (let i = 0; i < cart.length; i++) {
            if (id === cart[i][0] && itemColor.value === cart[i][1]) {
                itemExist = true;
                cart[i][2] += parseInt(itemQuantity.value);
            }
        }
        if (itemExist == false) {       // Si l'objet n'a pas été trouvé, ajout de l'objet au panier
            cart.push([id, itemColor.value, parseInt(itemQuantity.value)]);
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));     // Stockage des données dans le local storage
    console.log("Panier: "+cart);
})

