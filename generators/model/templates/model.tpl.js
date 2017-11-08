/**
 * @name   {<%= modelName %> Model}
 * @author <%= Author %>
 * @return {function}
 */
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
(function (global) {
	'use strict';

	var <%= modelName %>Class = global.model.Base.createClass({
		name: '<%= modelName %>',
		url: '<%= modelUrl %>',
		constructor: <%= modelName %>,
		id: '<%= modelID %>',
		label: '<%= modelLabel %>'
	})

	function <%= modelName %>(_data) {
		var data = _data || {}

		global.model.Base.call(this, data)
<% Object.keys(modelSample).forEach(function(prop) { if (isObject(modelSample[prop])) {%>
		this.<%= prop %> = <%= `new ${prop}(data.${prop})`%><%} else {%>
		this.<%= prop %> = m.prop(data.<%= prop %> || <%- getBlankFor(modelSample[prop], prop) %>)<% }}); %>
	};
<% Object.keys(modelSample).forEach(function(prop) { if (typeof modelSample[prop] === 'object' && !Array.isArray(modelSample[prop])) {%>

	function <%= prop %>(data) {<% Object.keys(modelSample[prop]).forEach(function(propInner) { %>
		this.<%= propInner %> = m.prop(data.<%= propInner %> || <%- getBlankFor(modelSample[prop][propInner], propInner) %>)<% }); %>
	}<% }}); %>

}(window));
