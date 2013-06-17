/*global nui*/
nui.add("tabview", function(nui) {

    var dom     = nui.dom,
        css     = nui.css,
        util    = nui.util,
        aria    = nui.aria,

        // Constants
        TABS_CLASS      = "nui-tabs",
        PANELS_CLASS    = "nui-tabpanels",
        SELECTED_CLASS  = "nui-selected",

        TABS_QUERY      = util.format(".%s", TABS_CLASS),
        PANELS_QUERY    = util.format(".%s", PANELS_CLASS),

        INDEX_ATTRIBUTE = "data-nui-index",
        SELECTED_INDEX_ATTRIBUTE = "data-nui-selected-index";

    //--------------------------------------------------------------------------
    // Helper Functions
    //--------------------------------------------------------------------------

    function getSelectedIndex(element) {
        return parseInt(element.getAttribute(SELECTED_INDEX_ATTRIBUTE), 10);
    }

    function setSelectedIndex(element, index) {
        return element.setAttribute(SELECTED_INDEX_ATTRIBUTE, index);
    }

    function getTabsAndPanels(element) {
        var tabsContainer   = dom.select(TABS_QUERY, element),
            panelsContainer = dom.select(PANELS_QUERY, element);

        return {
            tabs: tabsContainer ? util.toArray(tabsContainer.children) : null,
            panels: panelsContainer ? util.toArray(panelsContainer.children) : null
        };
    }


    function changeTab(element, index) {
        var data    = getTabsAndPanels(element),
            tabs    = data.tabs,
            panels  = data.panels,

            selectedIndex = getSelectedIndex(element),

            nextTab     = tabs[index],
            nextTabLink = nextTab.querySelector("a"),
            nextPanel   = panels[index],

            prevTabLink;

        if (!isNaN(selectedIndex)) {

            // make sure the tab and panel are no longer selected or focusable
            prevTabLink = tabs[selectedIndex].querySelector("a");
            dom.removeClass([ tabs[selectedIndex], panels[selectedIndex] ], SELECTED_CLASS);
            aria.focusable(prevTabLink, false);
            aria.focusable(panels[selectedIndex], false);
            aria.hide(panels[selectedIndex]);


        }

        // set the newly select tab and panel to be selected and focusable
        dom.addClass([ nextTab, nextPanel ], SELECTED_CLASS);
        aria.focusable(nextTabLink, true);
        aria.focusable(panels[index], true);
        aria.show(panels[index]);
        nextTabLink.focus();

        setSelectedIndex(element, index);
    }

    //--------------------------------------------------------------------------
    // Public Interface
    //--------------------------------------------------------------------------

    return {

        //----------------------------------------------------------------------
        // Events this component needs
        //----------------------------------------------------------------------

        events: [
            "click",
            "keydown"
        ],

        //----------------------------------------------------------------------
        // Actions published by this component
        //----------------------------------------------------------------------

        actions: {
            "next": "nextTab",
            "prev": "previousTab"
        },

        //----------------------------------------------------------------------
        // Initialization
        //----------------------------------------------------------------------

        initAction: function(element) {
            // noop
        },

        initType: function(element) {

            // gather information from the DOM
            var data    = getTabsAndPanels(element),
                tabs    = data.tabs,
                panels  = data.panels,

                selectedIndex = -1;

            // set ARIA role for tablist
            aria.setRole(tabs[0].parentNode, "tablist");

            // fix up the ARIA information
            util.forEach(tabs, function(item, i) {

                var link    = item.querySelector("a"),
                    panel   = panels[i],
                    id      = link.id || (link.id = nui.guid()),    // NOTE: assignment

                    selected = dom.hasClass(item, SELECTED_CLASS);

                // if this is the selected tab, save the index
                if (selected) {
                    selectedIndex = i;
                }

                // set index of the tab - useful for tab changes
                item.setAttribute(INDEX_ATTRIBUTE, i);

                // for ARIA - link is the tab, container is presentational
                aria.setRole(link, "tab");
                aria.setRole(item, "presentation");

                // remove the href - confuses some screen readers
                link.removeAttribute("href");

                // make sure the panel is labelled by the tab
                aria.setRole(panel, "tabpanel");
                panel.setAttribute("aria-labelledby", id);

            });

            // initialize the state to be the first tab
            changeTab(element, selectedIndex);
        },

        //----------------------------------------------------------------------
        // Other Methods
        //----------------------------------------------------------------------

        /**
         * Change to the next tab in the tabview. If the last tab is selected,
         * then do nothing.
         * @param {HTMLElement} element The element representing the tabview.
         * @returns {void}
         */
        nextTab: function(element) {
            var data = getTabsAndPanels(element),
                selectedIndex = getSelectedIndex(element);

            if (selectedIndex < data.tabs.length - 1) {
                changeTab(element, selectedIndex + 1);
            }

        },

        /**
         * Change to the previous tab in the tabview. If the first tab is selected,
         * then do nothing.
         * @param {HTMLElement} element The element representing the tabview.
         * @returns {void}
         */
        previousTab: function(element) {
            var selectedIndex = getSelectedIndex(element);

            if (selectedIndex > 0) {
                changeTab(element, selectedIndex - 1);
            }
        },

        //----------------------------------------------------------------------
        // Event Handlers
        //----------------------------------------------------------------------

        /**
         * Handle a click on the tabview.
         * @param {Event} event DOM event object.
         * @param {HTMLElement} element The element representing the tabview.
         * @returns {void}
         */
        onclick: function(event, element) {
            var target  = nui.event.getTarget(event),
                tabElement;

            // check to see if the click was inside of a tab
            if (dom.ancestorByClass(target, TABS_CLASS)) {

                nui.event.preventDefault(event);

                tabElement = dom.ancestorByAttribute(target, INDEX_ATTRIBUTE);

                if (tabElement) {
                    changeTab(element, tabElement.getAttribute(INDEX_ATTRIBUTE));
                }

            }
        },

        /**
         * Handle a key press on the tabview.
         * @param {Event} event DOM event object.
         * @param {HTMLElement} element The element representing the tabview.
         * @returns {void}
         */
        onkeydown: function(event, element) {

            // check to see if the click was inside of a tab
            if (dom.ancestorByClass(event.target, TABS_CLASS)) {

                switch(event.keyCode) {
                    case 37:
                    case 38:
                        this.previousTab(element);
                        nui.event.preventDefault(event);
                        break;

                    case 39: // right
                    case 40:
                        this.nextTab(element);
                        nui.event.preventDefault(event);
                        break;
                }
            }
        }

    };


});
