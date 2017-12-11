import vm from './vm'
import { form } from './view'

function controller(options) {
	const ctrl = {
		vm: new vm,
		addItem,
		removeItem,
		editItem,
		init
	}

	function editItem(item) {
		openModal(new <%= model %>(item.toJSON()))
	}

	function addItem() {
		openModal(new <%= model %>)
	}

	function removeItem(id) {
		Util.confirm('Are you sure you want to remove this item?', 'Remove', null, 'danger')
			.then(() => {
				loading()
				<%= model %>.remove(id)
					.then(() => {
						ctrl.vm.Items(ctrl.vm.Items().filter(item => item[<%= model %>.id]() !== id))
						notLoading()
					}, errorHandler)
			})
	}

	function saveCurrentItem(item) {
		loading()
		item.save()
			.then(updatedItem => {
				let found = false
				ctrl.vm.Items().forEach(i => {
					if (i[<%= model %>.id]() === updatedItem[0][<%= model %>.id]()) {
						i.constructor(updatedItem[0].toJSON())
						found = true
					}
				})
				if (!found) ctrl.vm.Items().push(updatedItem[0])
				notLoading()
				ctrl.vm.modalCtrl().close()
				return
			}, errorHandler)
	}

	function modalClosed() {
		setTimeout(() => ctrl.vm.currentItemInModal(null), 0)
		ctrl.vm.modalCtrl(null)
	}

	function openModal(item) {
		ctrl.vm.currentItemInModal(item)
		ctrl.vm.modalCtrl(new widget.modal.controller(getModalOptions()))
		ctrl.vm.modalCtrl().open(form.bind(this, ctrl), ctrl.vm.currentItemInModal())
	}

	function getModalOptions() {
		return {
			OnClick: saveCurrentItem,
			Title: 'Item modal',
			OnClose: modalClosed,
			ActionCopy: 'Save',
			ClickToCloseOverlay: false,
			CloseOnAction: false,
		}
	}

	function loading() {
		ctrl.vm.isLoading(true)
		m.redraw()
	}

	function notLoading() {
		ctrl.vm.isLoading(false)
		m.redraw()
	}

	function errorHandler(err) {
		Notify.error(err)
		notLoading()
	}

	function getItems() {
		loading()
		return <%= model %>.query()
			.then(ctrl.vm.Items, errorHandler)
			.then(notLoading, notLoading)
	}

	function init() {
		getItems()
	}

	init()

	return ctrl
}

export default controller
