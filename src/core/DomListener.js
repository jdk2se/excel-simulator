import {capitalize} from '@core/utils';

/**
 * Корневой слушатель событий DOM.
 */
export class DomListener {
	constructor($root, listeners = []) {
		if (!$root) {
			throw new Error('No root provided for DomListener');
		}

		this.$root = $root;
		this.listeners = listeners;
	}

	/**
	 * Инициализация слушателей событий.
	 */
	initDOMListeners() {
		this.listeners.forEach((listener) => {
			const method    = getMethodName(listener);
			const component = this.name || '';

			if (!this[method]) {
				throw new Error(`Method: ${method} is not implemented in ${component} Component`);
			}

			this[method] = this[method].bind(this)
			this.$root.on(listener, this[method]);
		});
	}

	/**
	 * Удаление слушателей событий.
	 */
	removeDOMListeners() {
		this.listeners.forEach((listener) => {
			const method = getMethodName(listener);

			this.$root.off(listener, this[method]);
		});
	}
}

/**
 * Получение имени метода - обработчика события.
 *
 * @param {string} listener Наименование события
 *
 * @returns {string}
 */
function getMethodName(listener) {
	return 'on' + capitalize(listener);
}