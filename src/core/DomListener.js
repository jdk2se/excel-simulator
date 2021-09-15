/**
 * Корневой слушатель событий DOM.
 */
export class DomListener {
	constructor($root) {
		if (!$root) {
			throw new Error('No root provided for DomListener');
		}

		this.$root = $root;
	}
}