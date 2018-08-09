<%
	function getBlankFor(value, prop) {
		var type = typeof value
		var blank = null

		switch (type) {
			case 'string' : blank = "''"; break
			case 'number' : blank = 0; break
			case 'boolean' : blank = false; break
			case 'object' : blank = Array.isArray(value) ? '[]' : '{}'; break
		}

		return blank
	}

	function isObject(item) {
		return typeof item === 'object' && !Array.isArray(item)
	}
%>
/**
 * @name   {<%= modelName %> Model}
 * @author <%= Author %>
 * @return {function}
 */
<% if (modelUrl) {%>
import BaseModel from '~/models/base'
import { mix } from 'mixwith'
import ResourceMixin from '~/models/mixins/resource'
import { API_URL, ID } from '~/models/symbols'

const Base = mix(BaseModel).with(ResourceMixin)
<%} else {%>
import Base from '~/models/base'
<%}%>
const DEFAULTS = {
<% Object.keys(modelSample).forEach(function(prop) { if (isObject(modelSample[prop])) {%>
	<%= prop %>: <%= `new ${prop}, // Consider creating a model for this object`%><%} else {%>
	<%= prop %>: <%- getBlankFor(modelSample[prop], prop) %>,<% }}); %>
}

export default class <%= modelName %> extends Base {
	constructor(_data = {}) {
		super(_data)

		let data = {...DEFAULTS, ..._data}

		Object.assign(this, data)
	}

	static get is() {
		return '<%= modelName %>'
	}
<% if (modelUrl) {%>
	static get [API_URL]() {
		return '<%= modelUrl %>'
	}

	static get [ID]() {
		return '<%= modelID %>'
	}

	static get [LABEL]() {
		return '<%= modelLabel %>'
	}<% } %>
}
