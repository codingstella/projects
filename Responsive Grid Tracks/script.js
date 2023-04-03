const grid = document.querySelector('.grid')
const items = document.querySelectorAll('.item')

items.forEach((item) => {
	item.addEventListener('mouseenter', () => {
		gsap.to(grid, {
			'--track': '2fr',
			duration: 0.3,
		})
		gsap.to(item, {
			'--innerTrack': '1fr',
			duration: 0.3,
		})
	})

	item.addEventListener('mouseleave', () => {
		gsap.to(grid, {
			'--track': '1fr',
			duration: 0.3,
		})
		gsap.to(item, {
			'--innerTrack': '0fr',
			duration: 0.3,
		})
	})
})