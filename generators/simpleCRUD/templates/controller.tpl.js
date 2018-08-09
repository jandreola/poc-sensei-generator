import State from './state';
import Props from './props';
import { form } from './view';
import { ID } from '~/models/symbols';
import <%= model %> from '~/models/<%= modelPath %>';

export default function (props = {}) {
	if (!(props instanceof Props)) {
		props = new Props(props);
	}

	if (!props.validate()) {
		throw new Error('props are not valid');
	}

	const state = new State(props);

	const ctrl = {
		state,
		addItem,
		removeItem,
		editItem,
		init
	}

	function editItem(item) {
		openModal(new <%= model %>(item));
	}

	function addItem() {
		openModal(new <%= model %>);
	}

	function removeItem(id) {
		Util.confirm('Are you sure you want to remove this item?', 'Remove', null, 'danger')
			.then(() => {
				loading();
				<%= model %>.remove(id)
					.then(() => {
						state.Items = state.Items.filter(item => item[<%= model %>[ID]] !== id);
						notLoading();
					}, errorHandler)
			})
	}

	function saveCurrentItem(item) {
		loading();
		item.save()
			.then(updatedItem => {
				let found = false;
				state.Items.forEach(i => {
					if (i[<%= model %>[ID]] === updatedItem[<%= model %>[ID]]) {
						i.constructor(updatedItem);
						found = true;
					}
				})
				if (!found) state.Items.push(updatedItem);
				notLoading();
				state.modalCtrl.close();

				return;
			}, errorHandler)
	}

	function modalClosed() {
		setTimeout(() => state.currentItemInModal = null, 0);
		state.modalCtrl = null;
	}

	function openModal(item) {
		state.currentItemInModal = item;
		state.modalCtrl = new widget.modal.controller(getModalOptions());
		state.modalCtrl.open(form.bind(this, ctrl), state.currentItemInModal);
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
		state.isLoading = true;
		m.redraw();
	}

	function notLoading() {
		state.isLoading = false;
		m.redraw();
	}

	function errorHandler(err) {
		Notify.error(err);
		notLoading();
	}

	function getItems() {
		loading();
		return <%= model %>.query()
			.then(items => state.Items = items, errorHandler)
			.then(notLoading, notLoading)
	}

	function init() {
		getItems()
	}

	init()

	return Object.freeze(ctrl)
}