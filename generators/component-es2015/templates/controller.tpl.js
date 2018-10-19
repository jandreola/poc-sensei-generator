import State from './state';
import Props from './props';

export default function controller(props = {}) {
	if (!(props instanceof Props)) {
		props = new Props(props);
	}

	if (!props.validate()) {
		throw new Error('props are not valid');
	}

	const state = new State(props);

	const ctrl = {
		state,
		init
	}

	function init() {

	}

	init();

	return Object.freeze(ctrl);
}
