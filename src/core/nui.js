/**
 * Main NUI object.
 * @class nui
 * @static
 */

/*jshint unused: true*/
var nui = (function(){

    var components = [],
        uid = 0;

    return {

        guid: function() {
            return "nui" + (uid++);
        },

        add: function(type, creator) {
            components[type] = creator(this);
        },

        init: function() {
            var nodes = this.dom.selectAll("[data-nui-type], [data-nui-action]");

            nui.util.forEach(nodes, function(node) {
                var type = node.getAttribute("data-nui-type"),
                    action = node.getAttribute("data-nui-action"),
                    actionParts,
                    component;


                if (type) {

                    component = components[type];

                    if (!component || !component.initType) {
                        throw new Error("Unknown type: " + type);
                    }

                    component.initType(node);

                    // listen for each event the component needs
                    nui.util.forEach(component.events, function(eventName) {
                        nui.event.on(node, eventName, function(event) {
                            component["on" + eventName](event, node);
                        });
                    });

                } else if (action) {
                    // TODO
                    actionParts = action.split("-");
                    components[actionParts[0]].initAction(node, actionParts[1]);
                }
            });

        }

    };

}());
