import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import * as support from '@/components/table/table.funtions';
import {TableSelection} from './TableSelection';
import {$} from '@core/dom';
import { range } from '@core/utils';

/**
 * Компонент таблицы.
 */
export class Table extends ExcelComponent {
	static className = 'excel__table';

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options
		});
	}

	toHtml() {
		return createTable(25);
	}

	init() {
		super.init();
		const cell     = this.$root.find('[data-id="0:0"]');
		this.selection = new TableSelection();
		this.selection.select(cell);

		this.$emit('table:select', cell);

		this.$on('formula:input', (text) => {
			this.selection.current.text(text);
		});

		this.$on('formula:entered', () => {
			this.selection.current.focus();
		});
	}

	prepare() {}

	/**
	 * Ресайз колонок
	 *
	 * @param event
	 */
	onMousedown(event) {
		const target = $(event.target);

		if (support.shouldResize(event)) {
			resizeHandler(this.$root, event);
		}
		else if (support.isCtrlPressed(event)) {
			this.selection.selectRandomCells(target);
		}
		else if (support.isGroupSelection(event)) {
			const currentCell = target.getId(true);
			const targetCell  = this.selection.current.getId(true);

			const cols = range(currentCell.col, targetCell.col);
			const rows = range(currentCell.row, targetCell.row);
			const ids  = cols.reduce((acc, col) => {
				rows.forEach((row) => acc.push(`${row}:${col}`))

				return acc;
			}, []);

			const cells = ids.map((id) => this.$root.find(`[data-id="${id}"]`));

			this.selection.selectGroup(cells);
		}
		else if (support.isCell(event)) {
			this.selection.select(target);
		}
	}

	/**
	 * Обработка нажатия клавиш
	 *
	 * @param event
	 */
	onKeydown(event) {
		const {keyCode} = event;
		const keys = {
			9:  'tab',
			13: 'enter',
			37: 'left',
			38: 'up',
			39: 'right',
			40: 'down',
		};

		if (Object.keys(keys).includes(`${keyCode}`) && !event.shiftKey) {
			event.preventDefault();

			const currentId = this.selection.current.getId(true);
			const next      = support.nextSelector(keyCode, currentId);

			const el = this.$root.find(`[data-id="${next.row}:${next.col}"]`);
			this.selection.select(el);
			this.$emit('table:select', el);
		}
	}

	/**
	 * Редактирвоание текста в ячейке.
	 *
	 * @param event
	 */
	onInput(event) {
		this.$emit('table:input', $(event.target));
	}
}
