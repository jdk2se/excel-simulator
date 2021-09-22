export class TableSelection {
	constructor(props) {
		// Для хранения выбранных ячеек
		this.group = [];
	}

	/**
	 *
	 *
	 * @param el instanceof DOM
	 */
	select(el) {
		console.log(el);
		this.group.push(el);
		el.addClass('selected');
	}

	selectGroup() {

	}
}
