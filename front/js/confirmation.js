const url = new URL(window.location);   // Récupération de l'url
const id = url.searchParams.get("id");      // Récupération de l'id

document.getElementById("orderId").innerHTML = id;