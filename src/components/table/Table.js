import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '../../core/dom';

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

	onMousedown(event) {
		if (event.target.dataset.resize) {
			const resizer = $(event.target);
			const parent  = resizer.closest('[data-type="resizable"]');
			const coords  = parent.getCoords();
			let   value   =  0;

			document.onmousemove = (e) => {
				const delta = Math.floor(e.pageX - coords.right);
				value = coords.width + delta;
				parent.$el.style.width = value + 'px';
			}

			document.onmouseup =  () => {
				document.querySelectorAll(`[data-col="${parent.data.col}"]`)
					.forEach((el) => {
						el.style.width = value + 'px';
					});
				document.onmousemove = null;
			}
		}
	}
}
