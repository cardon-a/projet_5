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
        for (i = 0; i < data.colors.length; i++) {
            colors.innerHTML += "<option value=\""+data.colors[i]+"\">"+data.colors[i]+"</option>";
        }
    })
    .catch(function(err) {      // En cas d'erreur
        console.log("Une erreur est survenue lors de la récupération des données.");
    })