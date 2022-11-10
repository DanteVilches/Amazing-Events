const queryString = location.search;
const data = info.events;

console.log(data);
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(id);
const evento = data.find((eventos) => eventos._id == id);
console.log(evento);
let sectionDetail = document.getElementById("sectionDetail");
sectionDetail.innerHTML = `<div class="w-50 h-75 p-3 border border-dark d-flex justify-content-center align-items-center detailImg gap-2">
		<img src="${evento.image}" alt="${evento.name}" />
	</div>
	<div class="d-flex flex-column justify-content-center align-items-center w-50 h-75 p-3 border border-dark detailP">
		
    <h3>${evento.name}</h3>

		<div>
			<p>Category: ${evento.category}</p>
			
			<p>Date: ${evento.date}</p>
            <p>Capacity: ${evento.capacity}</p>
			<p>${evento.description}</p>
			<h3>Price: $${evento.price}</h3>
		</div>
	</div> `;
