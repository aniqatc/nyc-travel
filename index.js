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

const mapButton = document.querySelector('.toggle-map');
const map = document.querySelector('.destination-map');
const destinationImg = document.querySelector(
	'.destination-card__img-wrapper img'
);

mapButton.addEventListener('click', function () {
	console.log('Button clicked');
	console.log('map.style.display:', map.style.display);
	if (map.style.display === 'none') {
		map.style.display = 'block';
		destinationImg.style.gridColumn = 'span 1';
		destinationImg.style.aspectRatio = '1 / 1';
	} else {
		map.style.display = 'none';
		destinationImg.style.gridColumn = 'span 2';
		destinationImg.style.aspectRatio = '2 / 1';
	}
});
