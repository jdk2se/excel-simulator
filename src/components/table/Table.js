import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';

/**
 * Компонент таблицы.
 */
export class Table extends ExcelComponent {
	static className = 'excel__table';

	toHtml() {
		return createTable(25);
	}
}