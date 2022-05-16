import detectCollision from "../../collision.js";
import levelData from "../levels/index.js";
import Goal from "./goal.js";
import Item from "./item.js";
import Platform from "./platform.js";

const PLAYER_MAX_X = 50;
const PLAYER_MIN_X = 15;

export default class Level {
	#id;
	#scrollOffset;
	#data;
	#platforms = [];
	#items = [];
	#goal = {};
	#element = document.querySelector("[data-level]");

	constructor(levelId) {
		this.load(levelId);
	}

	load(levelId) {
		if (this.#data) this.#clean();

		this.#id = levelId;
		this.#scrollOffset = 0;
		this.#data = levelData[levelId];

		this.#goal = new Goal({ ...this.#data.levelGoal });
		this.#platforms = this.#data.levelPlatforms.map(
			(platform, index) =>
				new Platform({
					...platform,
					id: index,
				})
		);
		this.#items = this.#data.items?.map(
			(item, index) =>
				new Item({
					...item,
					id: index,
				})
		);

		this.#goal.draw();
		this.#platforms.forEach((platform) => platform.draw());
		this.#items?.forEach((item) => item.drawElement());
	}

	scroll(player) {
		if (player.position.x > this.#scrollOffset + PLAYER_MAX_X)
			this.#scrollOffset = player.position.x - PLAYER_MAX_X;
		else if (
			player.position.x < this.#scrollOffset + PLAYER_MIN_X &&
			this.#scrollOffset > 0
		)
			this.#scrollOffset = player.position.x - PLAYER_MIN_X;
		else return;

		this.#element.style.transform = `translateX(-${this.#scrollOffset}em)`;
	}

	handleItemCollisions(player) {
		this.#items?.forEach((item, index) => {
			if (item.detectPlayerCollision(player)) {
				player.addItemToInventory(item);
				item.eraseElement();
				this.#items.splice(index, 1);
			}
		});
	}

	handleGoal(player) {
		const {
			_Clock: { delta },
		} = window;

		if (!detectCollision(player, this.#goal, delta)) return;

		this.#id++;
		this.load(this.#id);
		player.reset();
	}

	#clean() {
		this.#platforms.forEach((platform) => platform.erase());
		this.#goal.erase();
	}

	get data() {
		return this.#data;
	}

	get platforms() {
		return this.#platforms;
	}
}
