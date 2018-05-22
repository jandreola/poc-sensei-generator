import { mix } from 'mixwith'
import Base from '~/models/base'
import { REQUIRED_FIELDS } from '~/models/symbols'
import RequiredFieldsMixin from '~/models/mixins/required-fields'

const DEFAULTS = {
	// Add defaults here
}

// This options model uses a mixin that validates required fields
export default class extends mix(Base).with(RequiredFieldsMixin) {
	constructor(options = {}) {
		super(options)

		options = {...DEFAULTS, ...options}

		// Add properties here
	}

	validate() {
		let { isValid, errors } = super.validate() // validate from RequiredFieldsMixin

		// Perform custom validation here

		if (!isValid) {
			Notify.error(errors.join(', '))
		}

		return isValid
	}

	// RequiredFieldsMixin requires this field
	static get [REQUIRED_FIELDS]() {
		return [/* Add required fields here*/]
	}

	// Base requires this field
	static is() {
		return '<%= componentName %>Options'
	}
}
