import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';

/**
 * Компонент таблицы.
 */
export class Table extends ExcelComponent {
	static className = 'excel__table';

	constructor($root) {
		super($root, {
			listeners: ['click', 'mousedown', 'mousemove', 'mouseup'],
		});
	}

	toHtml() {
		return createTable(25);
	}

	onClick() {

	}

	onMousedown() {

	}

	onMouseMove() {

	}

	onMouseUp() {

	}
}