import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {

	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name          = options.name || '';
		this.emitter       = options.emitter;
		this.unsubscribers = [];

		this.prepare();
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
	 * Добавление Dom listeners.
	 */
	init() {
		this.initDOMListeners();
	}

	/**
	 * Удаление компонента.
	 * Удаление слушателей.
	 */
	destroy() {
		this.removeDOMListeners();
		this.unsubscribers.forEach((unsubscribe) => unsubscribe());
	}

	/**
	 * Настраиваем компонент до init.
	 */
	prepare() {

	}

	// Facade?
	/**
	 * Уведомление слушателей о событии event.
	 *
	 * @param event
	 * @param args
	 */
	$emit(event, ...args) {
		this.emitter.emit(event, ...args);
	}

	/**
	 * Подписка на событие event.
	 *
	 * @param event
	 * @param callback
	 */
	$on(event, callback) {
		const unsub = this.emitter.subscribe(event, callback);
		this.unsubscribers.push(unsub);
	}
}
