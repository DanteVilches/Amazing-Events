let cards = document.getElementById("cards");
let containerCheck = document.getElementById("containerCheck");
let form = document.getElementById("formListen");
const data = info.events;

console.log([form]);
//Crear checkbox

const fn = (category) => category.category;
const eventsWithCategory = data.filter(fn);
const categories = eventsWithCategory.map(fn);
const categoriesNoRepeat = new Set(categories);
const arrayCategoriesNoRepeat = Array.from(categoriesNoRepeat);

function createCheckbox(array, container) {
	let aux = "";
	array.forEach(
		(value) =>
			(aux += ` <label class="btn btn-dark active "><input type="checkbox"
									value="${value}"								
								/>${value}
	 </label>`)
	);

	container.innerHTML = aux;
}

createCheckbox(categoriesNoRepeat, containerCheck);

//Crear cards

function createCard(evento) {
	let div = document.createElement("div");
	div.classList.add(`card`);
	div.innerHTML += `<img src="${evento.image}"
						class="card-img-top"
						alt="Image of ${evento.name}"/>
					<div class="card-body d-flex flex-column align-items-center">
						<h3 class="card-title">${evento.name}</h3>
						<p class="card-text">
							${evento.description}
						</p>
						<h3 class="mt-auto">
							$ ${evento.price}
						</h3>
						<a
							href="./details.html?id=${evento._id}"
							class="btn btn-primary align-self-stretch "
							>More info...</a
						>
					</div>`;
	return div;
}

function renderCards(events, container) {
	container.innerHTML = "";
	if (events.length == 0) {
		cards.innerHTML = `<h2 class="mt-5 text-light bg-dark p-3">There are no events to show</h2>`;
	} else {
		let fragment = document.createDocumentFragment();
		events.forEach((evento) => fragment.appendChild(createCard(evento)));

		container.appendChild(fragment);
	}
}

renderCards(eventsWithCategory, cards);

//filtro checkbox

function filterCheck() {
	const checked = Array.from(
		document.querySelectorAll('input[type="checkbox"]:checked')
	).map((input) => input.value);

	const filteredEvents = eventFilterByCategory(eventsWithCategory, checked);

	filteredEvents.length !== 0
		? renderCards(filteredEvents, cards)
		: (cards.innerHTML = "<h2>There are no events to show</h2>");

	return filteredEvents;
}

containerCheck.addEventListener("change", filterSearch);

function eventFilterByCategory(events, categoriesSelected) {
	let fn = (evento) =>
		categoriesSelected.includes(evento.category) ||
		categoriesSelected.length === 0;
	let filtered = events.filter(fn);
	return filtered;
}

// filtro Searchbar

let searchBar = document.querySelector("input[type=search]");
searchBar.addEventListener("keyup", filterSearch);

function filterSearch() {
	let filterInput = searchBar.value.toLowerCase().trim();
	let aux = [];

	filterCheck().forEach((element) => {
		if (element.name.toLocaleLowerCase().includes(filterInput)) {
			aux.push(element);
		} else {
		}
	});

	renderCards(aux, cards);
}
form.addEventListener("submit", (e) => {
	e.preventDefault();
});
