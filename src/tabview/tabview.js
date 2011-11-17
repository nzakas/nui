/*global nui, window, document*/
(function(){

    //constants
    var SELECTED_CLASS  = "selected",
        DATA_NUI        = nui.DATA_NUI,
        TABS_CLASS      = "nui-tabs",
        
        //shortcuts
        data    = nui.data,
        dom     = nui.dom,
        evt     = nui.event;
    
    //attach global handler - should probably be done by framework
    nui.event.on(document, "click", function(event){
        event = event || window.event;
        var target = evt.getTarget(event),
            node = dom.ancestorByAttribute(target, DATA_NUI),
            tabs, panels, i, len, selIndex,
            info;
            
        if (!node) {
            return;
        }
        
        info = data.parse(node.getAttribute(DATA_NUI));
        
        if (info.type == "tabview"){
            tabs = dom.selectAll("." + TABS_CLASS + " li", node);
            panels = dom.selectAll(".nui-panels .nui-panel", node);
        
            if (dom.ancestorByClass(target, TABS_CLASS)){            
                dom.removeClass(tabs.concat(panels), SELECTED_CLASS);
                dom.addClass([ target.parentNode, nui.dom.select(target.getAttribute("href")) ], SELECTED_CLASS);                
                evt.preventDefault(event);
            }            
        }
        
    });    

})();