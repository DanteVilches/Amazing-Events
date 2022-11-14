document.getElementById("tabla").style.overflow = "scroll";
let data;
let info;
let fn = (category) => category.category;
let objCategoriesUpcoming = [];
let objCategoriesPast = [];
let eventsWithCategoryPast;
let pastCategoriesNoRepeat;
let eventsWithCategoryUpcoming;
let upcomingCategoriesNoRepeat;
fetch("https://amazing-events.herokuapp.com/api/events")
	.then((response) => response.json())
	.then((json) => {
		info = json;
		data = info.events;

		data.forEach((event) => {
			event.percentage = parseInt(
				event.assistance
					? ((event.assistance * 100) / event.capacity).toFixed(2)
					: ((event.estimate * 100) / event.capacity).toFixed(2)
			);

			event.revenue = parseInt(
				event.assistance
					? event.assistance * event.price
					: event.estimate * event.price
			);
		});
		execute();
	})
	.catch((error) => console.log(error));

let highest = document.getElementById("highest");
let lowest = document.getElementById("lowest");
let larger = document.getElementById("larger");
let upcomingTable = document.getElementById("upcomingTable");
let pastTable = document.getElementById("pastTable");
let pastEvents;
let upcomingEvents;
function execute() {
	pastEvents = data.filter((event) => event.date < info.currentDate);

	upcomingEvents = data.filter((event) => event.date > info.currentDate);
	pastEvents.sort((a, b) => b.percentage - a.percentage);
	capacity = data.sort((a, b) => b.capacity - a.capacity);
	lowestPercentage = pastEvents.slice(-1);
	highestPercentage = pastEvents.slice(0, 1);
	largerCapacity = capacity.slice(0, 1);
	highest.innerHTML = highestPercentage[0].name;
	lowest.innerHTML = lowestPercentage[0].name;
	larger.innerHTML = largerCapacity[0].name;

	eventsWithCategoryPast = pastEvents.filter(fn);
	pastCategoriesNoRepeat = Array.from(new Set(eventsWithCategoryPast.map(fn)));

	eventsWithCategoryUpcoming = upcomingEvents.filter(fn);
	upcomingCategoriesNoRepeat = Array.from(
		new Set(eventsWithCategoryUpcoming.map(fn))
	);

	upcomingCategoriesNoRepeat.sort().forEach((category) => {
		let obj = {
			name: "",
			revenue: 0,
			percentage: 0,
		};

		obj.name = category;
		obj.revenue = upcomingEvents
			.filter((events) => events.category == category)
			.map((events) => events.revenue)
			.reduce((a, b) => a + b, 0);

		obj.percentage =
			upcomingEvents
				.filter((events) => events.category == category)
				.map((events) => events.percentage)
				.reduce((a, b) => a + b, 0) /
			upcomingEvents.filter((events) => events.category == category).length;
		objCategoriesUpcoming.push(obj);
	});

	objCategoriesUpcoming.forEach((upcomingEvent) => {
		upcomingTable.innerHTML += `
		<tr>
			<td>${upcomingEvent.name}</td>
			<td>$${upcomingEvent.revenue}</td>
			<td>${upcomingEvent.percentage.toFixed(2)}%</td>
		</tr>
		
		`;
	});

	pastCategoriesNoRepeat.sort().forEach((category) => {
		let obj = {
			name: "",
			revenue: 0,
			percentage: 0,
		};

		obj.name = category;
		obj.revenue = pastEvents
			.filter((events) => events.category == category)
			.map((events) => events.revenue)
			.reduce((a, b) => a + b, 0);

		obj.percentage =
			pastEvents
				.filter((events) => events.category == category)
				.map((events) => events.percentage)
				.reduce((a, b) => a + b, 0) /
			pastEvents.filter((events) => events.category == category).length;
		objCategoriesPast.push(obj);
	});
	console.log(objCategoriesPast.sort((a, b) => a.percentage < b.percentage));

	objCategoriesPast.forEach((pastEvent) => {
		pastTable.innerHTML += `
		<tr>
			<td>${pastEvent.name}</td>
			<td>$${pastEvent.revenue}</td>
			<td>${pastEvent.percentage.toFixed(2)}%</td>
		</tr>
		
		`;
	});
}
