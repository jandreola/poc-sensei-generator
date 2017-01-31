/**
 * @name   {<%= modelName %> Model}
 * @author <%= Author %>
 * @return {function}
 */
<%
	function getBlankFor(value) {
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
%>
(function (global) {
	'use strict';
	global.model = global.model || {};

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

		<% Object.keys(modelSample).forEach(function(prop) { %>
			this.<%= prop %> = m.prop(data.<%= prop %> || <%- getBlankFor(modelSample[prop]) %>)
		<% }); %>
	};

}(window));
