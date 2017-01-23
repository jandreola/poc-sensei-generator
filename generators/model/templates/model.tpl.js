/**
 * @name   {<%= modelName %> Model}
 * @author <%= Author %>
 * @return {function}
 */
(function (global) {
	'use strict';
	global.model = global.model || {};

	var <%= modelName %>Class = global.model.Base.createClass({
		name: '<%= modelName %>',
		url: '<%= modelUrl %>',
		constructor: <%= modelName %>,
		id: '<%= modelID %>',
		label:, '<%= modelLabel %>'
	})

	function <%= modelName %>(_data) {
		var data = _data || {}

		global.model.Base.call(this, data)

	};

}(window));