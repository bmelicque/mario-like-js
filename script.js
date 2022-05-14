import Player from "./lib/models/player.js";
import Level from "./lib/models/level.js";
import Clock from "./lib/models/clock.js";

const MAX_X = 50;
const MIN_X = 15;
export const WORLD_WIDTH = 100;
export const WORLD_HEIGHT = 55;

const worldElement = document.querySelector("[data-world]");

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);

function setPixelToWorldScale() {
	let worldToPixelScale;
	if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT)
		worldToPixelScale = window.innerWidth / WORLD_WIDTH;
	else worldToPixelScale = window.innerHeight / WORLD_HEIGHT;

	worldElement.style.setProperty(
		"--world-to-pixel-scale",
		worldToPixelScale + "px"
	);

	worldElement.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
	worldElement.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}

const level = new Level(1);
const player = new Player();

const pressedKeys = {
	right: false,
	left: false,
	jump: false,
};

window._Clock = new Clock();
const clock = window._Clock;

let scrollOffset = 0;
function animate(time) {
	if (!clock.update(time)) return requestAnimationFrame(animate);

    player.update(pressedKeys, level.platforms)

	if (player.position.x > scrollOffset + MAX_X) {
		scrollOffset = player.position.x - MAX_X;
		level.scroll(scrollOffset);
	} else if (player.position.x < scrollOffset + MIN_X && scrollOffset > 0) {
		scrollOffset = player.position.x - MIN_X;
		level.scroll(scrollOffset);
	}

	level.handleGoal(player);

	requestAnimationFrame(animate);
}

animate();

addEventListener("keydown", () => console.log("Init"), { once: true });

addEventListener("keydown", (e) => {
	const keyCode = e.keyCode || e.key;
	switch (keyCode) {
		case 37:
		case 65:
		case 81:
			pressedKeys.left = true;
			break;
		case 39:
		case 68:
			pressedKeys.right = true;
			break;
		case 32:
		case 38:
		case 87:
		case 90:
			pressedKeys.jump = true;
			break;
		default:
			null;
	}
});
addEventListener("keyup", (e) => {
	const keyCode = e.keyCode || e.key;
	switch (keyCode) {
		case 37:
		case 65:
		case 81:
			pressedKeys.left = false;
			break;
		case 39:
		case 68:
			pressedKeys.right = false;
			break;
		case 32:
		case 38:
		case 87:
		case 90:
			pressedKeys.jump = false;
			break;
		default:
			null;
	}
});
