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
