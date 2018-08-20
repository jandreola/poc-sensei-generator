<%
	function getInputFor(prop, value) {
		var type = typeof value

		switch (type) {
			case 'boolean' : return 'checkbox(makeProp(item, \'' + prop + '\'))'
		}

		return 'input(makeProp(item, \'' + prop + '\'))'
	}
%>import row from '~/helpers/bootstrapLayoutBuilder'
import uiElements from '~/components/uiElements';
import { LABEL, ID } from '~/models/symbols';
import <%= model %> from '~/models/<%= modelPath %>';
import { makeProp } from '~/helpers/prop';

const {
	autocompleterInput,
	input,
	textarea,
	section,
	select,
	checkbox
} = uiElements

function view({ state , ...ctrl }) {
	return m('.<%= componentName %>-component', [
		Util.if (state.isLoading, Util.loading, () => {
			return [
				Util.if (state.modalCtrl, widget.modal.view.bind(this, state.modalCtrl)),
				row()
					.col(4, m('span.admintool-main-title', '<%= componentName %>'))
					.col(4, searchInput(state))
					.col(4, '.text-right', m('span.btn.btn-success', {
						onclick: ctrl.addItem
					}, 'Add New <%= componentName %>')),
				row()
					.col(12, m('table.sensei-table.table.table-striped', [
						m('thead', [
							m('tr', [
								m('th', 'Name'),
								m('th', '')
							])
						]),
						m('tbody', [
							Util.if (state.Items.length,
								() => state.Items.map(renderRow.bind(this, ctrl, state)),
								() => m('tr', m('td[colspan=999].text-center', 'No items to display.'))
							)
						])
					]))
			]
		})
	])
}

function searchInput(state) {
	return m('input.form-control', {
		oninput: m.withAttr('value', v => state.searchKeyword = v),
		value: state.searchKeyword,
		placeholder: 'Quick Search'
	})
}


function renderRow(ctrl, state, item) {
	if (state.searchKeyword && !Util.fuzzySearch(item[<%= model %>[LABEL]], state.searchKeyword)) return ''
	return m('tr', [
		m('td.is-link', {
			onclick: ctrl.editItem.bind(this, item)
		}, item[<%= model %>[LABEL]]),
		m('td.text-right', m('span.btn.btn-small.btn-danger', {
			onclick: ctrl.removeItem.bind(this, item[<%= model %>[ID]])
		}, [
			m('i.fa.fa-remove'),
			' Remove'
		]))
	])
}

export function form({ state , ...ctrl }) {
	const item = state.currentItemInModal
	return [
		<% Object.keys(modelSample).forEach(function(prop) { %>
		row()
			.col(12, section('<%= prop %>', <%- getInputFor(prop, modelSample[prop]) %>)),<% }); %>
	]
}
export default view
