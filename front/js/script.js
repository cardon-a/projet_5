fetch("http://localhost:3000/api/products")     // Récupérer les données 
    .then(function(res) {
        if (res.ok) {       // Tester les données
            return res.json();
        }
    })
    .then(function(data) {     // Utiliser les données
        
        let productSection = document.getElementById("items");

        for (i = 0; i < data.length; i++) {
            const productCard = '<a href=\"./product.html?id='+data[i]._id+'\"><article><img src=\"'+data[i].imageUrl+'\" alt=\"'+data[i].altTxt+'\"></img><h3 class=\"productName\">'+data[i].name+'</h3><p class=\"productDescription\">'+data[i].description+'</p></article></a>';
            productSection.innerHTML += productCard;
        }
    })
    .catch(function(err) {      // En cas d'erreur
        console.log("Une erreur est survenue lors de la récupération des données.");
    })