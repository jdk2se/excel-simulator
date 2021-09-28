export function createStore(reducer, initialState = {}) {
	let state     = reducer({...initialState}, {type: '__INIT__'});
	let listeners = [];

	return {
		subscribe(callback) {
			listeners.push(callback);

			return {
				unsubscribe() {
					listeners = listeners.filter(l => l != callback);
				}
			};
		},
		dispatch(action) {
			state = reducer(state, action);
			listeners.forEach((listener) => listener(state));
		},
		getState() {
			return state;
		},
	}
}
