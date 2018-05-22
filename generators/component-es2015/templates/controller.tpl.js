import State from './state'
import Options from './options'

export default function controller(options = {}) {
	if (!(options instanceof Options)) {
		options = new Options(options)
	}

	if (!options.validate()) {
		throw new Error('options are not valid')
	}

	const state = new State(options)

	const ctrl = {
		state,
		init
	}

	function init() {

	}

	init()

	return ctrl
}
