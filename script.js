let devicesProducts = [
	{
		type: 'desktop',
		price: [100, 1000],
		brands: ['hp', 'huawei']
	},
	{
		type: 'laptop',
		price: [50, 1500],
		brands: ['hp', 'huawei', 'lenovo']
	},
	{
		type: 'smartphone',
		price: [80, 2000],
		brands: ['hp', 'lenovo']
	},
	{
		type: 'tablet',
		price: [20, 1300],
		brands: ['lenovo']
	}
];

let cosmeticsProducts = [
	{
		type: 'blush',
		price: 100,
		colors: ['#c62828', '#ce93d8']
	},
	{
		type: 'eyeshadow',
		price: 50,
		colors: ['#ff8a80', '#f50057', '#c62828']
	},
	{
		type: 'lipstick',
		price: 80,
		colors: ['#f50057', '#c62828']
	},
	{
		type: 'nail-polish',
		price: 200,
		colors: ['#c62828', '#ce93d8']
	},
	{
		type: 'perfume',
		price: 300,
	}
];

let kitchenProducts = [
	{
		type: 'grater',
		price: 10,
		ingredients: [
			{
				name: 'Butter',
				count: '100 g'
			},
			{
				name: 'Bread',
				count: '200 g'
			},
			{
				name: 'Cheese',
				count: '500 g'
			}
		]
	},
	{
		type: 'pastry-bag',
		price: 25,
		ingredients: [
			{
				name: 'Powdered sugar',
				count: '210 g'
			},
			{
				name: 'Almond flour',
				count: '1 cup'
			},
			{
				name: 'Salt',
				count: '1 teaspoon'
			},
			{
				name: 'Egg whites',
				count: '3'
			},
			{
				name: 'Granulated sugar',
				count: '50 g'
			},
			{
				name: 'Pink gel food coloring',
				count: '2 drops'
			}
		]
	},
	{
		type: 'scale',
		price: 5,
		ingredients: [
			{
				name: 'Active dry yeast',
				count: '1 tablespoon'
			},
			{
				name: 'Sugar',
				count: '1 tablespoon'
			},
			{
				name: 'Salt',
				count: '1 tablespoon'
			},
			{
				name: 'Warm water',
				count: '2 cups'
			}
		]
	},
	{
		type: 'whisk',
		price: 15,
		ingredients: [
			{
				name: 'Freshly squeezed lemon juice',
				count: '2 tablespoon'
			},
			{
				name: 'Baking apples like Golden Delicious, Cortland, or Mutsu',
				count: '3 pounds'
			},
			{
				name: 'Sugar, plus more for sprinkling on the pie',
				count: '2/3 cup'
			},
			{
				name: 'Unsalted butter',
				count: '1/4 cup'
			},
			{
				name: 'Ground cinnamon',
				count: '1/4 teaspoon'
			},
			{
				name: 'large egg, lightly beaten',
				count: '1'
			},
		]
	}];

class Products {
	getItems() {
		return `<div><img src="./img/${this.category}/${this.type}.svg" width=25></div>
		<p><span>Name: </span>${this.type}</p>
		<p><span>Price: </span>${this.price}</p>`;
	}

	renderCard() {
		return `<div class="border_radius">${this.getItems()}</div>`;
	}
}

class CategoryProducts extends Products {
	constructor(category) {
		super();
		this.category = category;
	}
}

class KitchenLine extends CategoryProducts {
	getIngredients() {
		let ingredients = this.ingredients;
		let ingredientsArr = ingredients.map(function (item) {
			return `<li>${item.name}: ${item.count}</li>`;
		});
		return ingredientsArr.join('');
	}

	getItems() {
		return `<div><img class="main_icon" src="./img/${this.category}/${this.type}.svg" width=25></div>
		<p><span>Name: </span>${this.type}</p>
		<p class="border"><span>Price: </span>${this.price}</p>
		<h4>Ingredients</h4>
		<div ><img src="./img/kitchenIngredients/${this.type}.svg" width=25></div>
		<div><ul>${this.getIngredients()}</ul></div>`;
	}
}

class DevicesLine extends CategoryProducts {
	getImg() {
		let brand = this.brands;
		let brandsArray = brand.map(function (item) {
			return `<img class="dev_img" src="./img/devicesBrands/${item}.svg" width=20>`
		});
		return brandsArray.join('');
	}

	getItems() {
		this.price = (Array.isArray(this.price)) ? this.price.join('-') : this.price;

		return `<div><img class="main_icon" src="./img/${this.category}/${this.type}.svg" width=25></div>
		<p><span>Name: </span>${this.type}</p>
		<p class="border"><span>Price: </span>${this.price}</p>
		<div>${this.getImg()}</div>
		`;
	}
}

class CosmeticsLine extends CategoryProducts {
	getColor() {
		let color = this.colors;
		if (color) {
			let colorsArr = color.map(function (item) {
				return `<div class="circle" style="background: ${item}"></div>`;
			});
			return colorsArr.join('');
		} else {
			return '';
		};
	}

	getItems() {
		return `<div><img class="main_icon" src="./img/${this.category}/${this.type}.svg" width=25></div>
		<p><span>Name: </span>${this.type}</p>
		<p class="border"><span>Price: </span>${this.price}</p>
		<div class="circle_area">${this.getColor()}</div>`;
	}
}

let Kitchen = new KitchenLine("kitchen");
let Devices = new DevicesLine("devices");
let Cosmetics = new CosmeticsLine("cosmetics");

function rebuildArray(arr, objCr) {
	return arr.map(function (elem) {
		let newObj = Object.create(objCr);
		for (let item in elem) {
			newObj[item] = elem[item];
		}
		return newObj;
	});
}

let kitchenProducts_rebuild = rebuildArray(kitchenProducts, Kitchen);
let devicesProducts_rebuild = rebuildArray(devicesProducts, Devices);
let cosmeticsProducts_rebuild = rebuildArray(cosmeticsProducts, Cosmetics);

function drawCards(arr) {
	let arrRender = arr.map(function (elem) {
		return elem.renderCard();
	});
	document.write(`<section section >
						<h2>Category: ${arr[0].category}</h2>
						<div class="join">
				${arrRender.join('')}
						</div></section>`
	);
}

document.write(`<div class="container">`)
drawCards(kitchenProducts_rebuild);
drawCards(devicesProducts_rebuild);
drawCards(cosmeticsProducts_rebuild);
document.write(`</div>`);

//******************************

//class KitchenLine extends CategoryProducts {
//	getIngredients() {
//		let ingredients = this.ingredients;
//		let index = "count";
//		let result = `<ul>`;
//		let getItem = function (item) {
//			result += `<li>` + item.name + `:` + item[index] + `</li>`;
//		}
//		ingredients.forEach(getItem);
//		return result + `</ul>`;
//	}

//class KitchenLine extends CategoryProducts {
//	getIngredients() {
//		let ingredients = this.ingredients;
//		let result = `<ul>`;
//		ingredients.forEach(function (item) {
//			result += `<li>` + item.name + `: ` + item.count + `</li>`;
//		});
//		return result + `</ul>`;
//	}