/**
 * @name   <%= componentName %>
 * @author <%= Author %>
 * @return {function}
 */
(function (global){
  var <%= componentName %> = Util.getObjectFromPath('<%= componentPath %>.<%= componentName %>')
  <%= componentName %>.vm = <%= componentName %>VM

  function <%= componentName %>VM(options) {

  }
}(window))
