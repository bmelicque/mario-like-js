/*
SHORTHANDS:
    GRAVITY = 8 * JUMP_HEIGHT / JUMP_TIME²
    JUMP_SPEED = 4 * JUMP_HEIGHT / JUMP_TIME
*/

const INTIAL_POSITION = {
	x: 20,
	y: 10,
};
const PLAYER_WIDTH = 5;
const PLAYER_HEIGHT = 10;
export const JUMP_SPEED = 80; // 70
export const MOVEMENT_SPEED = 45;

export const GRAVITY = 160; //120

export default class Player {
	constructor() {
		this.position = INTIAL_POSITION;
		this.velocity = {
			x: 0,
			y: 0,
		};
		this.width = PLAYER_WIDTH;
		this.height = PLAYER_HEIGHT;
		this.airborne = true;
	}

	draw() {
		const playerElement = document.createElement("div");
		playerElement.classList.add("player");
		playerElement.style.transform = `translate(${this.position.x}em, ${this.position.y}em)`;
		playerElement.style.width = `${this.width}em`;
		playerElement.style.height = `${this.height}em`;
		document.querySelector("[data-level]").appendChild(playerElement);
	}

	update(delta) {
		this.position.x += this.velocity.x * delta;
		this.position.y += this.velocity.y * delta;

		const playerElement = document.querySelector(".player");
		playerElement.style.transform = `translate(${this.position.x}em, ${this.position.y}em)`;
	}

	move(pressedKeys, platforms, delta) {
		this.velocity.y += delta * GRAVITY;
		if (pressedKeys.right && !pressedKeys.left && this.position.x < 50)
			this.velocity.x = MOVEMENT_SPEED;
		else if (pressedKeys.left && !pressedKeys.right && this.position.x > 15)
			this.velocity.x = -MOVEMENT_SPEED;
		else {
			this.velocity.x = 0;

			if (pressedKeys.right && !pressedKeys.left)
				platforms.forEach(
					(platform) => (platform.velocity.x = -MOVEMENT_SPEED)
				);
			else if (pressedKeys.left && !pressedKeys.right)
				platforms.forEach((platform) => (platform.velocity.x = MOVEMENT_SPEED));
			else platforms.forEach((platform) => (platform.velocity.x = 0));
		}
	}

	jump() {
		if (this.airborne) {
			return;
		}
		this.airborne = true;
		this.velocity.y = -JUMP_SPEED;
	}
}
