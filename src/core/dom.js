/**
 * Main NUI object.
 * @class dom
 * @static
 * @namespace nui
 */
nui.dom = {
    addClass: function(nodes, className){ 
        nodes = (nodes.length ? nodes : [nodes]);
        for (var i=0, len=nodes.length; i < len; i++){
            if (!this.hasClass(nodes[i], className)){
                nodes[i].className += " " + className;
            }
        }
    },
    
    ancestor: function(node, condition){
        var parentNode = node,
            found = false;
        
        while(parentNode && parentNode.nodeType == 1 && parentNode != document.body){
            if (condition(parentNode)){
                return parentNode;
            }
            parentNode = parentNode.parentNode;
        }
        
        return null;               
    },

    ancestorByClass: function(node, className){
        return this.ancestor(node, function(node){
            return nui.css.hasClass(node, className);
        });          
    },
    
    ancestorByAttribute: function(node, attribute){
        return this.ancestor(node, function(node){
            return node.getAttribute(attribute) != null;
        });           
    }, 
    
    hasClass: function(node, className){
        return (" " + node.className.split(/\s+/g).join(" ") + " ").indexOf(" " + className + " ") > -1;
    },
    
    removeClass: function(nodes, className){
        nodes = (nodes.length ? nodes : [nodes]);
        var classes,
            i = 0, j = 0, len = nodes.length, num;
            
        for (i=0; i < len; i++){
            classes = nodes[i].className.split(/\s+/g);
            for (j=0, num=classes.length; j < num; j++){
                if (classes[j] == className){
                    classes.splice(j, 1);
                    break;
                }
            }
            
            nodes[i].className = classes.join(" ");
        }    
    },
    
    select: function(selector, node){
        return (node||document).querySelector(selector);
    },
    
    selectAll: function(selector, node){
        var nodes = (node||document).querySelectorAll(selector);
        
        try {
            return Array.prototype.slice.call(nodes, 0);
        } catch (ex) {
            var temp = [];
            for (var i=0, len=nodes.length; i < len; i++){
                temp.push(nodes[i]);
            }
            return temp;
        }
    }       
}; 