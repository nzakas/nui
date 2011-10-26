(function(){

    var SELECTED_CLASS = "selected";


    //addClass
    //hasClass
    //removeClass
    
    //ancestor

    nui.event.on(document, "click", function(event){
        event = event || window.event;
        var target = nui.event.getTarget(event),
            node = nui.dom.ancestorByAttribute(target, "data-nui"),
            tabs, panels, i, len, selIndex,
            info;
            
        if (!node) return;
        
        info = nui.data.parse(node.getAttribute("data-nui"));
        
        switch(info.type){
            case "tabview":
                tabs = nui.dom.selectAll(".nui-tabs li", node);
                panels = nui.dom.selectAll(".nui-panels .nui-panel", node);
            
                if (nui.dom.ancestorByClass(target, "nui-tabs")){
                
                    nui.css.removeClass(tabs.concat(panels), SELECTED_CLASS);
                    nui.css.addClass(target.parentNode, SELECTED_CLASS);
                    nui.css.addClass(nui.dom.select(target.getAttribute("href")), SELECTED_CLASS);
                    
                    nui.event.preventDefault(event);
                }
            

                break;
        }
        
    });    

})();