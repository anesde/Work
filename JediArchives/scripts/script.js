let navigationService = {
    peopleBtn: document.getElementById('btnPeople'),
    shipBtn: document.getElementById('btnShip'),
    nextBtn: document.getElementById('next'),
    prevBtn: document.getElementById('prev'),
    table: document.getElementById('divTable'),
    currentPage: 1,
    btnPressed: '',
    sortBy: null,
    isAsc: true,
    registerEventListener: function () {
        this.peopleBtn.addEventListener('click', function () {
            // console.log('abc2');
            navigationService.btnPressed = 'people';
            apiService.getPeople(navigationService.currentPage);
        })
        this.shipBtn.addEventListener('click', function () {
            // console.log('abc3');
            navigationService.btnPressed = 'ships';
            apiService.getShips(navigationService.currentPage);
        })
        this.nextBtn.addEventListener('click', function () {
            navigationService.currentPage++;
            if (navigationService.btnPressed === 'people') {
                apiService.getPeople(navigationService.currentPage);
            }

            if (navigationService.btnPressed === 'ships') {
                apiService.getShips(navigationService.currentPage)
            }
            // console.log(navigationService.currentPage)
        })
        this.prevBtn.addEventListener('click', function () {
            navigationService.currentPage--;
            if (navigationService.btnPressed === 'people') {
                apiService.getPeople(navigationService.currentPage);
            }
            if (navigationService.btnPressed === 'ships') {
                apiService.getShips(navigationService.currentPage);
            }
            // console.log(navigationService.currentPage)
        })
        this.table.addEventListener('click', (event) => {
            let array = ['Name', 'Height', 'Mass', 'Gender', 'Birth Year', 'Appearences'];
            let maps = [
                {
                    header: "Birth Year",
                    property: 'birth_year'
                },
                {
                    header: "Name",
                    property: 'name'
                },
                {
                    header: "Height",
                    property: 'height'
                },
                {
                    header: "Mass",
                    property: 'mass'
                }, {
                    header: "Gender",
                    property: 'gender'
                },
                {
                    header: "Appearences",
                    property: 'films'
                }
            ]
            if (event.target.nodeName === 'TH' && array.includes(event.target.id)) {
                let mapedProp = maps.find(x => x.header === event.target.id);
                if (navigationService.sortBy === null) {
                    navigationService.sortBy = mapedProp.property;
                    navigationService.isAsc = true;
                } else {
                    navigationService.isAsc = !navigationService.isAsc;
                }
                apiService.getPeople(navigationService.currentPage, navigationService.sortBy, navigationService.isAsc)
            }
            // console.log(event.target.nodeName);
        })
    },

}

let apiService = {
    baseUrl: "https://swapi.dev/api/",
    getPeople: function (page, sortBy = null, isAsc = true) {
        uiService.toggleLoader(true);
        let peopleUrl = `${this.baseUrl}people/?page=${page}`;
        fetch(peopleUrl)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                if (sortBy) {
                    data = {
                        ...data,
                        results: isAsc ? data.results.sort((x, y) => x[sortBy].localeCompare(y[sortBy])) : data.results.sort((x, y) => y[sortBy].localeCompare(x[sortBy]))
                    }
                }
                // check for next page
                uiService.toggleButtons(data.next, data.previous)
                // loader
                uiService.toggleLoader(false);
                // show result
                uiService.createTable(data.results);
            }).catch(function (error) {
                // console.log(error);
                // uiService.errorMessage(error);
                uiService.toggleLoader(false);
            })
    },
    getShips: function (page) {
        uiService.toggleLoader(true)
        let shipUrl = `${this.baseUrl}starships/?page=${page}`
        fetch(shipUrl)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                uiService.toggleButtons(data.next, data.previous);
                uiService.toggleLoader(false);
                uiService.tableShips(data.results);
            }).catch(function (error) {
                // console.log(error);
                // uiService.errorMessage();
                uiService.toggleLoader(false);
            })
    },
}


let uiService = {
    createTableHeader: function (table) {
        let array = ['Name', 'Height', 'Mass', 'Gender', 'Birth Year', 'Appearences'];
        let tr = document.createElement('tr');
        for (let item of array) {
            let th = document.createElement('th');
            th.id = item;
            tr.appendChild(th).innerText = item;
        }
        table.appendChild(tr);
    },

    createTableBody: function (people, table) {
        for (let person of people) {
            let tr = document.createElement('tr');

            let nameCol = document.createElement('td');
            tr.appendChild(nameCol).innerText = person.name;

            let heightCol = document.createElement('td');
            tr.appendChild(heightCol).innerText = person.height;

            let massCol = document.createElement('td');
            tr.appendChild(massCol).innerText = person.mass;

            let genderCol = document.createElement('td');
            tr.appendChild(genderCol).innerText = person.gender;

            let birth_yearCol = document.createElement('td');
            tr.appendChild(birth_yearCol).innerText = person.birth_year;

            let filmsCol = document.createElement('td');
            tr.appendChild(filmsCol).innerText = person.films.length;

            table.appendChild(tr);
        }
    },
    tableHeaderShips: function (table) {
        let array = ['Name', 'Model', 'Manufacterer', 'Cost', 'People Capacity', 'Class'];
        let tr = document.createElement('tr');
        for (let item of array) {
            let th = document.createElement('th');
            th.id = item;
            tr.appendChild(th).innerText = item;
        }
        table.appendChild(tr);
    },
    tableBodyShips: function (ships, table) {
        for (let ship of ships) {
            let tr = document.createElement('tr');

            let nameCol = document.createElement('td');
            tr.appendChild(nameCol).innerText = ship.name;

            let modelCol = document.createElement('td');
            tr.appendChild(modelCol).innerText = ship.model;

            let manufacturerCol = document.createElement('td');
            tr.appendChild(manufacturerCol).innerText = ship.manufacturer;

            let costCol = document.createElement('td');
            tr.appendChild(costCol).innerText = ship.cost_in_credits;

            let peopleCol = document.createElement('td');
            tr.appendChild(peopleCol).innerText = ship.passengers;

            let classCol = document.createElement('td');
            tr.appendChild(classCol).innerText = ship.starship_class;

            table.appendChild(tr);
        }
    },
    tableShips: function (data) {
        let div = document.getElementById('divTable');
        let table = document.createElement('table');
        div.innerHTML = '';
        table.style.margin = '0 auto';
        table.setAttribute('border', '2');
        div.appendChild(table);

        uiService.tableHeaderShips(table);
        uiService.tableBodyShips(data, table);
    },
    createTable: function (data) {
        let div = document.getElementById('divTable');
        let table = document.createElement('table');
        div.innerHTML = '';
        table.style.margin = '0 auto';
        table.setAttribute('border', '2');
        div.appendChild(table);

        uiService.createTableHeader(table);
        uiService.createTableBody(data, table);
    },
    checkForPage: function (page) {
        return page === null;
    },
    toggleButtons: function (toggleNext, togglePrev) {
        if (toggleNext) {
            navigationService.nextBtn.style.display = '';
        } else {
            navigationService.nextBtn.style.display = 'none';
        }
        if (togglePrev) {
            navigationService.prevBtn.style.display = '';
        } else {
            navigationService.prevBtn.style.display = 'none';
        }
    },

    toggleLoader: function (show) {
        let loader = document.getElementById('loader');
        if (show) {
            loader.style.display = 'block';
        } else {
            loader.style.display = 'none';
        }
    },

    errorMessage: function () {
        let errorHeader = document.getElementById('errorMsg');
        errorHeader.innerText = 'The page is not avalible';
    }
}

navigationService.registerEventListener();



