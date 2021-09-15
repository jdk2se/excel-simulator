class Dom {
	constructor() {

	}
}

export function $() {
	return new Dom();
}

/**
 * Создание элемента с указанными классами.
 *
 * @param {string} tagName Наименование тега
 * @param {string} classes Классы "class1, class2"
 */
$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName);
	if (classes) {
		el.classList.add(classes);
	}

	return el;
}