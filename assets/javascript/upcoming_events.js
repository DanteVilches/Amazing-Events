let cards = document.getElementById("cards");
let fragment = document.createDocumentFragment();
let date = currentDate.split("-");

for (let evento of data) {
	let parts = evento.date.split("-");
	if (Number(parts[0]) >= Number(date[0])) {
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
}
cards.appendChild(fragment);
