import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {

	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
	}

	/**
	 * Получение шаблона компонента.
	 *
	 * @returns {string}
	 */
	toHtml() {
		return '';
	}

	/**
	 * Инициазизация компонента.
	 */
	init() {
		this.initDOMListeners();
	}

	/**
	 * Удаление компонента.
	 */
	destroy() {
		this.removeDOMListeners();
	}
}