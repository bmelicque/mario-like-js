export default class Inputs {
    #right = false;
    #left = false;
    #jump = false;

	constructor() {}

	get right() {
		return this.#right;
	}
	get left() {
		return this.#left;
	}
	get jump() {
		return this.#jump;
	}

	addEventListeners() {
		addEventListener("keydown", (e) => {
			const keyCode = e.keyCode || e.key;
			switch (keyCode) {
				case 37:
				case 65:
				case 81:
					this.#left = true;
					break;
				case 39:
				case 68:
					this.#right = true;
					break;
				case 32:
				case 38:
				case 87:
				case 90:
					this.#jump = true;
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
					this.#left = false;
					break;
				case 39:
				case 68:
					this.#right = false;
					break;
				case 32:
				case 38:
				case 87:
				case 90:
					this.#jump = false;
					break;
				default:
					null;
			}
		});
	}
}
