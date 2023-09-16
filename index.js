/* MENU LINK */
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
		navTitle.style.color = '#909090';
		navTitle.style.borderBottom = '1px solid #909090';
		navTitle.style.fontWeight = '400';
	})
);

/* ADDING MAP TO DESTINATION CARDS */
const mapButtons = document.querySelectorAll('.toggle-map');
const maps = document.querySelectorAll('.destination-map');
const destinationImages = document.querySelectorAll(
	'.destination-card__img-wrapper img'
);

mapButtons.forEach((mapButton, index) => {
	mapButton.addEventListener('click', function () {
		const map = maps[index];
		const img = destinationImages[index];

		if (map.style.display === 'none') {
			map.style.display = 'block';
			img.style.gridColumn = 'span 1';
			img.style.filter = 'grayscale(75%)';
		} else {
			map.style.display = 'none';
			img.style.gridColumn = 'span 2';
			img.style.filter = 'sepia(10%) grayscale(25%)';
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
		const hotelHeadings = document.querySelectorAll(
			'.neighborhood-card__hotel-wrapper h4'
		);
		const hotelBookings = document.querySelectorAll('.hotel-booking');
		const hotelCards = document.querySelectorAll(
			'.neighborhood-card__hotel-wrapper'
		);
		const hotelAddresses = document.querySelectorAll('.hotel-address');
		const hotelNumbers = document.querySelectorAll('.hotel-number');
		const hotelImages = document.querySelectorAll(
			'.neighborhood-card__hotel-card img'
		);

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
						`Picture of ${data[target].name}`
					);
				});
			});
		});
	});

/* Add current time */
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
setTimeout(updateTime, 60000);
