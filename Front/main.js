// Fonction pour récupérer les données de l'API uniquement si l'utilisateur est connecté
async function fetchDataIfLoggedIn() {
    const token = localStorage.getItem('token'); // Récupérer le token JWT depuis le stockage local
    if (token) {
        await fetchData(); // Appeler fetchData uniquement si un token est présent
    }
}

// Appeler la fonction fetchDataIfLoggedIn lorsque le DOM est entièrement chargé
document.addEventListener('DOMContentLoaded', fetchDataIfLoggedIn);

// Fonction pour récupérer les données de l'API
async function fetchData() {
    try {
        const apiUrl = `http://192.168.64.194:3000`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('La requête a échoué');
        }
        const data = await response.json();
        let select = document.getElementById("choix"); // Récupérer le menu déroulant
        let select2 = document.getElementById("choix2"); // Récupérer le menu déroulant

        // Effacer les options existantes
        select.innerHTML = '';
        select2.innerHTML = '';

        // Parcourir les données et ajouter des options au menu déroulant
        data.forEach(item => {
            let option = document.createElement("option");
            let option2 = document.createElement("option");
            option.value = item.nom;
            option.text = item.nom;
            option2.value = item.nom;
            option2.text = item.nom;
            select.appendChild(option);
            select2.appendChild(option2);
        });
    } catch (error) {
        // Gestion des erreurs ici
        console.error('Erreur lors de la récupération des données de l\'API:', error);
    }
}

// Code existant pour afficher les résultats et empêcher la soumission du formulaire
document.getElementById('button1').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre

    let select1Value = document.getElementById('choix').value;
    let select2Value = document.getElementById('choix2').value;
    afficherResultat(select1Value, select2Value);
});

function afficherResultat(value1, value2) {
    document.getElementById('name1').textContent = value1;
    document.getElementById('name2').textContent = value2;
}

//à vérifier
function afficherSpécific(value1, value2){
    document.getElementById('spécific1').textContent = value1;
}