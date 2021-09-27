const CODES = {
	A: 65,
	Z: 90
}

/**
 * Приведение элемента массива к символу.
 *
 * @param {any} _ Элемент массива (не используем)
 * @param {int} index Индекс элемента в массиве
 *
 * @returns {string}
 */
function toChar(_, index) {
	return String.fromCharCode(CODES.A + index);
}

/**
 * Шаблон создания таблицы.
 *
 * @param {int} rowsCount Количество строк
 *
 * @returns {string}
 */
export function createTable(rowsCount = 15) {
	const rows       = [];
	const colsCount  = CODES.Z - CODES.A + 1;
	const letterCols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(toColumn)
		.join('')
	;

	rows.push(createRow(letterCols));
	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(toCell(row))
			.join('')
		;

		rows.push(createRow(cells, row + 1));
	}

	return rows.join('');
}

/**
 * Создание ячейки
 */
function toCell(row) {
	return function(_, col) {
		return `
		<div 
			class="cell" 
			contenteditable 
			data-col="${col}" 
			data-id="${row}:${col}"
			data-type="cell"
		>
		</div>
	`;
	}
}

/**
 * Создание колонки.
 *
 * @returns {string}
 */
function toColumn(col = '', index) {
	return `
		<div class="column" data-type="resizable" data-col="${index}">
			${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`;
}

/**
 * Создание строки.
 *
 * @param {string} content Содержимое
 * @param {int}    index   Индекс строки
 *
 * @returns {string}
 */
function createRow(content, index = 0) {
	const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
	return `
		<div class="row" data-type="resizable">
			<div class="row-info">
				${index ? index : ''}
				${resize}
			</div>
			<div class="row-data">${content}</div>
		</div>
	`;
}
