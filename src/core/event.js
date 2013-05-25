/*global nui*/
/**
 * NUI events interface
 * @class event
 * @static
 * @namespace nui
 */
 /*global nui, document*/
nui.event = (function(){

    var ID_ATTRIBUTE = "data-nui-id";

    var events = {};



    function handleEvent(event) {
        var handlers = events[event.type],
            target = event.target || event.srcElement,
            ancestor = nui.dom.ancestorByAttribute(target, ID_ATTRIBUTE),
            handler;

        if (ancestor) {
            handler = handlers[ancestor.getAttribute(ID_ATTRIBUTE)];

            if (handler) {
                handler.call(nui.event.getTarget(event), event, ancestor);
            }
        }

    }

    return {

        /**
         * Listen for an event on a specific target.
         */
        on: function(target, eventName, handler){

            if (target.addEventListener){
                target.addEventListener(eventName, handler, false);
            } else if (target.attachEvent){
                target.attachEvent("on" + eventName, handler);
            }
        },

        getTarget: function(event){
            return event.target || event.srcElement;
        },

        preventDefault: function(event){
            if (event.preventDefault){
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
    };

}());
