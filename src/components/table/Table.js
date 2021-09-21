import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '../../core/dom';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.funtions';

/**
 * Компонент таблицы.
 */
export class Table extends ExcelComponent {
	static className = 'excel__table';

	constructor($root) {
		super($root, {
			listeners: ['mousedown'],
		});
	}

	toHtml() {
		return createTable(25);
	}

	/**
	 * Ресайз колонок
	 *
	 * @param event
	 */
	onMousedown(event) {
		if (shouldResize(event)) {
			resizeHandler(this.$root, event);
		}
	}
}
