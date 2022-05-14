export default class Clock {
	#lastTime;
	#delta;

	constructor() {}

	update(time) {
		if (!this.#lastTime) {
			this.#lastTime = time;
			return false;
		}
		this.#delta = (time - this.#lastTime) / 1000;
		this.#lastTime = time;
		return true;
	}

	get delta() {
		return this.#delta;
	}
}
