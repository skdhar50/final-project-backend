const { Category } = require("../models/category");

module.exports.getCategories = async (req, res) => {
	let categories = [];
	let parents = [];
	let temp = await Category.find();

	temp.forEach((cat) => {
		categories.push({
			_id: cat._id,
			name: cat.name,
			parent_id: cat?.parent_id,
		});

		if (!cat.parent_id) {
			parents.push({
				_id: cat._id,
				name: cat.name,
			});
		}
	});

	let queue = [...parents];

	while (queue.length > 0) {
		let firstParent = queue.shift();

		let child = categories.filter((category) => {
			if (category.parent_id) {
				return category.parent_id.toString() === firstParent._id.toString();
			}
		});
		if (child.length > 0) {
			firstParent.submenu = child;
			queue.push(...child);
		}
	}

	return res.status(200).send({ data: parents });
};
