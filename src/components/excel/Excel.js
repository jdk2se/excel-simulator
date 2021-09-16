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
		this.$el        = $(selector);
		this.components = options.components || [];
	}

	/**
	 * Рендеринг.
	 */
	render() {
		this.$el.append(this.getRoot());
		this.components.forEach((component) => component.init());
	}

	/**
	 * Создание корневой ноды.
	 *
	 * @returns {Dom}
	 */
	getRoot() {
		const $root = $.create('div', 'excel')

		this.components = this.components.map(Component => {
			const $el = $.create('div', Component.className)
			const component = new Component($el)
			$el.html(component.toHtml())
			$root.append($el)

			return component;
		})

		return $root
	}
}
