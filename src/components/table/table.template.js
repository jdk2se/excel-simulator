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
	for (let i = 0; i < rowsCount; i++) {
		const row = new Array(colsCount)
			.fill('')
			.map(toColumn)
			.join('')
		;

		rows.push(createRow(row));
	}

	return rows.join('');
}

/**
 * Создание ячейки
 *
 * @returns {string}
 */
function createCell() {
	return `
		<div class="cell" contenteditable></div>
	`;
}

/**
 * Создание колонки.
 *
 * @returns {string}
 */
function toColumn(col = '') {
	return `
		<div class="column">${col}</div>
	`;
}

/**
 * Создание строки.
 *
 * @returns {string}
 */
function createRow(content) {
	return `
		<div class="row">
			<div class="row-info"></div>
			<div class="row-data">${content}</div>
		</div>
	`;
}