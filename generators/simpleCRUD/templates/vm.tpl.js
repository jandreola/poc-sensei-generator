class <%= componentName %>VM {
	constructor() {
		this.isLoading = m.prop(true)
		this.Items = m.prop([])
		this.modalCtrl = m.prop(null)
		this.currentItemInModal = m.prop(null)
	}
}

export default <%= componentName %>VM