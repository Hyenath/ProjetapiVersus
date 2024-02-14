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

                // Créer une nouvelle ligne
                var nouvelleLigne = tableau.insertRow();

                // Créer trois cellules dans la nouvelle ligne
        
                nouvelleLigne.insertCell(0).innerHTML = responseData.nom;


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
        // Manipulez les données de la réponse ici
        let div = document.getElementById("testa");
        // Obtenez la référence de la table HTML
        var table = document.createElement("table");
        table.id = "personnage";


        // Parcourez les données JSON et créez les lignes du tableau
        for (var i = 0; i < data.length; i++) {
            var row = table.insertRow(i + 0); // +1 pour éviter l'en-tête
            var cell1 = row.insertCell(0);


            // Remplissez les cellules avec les données JSON
            cell1.innerHTML = data[i].nom;
 
        }

        div.appendChild(table);
        //div.innerHTML= data.temperature + ' '  + data.unit;
        console.log(data);
    })
    .catch(error => {
        // Gestion des erreurs ici
        console.error('Erreur:', error);
    });
