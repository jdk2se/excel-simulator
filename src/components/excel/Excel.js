import {$} from '@core/dom';

/**
 * Инициализация приложения.
 */
export class Excel {
	/**
	 * @param {string} selector Селектор блока
	 * @param {Object} options  Параметры инициализации
	 */
	constructor(selector, options) {
		this.$el = document.querySelector(selector);
		this.components = options.components || [];
	}

	/**
	 * Рендеринг.
	 */
	render() {
		this.$el.appendChild(this.getRoot());
	}

	/**
	 * Создание корневой ноды.
	 *
	 * @returns {HTMLDivElement}
	 */
	getRoot() {
		const $root = $.create('div', 'excel');

		this.components.forEach((Component) => {
			const $el = $.create('div', Component.className);

			const component = new Component($el);
			$el.innerHTML = component.toHtml();
			$root.appendChild($el);
		});

		return $root;
	}
}
