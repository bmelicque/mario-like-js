import {
	platformBodyElement,
	platformTopElement,
} from "../../assets/platformElement.js";
import detectCollision, { DIRECTIONS } from "../../collision.js";

const COLUMN_WIDTH = 20;
const ROW_HEIGHT = 12;

export default class Platform {
	constructor({ position, width, height, isSolid, isBehind, id }) {
		this.position = position;
		this.width = width;
		this.height = height;
		this.isSolid = isSolid;
		this.velocity = {
			x: 0,
			y: 0,
		};
		this.isBehind = isBehind;
		this.id = id;
	}

	draw() {
		const platformElement = document.createElement("div");
		platformElement.classList.add("platform");
		if (this.isBehind) platformElement.classList.add("platform--behind");
		const columns = Math.ceil(this.width / COLUMN_WIDTH);
		const rows = Math.ceil(this.height / ROW_HEIGHT);
		platformElement.style.setProperty("--columns", columns);
		platformElement.style.setProperty("--rows", rows);
		platformElement.style.setProperty("--column-width", COLUMN_WIDTH + "em");
		platformElement.style.setProperty("--row-height", ROW_HEIGHT + "em");
		for (let i = 0; i < columns; i++) {
			platformElement.innerHTML += platformTopElement;
		}
		// const loops = columns * (rows - 1);
		// for (let i = 0; i < loops; i++) {
		// 	platformElement.innerHTML += platformBodyElement;
		// }
		platformElement.dataset.platform = this.id;
		platformElement.style.transform = `translate(${this.position.x}em, ${this.position.y}em)`;
		platformElement.style.width = `${this.width}em`;
		platformElement.style.height = `${this.height}em`;

		document.querySelector("[data-level]").appendChild(platformElement);
	}

	update(offset, delta) {
		this.position.x += this.velocity.x * delta;

		const platformElement = document.querySelector(
			`[data-platform="${this.id}"]`
		);
		platformElement.style.transform = `translate(${
			this.position.x - offset
		}em, ${this.position.y}em)`;
	}

	erase() {
		const platformElement = document.querySelector(
			`[data-platform="${this.id}"]`
		);
        platformElement.remove();
	}

	handleCollision(player, delta) {
		const collision = detectCollision(player, this, delta);
		const direction =
			this.isSolid || collision === DIRECTIONS.FROM_TOP ? collision : undefined;

		if (direction === DIRECTIONS.FROM_TOP) {
			player.velocity.y = 0;
			player.position.y = this.position.y - player.height;
			player.airborne = false;
		}
		if (direction === DIRECTIONS.FROM_BELOW) {
			player.velocity.y = 0;
			player.position.y = this.position.y + this.height;
		}
		if (direction === DIRECTIONS.FROM_LEFT) {
			player.velocity.x = 0;
			player.position.x = this.position.x - player.width;
		}
		if (direction === DIRECTIONS.FROM_RIGHT) {
			player.velocity.x = 0;
			player.position.x = this.position.x + this.width;
		}
	}
}
