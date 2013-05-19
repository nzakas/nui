/*global nui*/

/**
 * Main NUI object.
 * @class aria
 * @static
 * @namespace nui
 */
nui.aria = {
    setRole: function(element, role) {
        element.setAttribute("role", role);
    },

    focusable: function(node, focusable) {
        node.tabIndex = focusable ? 0 : -1;
    },

    clearState: function(element, state) {
        return element.removeAttribute("aria-" + state);
    },

    hasState: function(element, state) {
        return element.hasAttribute("aria-" + state);
    },

    setState: function(element, state) {
        return element.setAttribute("aria-" + state, true);
    },

    hide: function(element) {
        this.setState(element, "hidden");
    },

    show: function(element) {
        this.clearState(element, "hidden");
    }
};
