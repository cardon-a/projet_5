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

function changeQuantity(id, color, quantity) {
    let cart = getCart();
    for (let i = 0; i < cart.length; i++) {
        if (id === cart[i][0] && color === cart[i][1]) {
            cart[i][2] = quantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        }
    }
}

function deleteItem(id, color) {
    let cart = getCart();
    for (let i = 0; i < cart.length; i++) {
        if (id === cart[i][0] && color === cart[i][1]) {
            cart.splice(i, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        }
    }
}

function testMail(mail) {       // Test de l'adresse mail grâce à regexMail
    let regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    if (regexMail.test(mail) == false) {
        return false;
    } else {
        document.getElementById("emailErrorMsg").innerHTML = null;
        return true;
    }
}

function testName(name, location) {       // Test des noms et de l'adresse grâce à regexName
    let regexName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i;
    if (regexName.test(name) == false) {
        return false;
    } else {
        document.getElementById(`${location}ErrorMsg`).innerHTML = null;
        return true;
    }
}


const recapSection = document.getElementById("cart__items");      
let cart = getCart();
let totalPrice = parseInt(0);
let totalQuantity = parseInt(0);

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
                console.log(cart[i][0] +"id et color "+ cart[i][1]);
                const productCard = `
                    <article class="cart__item" data-id="${cart[i][0]}" data-color="${cart[i][1]}">
                        <div class="cart__item__img">
                            <img src="${data.imageUrl}" alt="${data.altTxt}">
                        </div>
                        <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${data.name}</h2>
                                <p>${cart[i][1]}</p>
                                <p>${data.price} €</p>
                            </div>
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                    <p>Qté : </p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQuantity('${cart[i][0]}', '${cart[i][1]}', this.value)" min="1" max="100" value="${cart[i][2]}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem" onclick="deleteItem('${cart[i][0]}', '${cart[i][1]}')">Supprimer</p>
                                </div>
                            </div>
                        </div>
                    </article>`;
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

const order = document.getElementById("order");
order.addEventListener('click', (event) => {
    event.preventDefault();

    let validateAll = true
    let cart = getCart();
    let contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value
    }
    console.log(contact);
    if (testMail(contact["email"]) == false) {        // Pas de test Regex pour l'adresse car peut avoir trop de formes diverses
        document.getElementById("emailErrorMsg").innerHTML = "Veuillez entrer une adresse mail valide.";
        validateAll = false;
    }
    if (testName(contact["firstName"], "firstName") == false) {
        document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez entrer un prénom valide.";
        validateAll = false;
    }
    if (testName(contact["lastName"], "lastName") == false) {
        document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez entrer un nom valide.";
        validateAll = false;
    }
    if (testName(contact["city"], "city") == false) {
        document.getElementById("cityErrorMsg").innerHTML = "Veuillez entrer une ville valide.";
        validateAll = false;
    }
    if (contact["address"] == "") {     // Test si l'addresse a bien été renseigné
        document.getElementById("addressErrorMsg").innerHTML = "Veuillez entrer une addresse valide.";
        validateAll = false;
    } else {
        document.getElementById("addressErrorMsg").innerHTML = null;
    }
    if (validateAll == true && cart.length == 0) {      // Ajout d'un message d'erreur en cas de panier vide
        document.getElementById("cartErrorMsg").innerHTML = "Votre commande n'est pas valide, veuillez vérifier votre panier.";
        validateAll = false;        
    } else {
        document.getElementById("cartErrorMsg").innerHTML = null;
    }
    
})