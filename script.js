import levelData from "./lib/levels/index.js";
import Player from "./lib/models/player.js";
import Level from "./lib/models/level.js";

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
player.draw();

const pressedKeys = {
	right: false,
	left: false,
};

let lastTime;
let scrollOffset = 0;
function animate(time) {
	if (!lastTime) {
		lastTime = time;
		requestAnimationFrame(animate);
		return;
	}
	const delta = (time - lastTime) / 1000; // in seconds

	player.move(pressedKeys, delta);

	if (player.position.y + player.height >= WORLD_HEIGHT) player.reset();

	player.airborne = true;
	level.platforms.forEach((platform) =>
		platform.handleCollision(player, delta)
	);

	player.update(delta);
	if (player.position.x > scrollOffset + MAX_X) {
		scrollOffset = player.position.x - MAX_X;
		level.scroll(scrollOffset);
	} else if (player.position.x < scrollOffset + MIN_X && scrollOffset > 0) {
		scrollOffset = player.position.x - MIN_X;
		level.scroll(scrollOffset);
	}

	level.handleGoal(player, delta);

	lastTime = time;
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

function getLevelData(levelId) {
	return levelData[levelId];
}
