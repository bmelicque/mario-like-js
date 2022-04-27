import { levelPlatforms } from "./lib/levels/level-1.js";
import Platform from "./platform.js";
import Player, { GRAVITY, MOVEMENT_SPEED } from "./player.js";

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

const player = new Player();
player.draw();
const platforms = levelPlatforms.map(
	(platform, index) =>
		new Platform({
			...platform,
			id: index,
		})
);
platforms.forEach((platform) => platform.draw());

const pressedKeys = {
	right: false,
	left: false,
};

let lastTime;
function animate(time) {
	if (!lastTime) {
		lastTime = time;
		requestAnimationFrame(animate);
		return;
	}
	const delta = (time - lastTime) / 1000; // in seconds

	player.move(pressedKeys, platforms, delta);

	player.airborne = true;
	platforms.forEach((platform) => platform.handleCollision(player, delta));

	player.update(delta);
	platforms.forEach((platform) => platform.update(delta));

	lastTime = time;
	requestAnimationFrame(animate);
}

animate();

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
			player.jump();
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
		default:
			null;
	}
});
