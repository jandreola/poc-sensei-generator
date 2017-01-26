/**
 * @name   <%= componentName %>
 * @author <%= Author %>
 * @return {function}
 */
(function (global){
    var <%= componentName %> = Util.getObjectFromPath('<%= componentPath %>.<%= componentName %>')
    <%= componentName %>.view = <%= componentName %>View

    function <%= componentName %>View(ctrl) {
        return m('.<%= componentName %>-component', [

        ])
    }
}(window))
