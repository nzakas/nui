/*global nui*/
/**
 * NUI data handling.
 * @class data
 * @static
 * @namespace nui
 */
nui.data = {

    /** 
     * Parses a string in the format of "foo:bar; foo:bar"
     * into an object with key-value pairs.
     * @param {String} text
     * @return {Object} An object with key-value pairs.
     * @method parse
     */
    parse: function parseInfo(text){
        var info = {},
            parts = text.split(/\s*;\s*/g),
            i = 0,
            len = parts.length,
            subparts;
            
        while(i < len){
            subparts = parts[i].split(/\s*:\s*/g);
            info[subparts[0]] = subparts[1];
            i++;
        }
        
        return info;
        
    }
      
}; 