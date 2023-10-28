let database = [];
const correctUsername = "SteinsaltzO";
const correctPassword = "ChaosEstOrdo74";

document.addEventListener('DOMContentLoaded', () => {
    loadDatabase();
});

function loadDatabase() {
    fetch('Kartei.json')
        .then(response => response.json())
        .then(data => {
            database = data;
        });
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === correctUsername && password === correctPassword) {
        document.getElementById('loginContainer').style.display = 'none';
        showList();
    } else {
        alert('Username oder Passwort ist falsch!');
    }
}

function showList() {
    const content = document.getElementById('content');
    content.innerHTML = '';
    
    content.innerHTML = `<input type="text" id="searchBox" placeholder="Suche...">
                         <button onclick="filterList()">Suchen</button>`;

    for (let person of database) {
        console.log('Kennziffer:', person.Kennziffer);
        content.innerHTML += `
            <div class="person" onclick="showPerson('${person.Kennziffer}')">
                <span>${person.Kennziffer}</span>
                <span>${person.Nachname}</span>
                <span>${person.Vorname}</span>
                <span>${person.Gruppe}</span>
                <span>${person.Stufe}</span>
            </div>`;
    }
}

function showPerson(kennziffer) {
    const person = database.find(p => p.Kennziffer === kennziffer);

    if (!person) {
        console.error('Person mit Kennziffer', kennziffer, 'nicht gefunden.');
        return;
    }

    const content = document.getElementById('content');
    content.innerHTML = `
        <button onclick="showList()">Zurück</button>
        <h1 style="color: blue; font-weight: bold;">${person.Vorname} ${person.Nachname} <span style="color: black;">${person.Kennziffer}</span></h1>
        <img src="${person.Aussehen}" alt="${person.Nachname}">
        <p>Kennziffer: ${person.Kennziffer}</p>
        <p>Nachname: ${person.Nachname}</p>
        <p>Vorname: ${person.Vorname}</p>
        <p>Geburtsdatum: ${person.Geburtsdatum}</p>
        <p>Beruf: ${person.Beruf}</p>
        <p>Gruppe: ${person.Gruppe}</p>
        <p>Stufe: ${person.Stufe}</p>
        <p>Anschrift: ${person.Anschrift}</p>`;
}

function filterList() {
    const value = document.getElementById('searchBox').value;

    const filteredPersons = database.filter(p => 
        p.Kennziffer.includes(value) || 
        p.Vorname.toLowerCase().includes(value.toLowerCase()) ||
        p.Nachname.toLowerCase().includes(value.toLowerCase())
    );

    const content = document.getElementById('content');
    content.innerHTML = '';

    content.innerHTML = `<input type="text" id="searchBox" value="${value}" placeholder="Suche...">
                         <button onclick="filterList()">Suchen</button>`;

    for (let person of filteredPersons) {
        content.innerHTML += `
            <div class="person" onclick="showPerson('${person.Kennziffer}')">
                <span>${person.Kennziffer}</span>
                <span>${person.Nachname}</span>
                <span>${person.Vorname}</span>
                <span>${person.Gruppe}</span>
                <span>${person.Stufe}</span>
            </div>`;
    }
}
