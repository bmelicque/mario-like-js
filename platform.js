import detectCollision, { DIRECTIONS } from "./collision.js";

export default class Platform {
	constructor({ position, width, height, isSolid, id }) {
		this.position = position;
		this.width = width;
		this.height = height;
		this.isSolid = isSolid;
		this.velocity = {
			x: 0,
			y: 0,
		};
		this.id = id;
	}

	draw() {
		const platformElement = document.createElement("div");
		platformElement.classList.add("platform");
		platformElement.dataset.platform = this.id;
		platformElement.style.transform = `translate(${this.position.x}em, ${this.position.y}em)`;
		platformElement.style.width = `${this.width}em`;
		platformElement.style.height = `${this.height}em`;
		document.querySelector("[data-level]").appendChild(platformElement);
	}

	update(delta) {
		this.position.x += this.velocity.x * delta;

		const platformElement = document.querySelector(
			`[data-platform="${this.id}"]`
		);
		platformElement.style.transform = `translate(${this.position.x}em, ${this.position.y}em)`;
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
            console.log("from left");
			player.velocity.x = 0;
			player.position.x = this.position.x - player.width;
		}
		if (direction === DIRECTIONS.FROM_RIGHT) {
            console.log("from right");
			player.velocity.x = 0;
			player.position.x = this.position.x + this.width;
		}
	}
}
