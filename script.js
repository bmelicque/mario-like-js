import Player from "./lib/models/player.js";
import Level from "./lib/models/level.js";
import Clock from "./lib/models/clock.js";
import Inputs from "./lib/models/inputs.js";

export const WORLD_WIDTH = 100;
export const WORLD_HEIGHT = 55;

const inputs = new Inputs();
inputs.addEventListeners();

const level = new Level(1);
const player = new Player();

window._Clock = new Clock();
const clock = window._Clock;

function animate(time) {
	if (!clock.update(time)) return requestAnimationFrame(animate);

	player.handleInputs(inputs);

	player.handleGravity();

	player.handleLevelCollisions(level.platforms);

	level.handleItemCollisions(player);

	level.handleGoal(player);

	player.updatePosition();

	player.updateSprite();

	level.scroll(player);

	requestAnimationFrame(animate);
}

animate();