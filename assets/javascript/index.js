let cards = document.getElementById("cards");
let containerCheck = document.getElementById("containerCheck");
let fragment2 = document.createDocumentFragment();
let fragment = document.createDocumentFragment();
const data = info.events;
let categories = [];

//Crear checkbox

data.forEach((element) => {
	if (!categories.includes(element.category)) {
		categories.push(element.category);
	}
});
categories.sort().forEach((category) => {
	let label = document.createElement("label");
	label.innerHTML += `<input type="checkbox"
									name="${category}"								
								/>${category}`;
	fragment2.appendChild(label);
});
containerCheck.appendChild(fragment2);

//Crear cards

data.forEach((evento) => {
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
							class="btn btn-primary align-self-stretch "
							>More info...</a
						>
					</div>`;
	fragment.appendChild(div);
});

cards.appendChild(fragment);
