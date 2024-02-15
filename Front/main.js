var button = document.getElementById('button1');
button.addEventListener('click', function () {
    let input1 = document.getElementById('Moninput1')
    appelApi(input1.value);
});

function appelApi(lelLgin) {
    const data = { nom: lelLgin};

    const url = `http://192.168.64.194:3000/addUser`;


    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la requête HTTP');
            }
            return response.json();
        })
        .then(responseData => {
            // Vous pouvez traiter la réponse de l'API ici
            if (responseData.success) {
                console.log('Réponse de l\'API :', responseData);
                var tableau = document.getElementById("personnage");


            } else {
                console.log('Réponse de l\'API :', "Insert Ko");
            }

        })
        .catch(error => {
            console.error('Erreur :', error);
        });
}

// URL de l'API que vous souhaitez interroger
const apiUrl = `http://192.168.64.194:3000`;

// Utilisation de fetch() pour effectuer une requête GET
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('La requête a échoué');
        }
        return response.json(); // Convertit la réponse en format JSON
    })
    .then(data => {
        let select = document.getElementById("choix"); // Récupérer le menu déroulant
        let select2 = document.getElementById("choix2"); // Récupérer le menu déroulant

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
    })
    .catch(error => {
        // Gestion des erreurs ici
        console.error('Erreur:', error);
    });
