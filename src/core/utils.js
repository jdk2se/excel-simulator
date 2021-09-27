export function capitalize(string) {
	if ('string' !== typeof  string) {
		return '';
	}

	return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Получение диапазона значений, который будет испльзован для выделения ячеек.
 *
 * @param {number} start
 * @param {number} end
 *
 * @returns {number[]}
 */
export function range (start, end) {
	const result = [];
	if (start > end) {
		[end, start] = [start, end];
	}

	for (let i = start; i <= end; i++) {
		result.push(i);
	}

	return result;
}// 0,3 => [0, 1, 2, 3]