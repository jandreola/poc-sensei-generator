/**
 * @name   <%= componentName %>
 * @author <%= Author %>
 * @return {function}
 */
(function (global){
  var <%= componentName %> = Util.getObjectFromPath('<%= componentPath %>.<%= componentName %>')
  <%= componentName %>.controller = <%= componentName %>Ctrl

  function <%= componentName %>Ctrl(options) {
    var ctrl = {
      vm: new <%= componentName %>.vm(options)
    }

    return ctrl
  }
}(window))
