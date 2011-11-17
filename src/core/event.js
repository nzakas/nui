/*global nui*/
/**
 * NUI events interface
 * @class event
 * @static
 * @namespace nui
 */
nui.event = {
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