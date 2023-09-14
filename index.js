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
