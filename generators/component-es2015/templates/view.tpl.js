import '../styles.scss'

export default function view({state, ...ctrl}) {
	if (state.loading) {
		return loading()
	}

	return m('.<%= componentName %>-component', [
	])
}

function loading() {
	return Util.loading()
}
