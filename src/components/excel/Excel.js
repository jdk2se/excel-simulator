import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';

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
		this.emitter    = new Emitter();
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
		const $root            = $.create('div', 'excel');
		const componentOptions = {
			emitter: this.emitter
		};

		this.components = this.components.map(Component => {
			const $el = $.create('div', Component.className);
			const component = new Component($el, componentOptions);

			$el.html(component.toHtml())
			$root.append($el)

			return component;
		})

		return $root
	}

	destroy() {
		this.components.forEach((component) => component.destroy());
	}
}
