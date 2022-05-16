import detectCollision from "../../collision.js";

const ITEM_SIZE = 2;

export default class Item {
	#id;
	#position = {};
	#width = ITEM_SIZE;
	#height = ITEM_SIZE;
	#element;

	constructor({ position, id }) {
		this.#position = position;
		this.#id = id;
	}

	get position() {
		return this.#position;
	}

	get width() {
		return this.#width;
	}

	get height() {
		return this.#height;
	}

	drawElement() {
		this.#element = document.createElement("div");
		this.#element.dataset.item = this.#id;
		this.#element.classList.add("item");
		this.#element.style.transform = `translate(${this.#position.x}em, ${
			this.#position.y
		}em)`;
		this.#element.style.width = `${this.#width}em`;
		this.#element.style.height = `${this.#height}em`;
		this.#element.style.background = `red`;
		document.querySelector("[data-level]").appendChild(this.#element);
	}

    detectPlayerCollision(player) {
        const {
			_Clock: { delta },
		} = window;

		return !!detectCollision(player, this, delta);
    }

	eraseElement() {
		this.#element.remove();
		this.#element = undefined;
	}
}
