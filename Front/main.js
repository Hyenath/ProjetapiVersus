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
        const apiUrl = `http://192.168.64.243:3000`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('La requête a échoué');
        }
        const data = await response.json();
        let select = document.getElementById("choix"); // Récupérer le menu déroulant
        let select2 = document.getElementById("choix2"); // Récupérer le menu déroulant
        let select3 = document.getElementById("choixA1"); // Récupérer le menu déroulant
        let select4 = document.getElementById("choixA2"); // Récupérer le menu déroulant

        // Effacer les options existantes
        select.innerHTML = '';
        select2.innerHTML = '';
        select3.innerHTML = '';
        select4.innerHTML = '';

        // Parcourir les données et ajouter des options au menu déroulant
        data.forEach(item => {
            let option = document.createElement("option");
            option.value = item.nom;
            option.text = item.nom;
            option.setAttribute('forcex', item.forcetest);
            option.setAttribute('vitessex', item.vitesse);
            option.setAttribute('defensex', item.defense);
            option.setAttribute('durabilitex', item.durabilité);
            option.setAttribute('intelligencex', item.intelligence);
        
            let option2 = option.cloneNode(true);
        
            let option3 = document.createElement("option");
            option3.value = item.nomA;
            option3.text = item.nomA;
            option3.setAttribute('bonusx', item.bonus);
            option3.setAttribute('malusx', item.malus);
            option3.setAttribute('effectsx', item.effects);
        
            let option4 = option3.cloneNode(true);
        
            select.appendChild(option);
            select2.appendChild(option2);
            select3.appendChild(option3);
            select4.appendChild(option4);
        });
        
      


    } catch (error) {
        // Gestion des erreurs ici
        console.error('Erreur lors de la récupération des données de l\'API:', error);
    }
}

// Code existant pour afficher les résultats et empêcher la soumission du formulaire
document.getElementById('button1').addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre

    document.getElementById('carte1').classList.remove('hidden');
    document.getElementById('carte2').classList.remove('hidden');
    document.getElementById('image1').classList.remove('hidden');
    document.getElementById('image2').classList.remove('hidden');

    let select1Value = document.getElementById('choix').value;
    let select2Value = document.getElementById('choix2').value;
    let select3Value = document.getElementById('choix').options[document.getElementById('choix').selectedIndex].getAttribute('forcex');
    let select4Value = document.getElementById('choix2').options[document.getElementById('choix2').selectedIndex].getAttribute('forcex');
    let select5Value = document.getElementById('choix').options[document.getElementById('choix').selectedIndex].getAttribute('vitessex');
    let select6Value = document.getElementById('choix2').options[document.getElementById('choix2').selectedIndex].getAttribute('vitessex');
    let select7Value = document.getElementById('choix').options[document.getElementById('choix').selectedIndex].getAttribute('defensex');
    let select8Value = document.getElementById('choix2').options[document.getElementById('choix2').selectedIndex].getAttribute('defensex');
    let select9Value = document.getElementById('choix').options[document.getElementById('choix').selectedIndex].getAttribute('durabilitex');
    let select10Value = document.getElementById('choix2').options[document.getElementById('choix2').selectedIndex].getAttribute('durabilitex');
    let select11Value = document.getElementById('choix').options[document.getElementById('choix').selectedIndex].getAttribute('intelligencex');
    let select12Value = document.getElementById('choix2').options[document.getElementById('choix2').selectedIndex].getAttribute('intelligencex');

    let select13Value = document.getElementById('choixA1').value;
    let select14Value = document.getElementById('choixA2').value;
    let select15Value = document.getElementById('choixA1').options[document.getElementById('choixA1').selectedIndex].getAttribute('Bonusx');
    let select16Value = document.getElementById('choixA2').options[document.getElementById('choixA2').selectedIndex].getAttribute('Bonusx');
    let select17Value = document.getElementById('choixA1').options[document.getElementById('choixA1').selectedIndex].getAttribute('Malusx');
    let select18Value = document.getElementById('choixA2').options[document.getElementById('choixA2').selectedIndex].getAttribute('Malusx');
    let select19Value = document.getElementById('choixA1').options[document.getElementById('choixA1').selectedIndex].getAttribute('Effectsx');
    let select20Value = document.getElementById('choixA2').options[document.getElementById('choixA2').selectedIndex].getAttribute('Effectsx');
    afficherResultat(select1Value, select2Value, select3Value, select4Value, select5Value, select6Value, select7Value, select8Value, select9Value, select10Value, select11Value, select12Value, select13Value, select14Value, select15Value, select16Value, select17Value, select18Value, select19Value, select20Value);
});

function afficherResultat(value1, value2, value3, value4, value5, value6, value7, value8, value9, value10, value11, value12, value13, value14, value15, value16, value17, value18, value19, value20) {
    document.getElementById('name1').textContent = value1;
    document.getElementById('name2').textContent = value2;
    document.getElementById('force1').textContent = value3;
    document.getElementById('force2').textContent = value4;
    document.getElementById('vitesse1').textContent = value5;
    document.getElementById('vitesse2').textContent = value6;
    document.getElementById('defense1').textContent = value7;
    document.getElementById('defense2').textContent = value8;
    document.getElementById('durabilite1').textContent = value9;
    document.getElementById('durabilite2').textContent = value10;
    document.getElementById('intelligence1').textContent = value11;
    document.getElementById('intelligence2').textContent = value12;

    document.getElementById('nameA1').textContent = value13;
    document.getElementById('nameA2').textContent = value14;
    document.getElementById('bonus1').textContent = value15;
    document.getElementById('bonus2').textContent = value16;
    document.getElementById('malus1').textContent = value17;
    document.getElementById('malus2').textContent = value18;
    document.getElementById('effects1').textContent = value19;
    document.getElementById('effects2').textContent = value20;
    
    // Appeler la fonction pour récupérer les données des personnages à chaque fois que le bouton est cliqué

    let image1 = document.getElementById('image1');
    let image2 = document.getElementById('image2');
    console.log(value1, value2);
    if (value1 === "Doom Slayer") {
        image1.src = "Images/doomguy-doom-2880x1800-12603.jpg";
    } else if (value1 === "J2") {
        image1.src = "chemin/vers/image1.jpg";
    } else if (value1 === "Batman") {
        image1.src = "Images/batman-wallpapers-574x1024.jpg";
    } else if (value1 === "Superman") {
        image1.src = "Images/Superman_50.jpg";
    }

    if (value2 === "Doom Slayer") {
        image2.src = "Images/doomguy-doom-2880x1800-12603.jpg";
    } else if (value2 === "J2") {
        image2.src = "chemin/vers/image2.jpg";
    } else if (value2 === "Batman") {
        image2.src = "Images/batman-wallpapers-574x1024.jpg";
    } else if (value2 === "Superman") {
        image2.src = "Images/Superman_50.jpg";
    }
}
