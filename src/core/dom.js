export function $(selector) {
	return new Dom(selector);
}

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
	 * Найти все элементы
	 */
	findAll(selector) {
		return this.$el.querySelectorAll(selector);
	}

	/**
	 * Найти один элемент
	 *
	 * @param {string} selector
	 */
	find(selector) {
		return $(this.$el.querySelector(selector));
	}

	/**
	 * Добавление класса
	 *
	 * @param {string} className
	 */
	addClass(className) {
		this.$el.classList.add(className);
	}

	/**
	 * Удаление класса
	 *
	 * @param {string} className
	 */
	removeClass(className) {
		this.$el.classList.remove(className);
	}

	/**
	 * Стилизация элемента
	 *
	 * @param {Object} styles {property: value}
	 */
	css(styles = {}) {
		Object.keys(styles).forEach((property) => {
			this.$el.style[property] = styles[property];
		});
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
	 * Удаление слушателя события.
	 *
	 * @param {string} eventType
	 * @param callback
	 */
	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback);
	}

	/**
	 * Получение идентификатора ячейки.
	 *
	 * @param {boolean} parse Необходимо ли парсить id
	 *
	 * @returns {string}
	 */
	getId(parse) {
		if (!parse) {
			return this.data.id;
		}

		const parsed = this.data.id.split(':');
		return {
			row: Number(parsed[0]),
			col: Number(parsed[1]),
		};
	}

	/**
	 * Добавление фокуса элементу.
	 *
	 * @returns {Dom}
	 */
	focus() {
		this.$el.focus();
		return this;
	}

	/**
	 * Добавление текста в эл-т.
	 *
	 * @param text
	 */
	text(text) {
		if ('string' === typeof text) {
			this.$el.textContent = text;
			return this;
		}
		else {
			if ('input' === this.$el.tagName.toLowerCase()) {
				return this.$el.value.trim();
			}

			return this.$el.textContent.trim();
		}
	}
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
