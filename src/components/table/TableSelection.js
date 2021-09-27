export class TableSelection {
	static selectedClassName = 'selected';

	shiftWasPressed = false;

	constructor(props) {
		// Для хранения выбранных ячеек
		this.group   = [];
		this.current = null;
	}

	/**
	 * Пометка элемента как активного.
	 *
	 * @param el instanceof DOM
	 */
	select(el) {
		this.clearSelection();
		this.group.push(el);
		this.current = el;
		el.focus().addClass(TableSelection.selectedClassName);
	}

	/**
	 * Выделение группы ячеек, на которые произошёл клик. (При нажатом ctrl выделяем множество эл-тов)
	 *
	 * @param el instanceof DOM
	 */
	selectRandomCells(el) {
		this.group.push(el);
		el.addClass(TableSelection.selectedClassName);
	}

	/**
	 * Выделение ячеек "прямоугольником"
	 *
	 * @param array
	 */
	selectGroup(cells = []) {
		this.clearSelection();
		this.group = cells;
		cells.forEach((el) => {
			el.addClass(TableSelection.selectedClassName);
		});
	}

	/**
	 * Очистка активных элементов.
	 */
	clearSelection() {
		this.group.forEach((el) => el.removeClass(TableSelection.selectedClassName));
		this.group = [];
	}
}
