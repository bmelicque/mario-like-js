/*
SHORTHANDS:
    GRAVITY = 8 * JUMP_HEIGHT / JUMP_TIME²
    JUMP_SPEED = 4 * JUMP_HEIGHT / JUMP_TIME
*/

import { playerElementInnerHTML } from "../../assets/playerElement.js";

const INTIAL_POSITION = {
	x: 20,
	y: 30,
};
const PLAYER_WIDTH = 3;
const PLAYER_HEIGHT = 4.4;
const JUMP_HEIGHT = 20; // normalized game length unit
const JUMP_DURATION = 1; // seconds
export const MOVEMENT_SPEED = 45;
export const JUMP_SPEED = (4 * JUMP_HEIGHT) / JUMP_DURATION;
export const GRAVITY = (8 * JUMP_HEIGHT) / JUMP_DURATION ** 2;

export default class Player {
	constructor() {
		this.position = { ...INTIAL_POSITION };
		this.velocity = {
			x: 0,
			y: 0,
		};
		this.width = PLAYER_WIDTH;
		this.height = PLAYER_HEIGHT;
		this.airborne = true;
		this.animationTime = 0;
	}

	draw() {
		const playerElement = document.createElement("div");
		playerElement.classList.add("player");
		playerElement.innerHTML = playerElementInnerHTML;
		playerElement.style.transform = `translate(${this.position.x}em, ${this.position.y}em)`;
		playerElement.style.width = `${this.width}em`;
		playerElement.style.height = `${this.height}em`;
		document.querySelector("[data-level]").appendChild(playerElement);
	}

	update(delta) {
		this.position.x += this.velocity.x * delta;
		if (this.position.x <= 0) this.position.x = 0;
		this.position.y += this.velocity.y * delta;

		const playerElement = document.querySelector(".player");
		playerElement.style.transform = `translate(${this.position.x}em, ${this.position.y}em)`;

		if (this.velocity.x && !this.airborne)
			playerElement.classList.add("player--running");
		else playerElement.classList.remove("player--running");

		if (this.velocity.x > 0)
			playerElement.classList.remove("player--facing-backwards");
		else if (this.velocity.x < 0)
			playerElement.classList.add("player--facing-backwards");

		if (this.airborne) playerElement.classList.add("player--airborne");
		else playerElement.classList.remove("player--airborne");
	}

	move(pressedKeys, delta) {
		this.velocity.y += delta * GRAVITY;
		if (pressedKeys.right && !pressedKeys.left)
			this.velocity.x = MOVEMENT_SPEED;
		else if (pressedKeys.left && !pressedKeys.right)
			this.velocity.x = -MOVEMENT_SPEED;
		else {
			this.velocity.x = 0;
		}
	}

	jump() {
		if (this.airborne) {
			return;
		}
		this.airborne = true;
		this.velocity.y = -JUMP_SPEED;
	}

	reset() {
		this.position = { ...INTIAL_POSITION };
		this.velocity = {
			x: 0,
			y: 0,
		};
		this.airborne = true;

		this.erase();
		this.draw();
	}

	erase() {
		document.querySelector(".player").remove();
	}
}
