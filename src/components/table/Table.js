import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.funtions';
import {TableSelection} from './TableSelection';

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

	init() {
		super.init();
		this.selection = new TableSelection();
		const cell = this.$root.find('[data-id="0:0"]');
		this.selection.select(cell);
	}

	prepare() {

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
