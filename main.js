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

document.getElementById('registerBtn').addEventListener('click', function() {
    document.getElementById('registerForm').classList.remove('hidden');
});

document.getElementById('loginBtn').addEventListener('click', function() {
    document.getElementById('loginForm').classList.remove('hidden');
});

document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('http://192.168.64.194:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('http://192.168.64.194:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error('Error:', error);
    }
});