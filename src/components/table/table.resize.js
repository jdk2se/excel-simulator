import {$} from '@core/dom';

export function resizeHandler($root, event) {
	const resizer  = $(event.target);
	const parent   = resizer.closest('[data-type="resizable"]');
	const coords   = parent.getCoords();
	const type     = resizer.data.resize;
	let value      = 0;
	const sideProp = type === 'col' ? 'bottom' : 'right';

	resizer.css({
		opacity:    1,
		[sideProp]: '-2000px',
	});

	document.onmousemove = (e) => {
		if (type === 'col') {
			const delta = Math.floor(e.pageX - coords.right);
			value       = coords.width + delta;
			resizer.css({right: -delta + 'px'});
		}
		else {
			const delta = Math.floor(e.pageY - coords.bottom);
			value       = coords.height + delta;
			resizer.css({bottom: -delta + 'px'});
		}
	}

	document.onmouseup = () => {
		if (type === 'col') {
			$root.findAll(`[data-col="${parent.data.col}"]`).forEach((el) => {
				el.style.width = value + 'px';
			});
		}
		else {
			parent.css({
				height: value + 'px',
			});
		}

		resizer.css({
			opacity: 0,
			bottom:  0,
			right:   0
		})

		document.onmousemove = null;
		document.onmouseup   = null;
	}
}