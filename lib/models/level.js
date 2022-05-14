import detectCollision from "../../collision.js";
import levelData from "../levels/index.js";
import Goal from "./goal.js";
import Platform from "./platform.js";

export default class Level {
	#data;
	#platforms = [];
	#goal = {};
	#element = document.querySelector("[data-level]");
	#id;

	constructor(levelId) {
		this.load(levelId);
	}

	load(levelId) {
		if (this.#data) this.#clean();

		this.#id = levelId;
		this.#data = levelData[levelId];

		this.#goal = new Goal({ ...this.#data.levelGoal });
		this.#platforms = this.#data.levelPlatforms.map(
			(platform, index) =>
				new Platform({
					...platform,
					id: index,
				})
		);

		this.#goal.draw();
		this.#platforms.forEach((platform) => platform.draw());
	}

	scroll(offset) {
		this.#element.style.transform = `translateX(-${offset}em)`;
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
