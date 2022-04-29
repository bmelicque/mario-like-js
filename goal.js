export default class Goal {
	constructor({ position, width, height }) {
		this.position = position;
		this.width = width;
		this.height = height;
	}

	draw() {
		const goalElement = document.createElement("div");
		goalElement.classList.add("goal");
		goalElement.style.transform = `translate(${this.position.x}em, ${this.position.y}em)`;
		goalElement.style.width = `${this.width}em`;
		goalElement.style.height = `${this.height}em`;
		document.querySelector("[data-level]").appendChild(goalElement);
	}
}
