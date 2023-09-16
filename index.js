/* UPDATE TIME */
function updateTime() {
	const timeEl = document.getElementById('time');
	const date = new Date();
	const time = date.toLocaleTimeString(undefined, {
		timeZone: 'America/New_York',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	});
	timeEl.textContent = `${time}`;
}
updateTime();
setTimeout(updateTime, 30000);

/* MENU HOVER STYLING */
const navLinks = document.querySelectorAll('.nav-link');
const navTitle = document.querySelector('.header-nav__title');

navLinks.forEach(el =>
	el.addEventListener('mouseenter', function () {
		navTitle.style.color = '#fff';
		navTitle.style.borderBottom = '1.5px solid #fff';
		navTitle.style.fontWeight = '500';
	})
);

navLinks.forEach(el =>
	el.addEventListener('mouseleave', function () {
		navTitle.style.color = '#bfbfbf';
		navTitle.style.borderBottom = '1px solid #bfbfbf';
		navTitle.style.fontWeight = '400';
	})
);

/* WEATHER CARD LIVE */
const currentLocation = 'New York City';
const apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&appid=c5589319ae8ab1af9ff0b16018c9f76b&units=imperial`;

fetch(`${apiWeather}`)
	.then(response => {
		return response.json();
	})
	.then(data => {
		const weatherEl = document.getElementById('weather');
		weatherEl.textContent = `${Math.round(data.main.temp)}°F`;

		const weatherIcon = document.getElementById('weather-icon');
		fetch('/content/weather.json')
			.then(response => {
				return response.json();
			})
			.then(myIcons => {
				for (let i = 0; i < myIcons.length; i++) {
					if (data.weather[0].icon === myIcons[i].icon) {
						weatherIcon.setAttribute('src', `${myIcons[i].src}`);
						weatherIcon.setAttribute('alt', `${myIcons[i].alt}`);
					}
				}
			});
	});

/* ADDING MAP TO DESTINATION CARDS */
const mapButtons = document.querySelectorAll('.toggle-map-btn');
const maps = document.querySelectorAll('.destination-map');
const destinationImages = document.querySelectorAll(
	'.destination-card__img-wrapper img'
);

mapButtons.forEach((mapButton, index) => {
	mapButton.addEventListener('click', function () {
		if (maps[index].style.display === 'none') {
			maps[index].style.display = 'block';
			destinationImages[index].style.gridColumn = 'span 1';
			destinationImages[index].style.filter = 'grayscale(75%)';
		} else {
			maps[index].style.display = 'none';
			destinationImages[index].style.gridColumn = 'span 2';
			destinationImages[index].style.filter = 'sepia(10%) grayscale(25%)';
		}
	});
});

/* PULL NEIGHBORHOOD INFO AND ADD TO PAGE */
fetch('/content/neighborhood.json')
	.then(response => {
		return response.json();
	})
	.then(data => {
		const neighborhoodHeadings = document.querySelectorAll(
			'.neighborhood-card__heading'
		);
		const neighborhoodText = document.querySelectorAll(
			'.neighborhood-card__intro p'
		);
		const neighborhoodList = document.querySelectorAll(
			'.neighborhood-card__intro ul'
		);

		neighborhoodHeadings.forEach((el, index) => {
			el.textContent = `${data[index].group}`;
		});

		neighborhoodText.forEach((el, index) => {
			el.textContent = `${data[index].description}`;
		});

		neighborhoodList.forEach((el, index) => {
			for (let i = 0; i < data[index].neighborhoods.length; i++) {
				const li = document.createElement('li');
				li.textContent = `${data[index].neighborhoods[i]}`;
				el.appendChild(li);
			}
		});
	});

/* PULL HOTEL INFO & ADD TO PAGE */
fetch('/content/hotels.json')
	.then(response => {
		return response.json();
	})
	.then(data => {
		const hotelCards = document.querySelectorAll('.hotel-card-wrapper');
		const hotelHeadings = document.querySelectorAll('.hotel-card-wrapper h4');
		const hotelImages = document.querySelectorAll('.hotel-card img');
		const hotelBookings = document.querySelectorAll('.hotel-booking-btn');
		const hotelAddresses = document.querySelectorAll('.hotel-address');
		const hotelNumbers = document.querySelectorAll('.hotel-number');

		hotelCards.forEach((card, index) => {
			const hotelButtons = card.querySelectorAll('.hotel-button');
			hotelButtons.forEach(button => {
				button.addEventListener('click', function (event) {
					event.preventDefault();

					hotelButtons.forEach(el => el.classList.remove('active-button'));
					button.classList.add('active-button');

					const target = button.getAttribute('data-target');

					hotelHeadings[index].textContent = `${data[target].name}`;
					hotelBookings[index].setAttribute('href', `${data[target].booking}`);
					hotelAddresses[index].textContent = `${data[target].address}`;
					hotelNumbers[index].textContent = `${data[target].contact}`;
					hotelImages[index].setAttribute('src', `${data[target].img}`);
					hotelImages[index].setAttribute(
						'alt',
						`Image of ${data[target].name}`
					);
				});
			});
		});
	});

/* Write note to use that this website is for practice so reservation was not completed
-- Add to both top form & cta at the bottom
*/

/* Get Flight Time to NYC Via Airport Code */
/* Get Flight Time to NYC Via Geolocation */
