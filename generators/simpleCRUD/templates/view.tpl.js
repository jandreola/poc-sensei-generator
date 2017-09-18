<%
	function getInputFor(prop, value) {
		var type = typeof value

		switch (type) {
			case 'boolean' : return 'checkbox(item.' + prop + ')'
		}

		return 'input(item.' + prop + ')'
	}
%>import row from '~/helpers/bootstrapLayoutBuilder'
import uiElements from '~/components/uiElements';

const {
	autocompleterInput,
	input,
	textarea,
	section,
	select,
	checkbox
} = uiElements

function view(ctrl) {
	return m('.<%= componentName %>-component', [
		Util.if (ctrl.vm.isLoading(), Util.loading, () => {
			return [
				Util.if (ctrl.vm.modalCtrl(), widget.modal.view.bind(this, ctrl.vm.modalCtrl())),
				row()
					.col(4, m('span.admintool-main-title', '<%= componentName %>'))
					.col(4, searchInput(ctrl))
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
							Util.if (ctrl.vm.Items().length,
								() => ctrl.vm.Items().map(renderRow.bind(this, ctrl)),
								() => m('tr[colspan=999]', m('p.text-center', 'No items to display.'))
							)
						])
					]))
			]
		})
	])
}

function searchInput(ctrl) {
	return m('input.form-control', {
		oninput: m.withAttr('value', ctrl.vm.searchKeyword),
		value: ctrl.vm.searchKeyword(),
		placeholder: 'Quick Search'
	})
}


function renderRow(ctrl, item) {
	if (ctrl.vm.searchKeyword() && !Util.fuzzySearch(item[<%= model %>.label](), ctrl.vm.searchKeyword())) return ''
	return m('tr', [
		m('td.is-link', {
			onclick: ctrl.editItem.bind(this, item)
		}, item[<%= model %>.label]()),
		m('td', m('span.btn.btn-small.btn-danger', {
			onclick: ctrl.removeItem.bind(this, item[<%= model %>.id]())
		}, [
			m('i.fa.fa-remove'),
			' Remove'
		]))
	])
}

export function form(ctrl) {
	const item = ctrl.vm.currentItemInModal()
	return [
		<% Object.keys(modelSample).forEach(function(prop) { %>
		row()
			.col(12, section('<%= prop %>', <%- getInputFor(prop, modelSample[prop]) %>)),<% }); %>
	]
}
export default view
