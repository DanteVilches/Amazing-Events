let cards = document.getElementById("cards");
let containerCheck = document.getElementById("containerCheck");
let fragment = document.createDocumentFragment();
let fragment2 = document.createDocumentFragment();
const data = info.events;

//Crear checkbox

const fn = (category) => category.category;
const categories = new Set(data.filter(fn).map(fn).sort());

function createCheckbox(array, container) {
	array.forEach((category) => {
		let label = document.createElement("label");
		label.innerHTML += `<input type="checkbox"
									value="${category}"								
								/>${category}`;
		fragment2.appendChild(label);
	});
	container.appendChild(fragment2);
}

createCheckbox(categories, containerCheck);
// Crear cards
function createCard(array) {
	cards.innerHTML = "";
	array.forEach((evento) => {
		if (evento.date > info.currentDate) {
			let div = document.createElement(`div`);
			div.classList.add(`card`);
			div.innerHTML += `<img
						src="${evento.image}"
						class="card-img-top"
						alt="Image of ${evento.name}"
					/>
					<div class="card-body d-flex flex-column align-items-center">
						<h3 class="card-title">${evento.name}</h3>
						<p class="card-text">
							${evento.description}
						</p>
						<h3 class="mt-auto">
							$ ${evento.price}
						</h3>
						<a
							href="./details.html"
							class="btn btn-primary align-self-stretch"
							>More info...</a
						>
						
					</div>`;
			fragment.appendChild(div);
		}
	});
	cards.appendChild(fragment);
}

// filtro searchbar

let searchBar = document.querySelector("input[type=search]");
searchBar.addEventListener("keyup", filterSearch);
function filterSearch() {
	let filterInput = searchBar.value.toLowerCase().trim();
	let aux = [];
	filterCheck().forEach((element) => {
		if (element.name.toLocaleLowerCase().includes(filterInput)) {
			aux.push(element);
		}
	});
	createCard(aux);
}

// filtro Check box

function filterCheck() {
	let checkboxes = document.querySelectorAll("input[type=checkbox]");
	let arrayCheckboxes = Array.from(checkboxes);
	let checkboxesSeleccionados = arrayCheckboxes.filter(
		(checkbox) => checkbox.checked == true
	);
	let allChecks = checkboxesSeleccionados.map((checkbox) => checkbox.value);
	let eventFilteredByCategory = [];
	if (allChecks.length == 0) {
		eventFilteredByCategory = data;
		createCard(data);
	} else {
		eventFilteredByCategory = data.filter((evento) =>
			allChecks.includes(evento.category)
		);
		createCard(eventFilteredByCategory);
	}

	return eventFilteredByCategory;
}

containerCheck.addEventListener("change", filterCheck); // escucha check y modifica las card dependiendo del seleccionado
createCard(data);
