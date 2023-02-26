document.getElementById('btnPeople').addEventListener('click', function () {
    fetch('https://swapi.dev/api/people')
        .then(function (response) {
            console.log(response)
            let data = response.json();
            return data;
        }).then(function (data) {
            console.log(data);
            printPeople(data.results)
        })
})

function printPeople(people) {
    let table = document.getElementById('table');
    let html = "";
    for (let person of people) {
        html += `<tr><th><td>Name: ${person.name}</td></th></tr>
        <tr><th><td>Height: ${person.height} </td></th></tr>
        <tr><th><td>Mass:${person.mass}</td></th></tr>
        <tr><th><td>Birth Year:${person.birth_year}</td></th></tr>
        <tr><th><td>Gender:${person.gender}</td></th></tr>
        <tr><th><td>Appearances:${person.films.length}</td></th></tr>`
    }
    table.innerHTML = html;
}

document.getElementById('btnShip').addEventListener('click', function () {
    fetch('https://swapi.dev/api/starships')
        .then(function (response) {
            // console.log(response)
            let data = response.json();
            return data;
        }).then(function (data) {
            // console.log(data);
            printShips(data.results)
            nextPage(data.next);
        })
})

function printShips(starships) {
    let table = document.getElementById('table');
    let html = "";
    for (let ship of starships) {
        html += `<tr><th>Name: </th>
        <th>Model: </th>
        <th>Manufactere: </th>
        <th>Cost: </th>
        <th>People Capacity: </th>
        <th>Class: </th></tr>
        <tr><td>${ship.name}</td><td>${ship.model}</td><td>${ship.manufacturer}</td><td>${ship.cost_in_credits}</td><td>${ship.passengers}</td><td>${ship.starship_class}</td>`
    }
    table.innerHTML = html;
}
