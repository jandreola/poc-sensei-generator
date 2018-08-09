export default class State {
	constructor(props) {
		this.isLoading = true
		this.Items = []
		this.modalCtrl = null
		this.currentItemInModal = null
		this.searchKeyword = ''
	}
}
