const CODES = { //@todo global const
	A: 65,
	Z: 90
}

/**
 * Необходимо ли ресайзить таблицу.
 *
 * @param event
 *
 * @returns {string}
 */
export function shouldResize(event) {
	return event.target.dataset.resize;
}

/**
 * Является ли элемент ячейкой таблицы.
 *
 * @param event
 *
 * @returns {boolean}
 */
export function isCell(event) {
	return event.target.dataset.type === 'cell';
}

/**
 * Происходит ли выделение рандомных ячеек.
 *
 * @param event
 *
 * @returns {boolean}
 */
export function isCtrlPressed(event) {
	return event.ctrlKey;
}

/**
 * Происходит ли выделение группы ячеек
 *
 * @param event
 */
export function isGroupSelection(event) {
	return event.shiftKey;
}

/**
 * Получение следующей активной ячейки
 *
 * @param keyCode
 * @param current
 *
 * @returns {any}
 */
export function nextSelector(keyCode, current) {
	const next = Object.assign(current);

	switch (keyCode) {
		case 9: // right
		case 39:
			next.col = (next.col + 1 > (CODES.Z - CODES.A) ? (CODES.Z - CODES.A) : next.col + 1);
			break;
		case 37: //left
			next.col = (next.col - 1 > -1 ? next.col - 1 : 0);
			break;
		case 38: //up
			next.row = (next.row - 1 > -1 ? next.row - 1 : 0);
			break;
		case 13: // down
		case 40:
			next.row = (next.row + 1 > 25 ? 25 : next.row + 1); // @todo to const
			break
	}

	return next;
}