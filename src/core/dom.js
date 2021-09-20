class Dom {
	constructor(selector) {
		this.$el = 'string' === typeof selector
			? document.querySelector(selector)
			: selector
		;
	}

	/**
	 * Получение/установка содержимого элемента.
	 * @param {string|null} html элемент
	 *
	 * @returns {string|Dom}
	 */
	html(html) {
		if ('string' === typeof html) {
			this.$el.innerHTML = html;

			return this;
		}

		return this.$el.outerHTML.trim();
	}

	/**
	 * Очистка содержимого элемента.
	 *
	 * @returns {Dom}
	 */
	clear() {
		this.html('');

		return this;
	}

	/**
	 * Полифил для нативного append.
	 */
	append(node) {
		if (node instanceof Dom) {
			node = node.$el
		}

		if (Element.prototype.append) {
			this.$el.append(node)
		}
		else {
			this.$el.appendChild(node)
		}

		return this
	}

	/**
	 * Получение ближайшего предка
	 *
	 * @param selector
	 *
	 * @return Dom
	 */
	closest(selector) {
		return $(this.$el.closest(selector));
	}

	/**
	 * Получение набора координат элемента
	 *
	 * @returns {DOMRect}
	 */
	getCoords() {
		return this.$el.getBoundingClientRect();
	}

	/**
	 *
	 * @returns {DOMStringMap}
	 */
	get data () {
		return this.$el.dataset;
	}

	/**
	 * Добавление прослушивания события.
	 *
	 * @param {string} eventType
	 * @param callback
	 */
	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback);
	}

	/**
	 * Удаление слушателя события
	 *
	 * @param {string} eventType
	 * @param callback
	 */
	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback);
	}
}

export function $(selector) {
	return new Dom(selector);
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

	return $(el);
}
