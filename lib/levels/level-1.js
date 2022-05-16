export const levelPlatforms = [
	// z < 0;
	{
		position: {
			x: 260,
			y: 20,
		},
		width: 20,
		height: 40,
		isSolid: false,
		isBehind: true,
	},
	{
		position: {
			x: 300,
			y: 20,
		},
		width: 20,
		height: 40,
		isSolid: false,
		isBehind: true,
	},

	// z = 0;
	{
		position: {
			x: 0,
			y: 50,
		},
		width: 400,
		height: 10,
		isSolid: true,
	},
	{
		position: {
			x: 70,
			y: 35,
		},
		width: 20,
		height: 30,
		isSolid: true,
	},
	{
		position: {
			x: 130,
			y: 35,
		},
		width: 20,
		height: 30,
		isSolid: true,
	},
	{
		position: {
			x: 189,
			y: 35,
		},
		width: 21,
		height: 20,
		isSolid: true,
	},
	{
		position: {
			x: 170,
			y: 20,
		},
		width: 20,
		height: 40,
		isSolid: true,
	},
	{
		position: {
			x: 319,
			y: 35,
		},
		width: 22,
		height: 1,
		isSolid: false,
	},
	{
		position: {
			x: 300,
			y: 20,
		},
		width: 20,
		height: 16,
		isSolid: true,
	},
	{
		position: {
			x: 379,
			y: 35,
		},
		width: 62,
		height: 1,
		isSolid: true,
	},
	{
		position: {
			x: 359,
			y: 35,
		},
		width: 21,
		height: 20,
		isSolid: true,
	},
	{
		position: {
			x: 340,
			y: 20,
		},
		width: 20,
		height: 40,
		isSolid: true,
	},
	{
		position: {
			x: 459,
			y: 50,
		},
		width: 40,
		height: 40,
		isSolid: true,
	},
	{
		position: {
			x: 440,
			y: 35,
		},
		width: 20,
		height: 40,
		isSolid: true,
	},
];

// export const items = [
// 	{
// 		position: {
// 			x: 50,
// 			y: 40,
// 		},
// 	},
// ];

export const levelGoal = {
	position: {
		x: 490,
		y: 0,
	},
	width: 1,
	height: 55,
};

const levelData = { levelPlatforms, items, levelGoal };
export default levelData;
