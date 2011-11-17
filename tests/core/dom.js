(function(){

    var Assert = YUITest.Assert,
        suite   = new YUITest.TestSuite("NUI DOM Tests");

    suite.add(new YUITest.TestCase({
    
        name: "addClass Tests",
        
        groups: [ "core", "dom" ],

        "Adding a class on an element that doesn't have one should work": function(){
            var element = { className: "" };
            nui.dom.addClass(element, "foo");
            Assert.areEqual(" foo", element.className);
        },
        
        "Adding a class on an element that has one already should work": function(){
            var element = { className: "bar" };
            nui.dom.addClass(element, "foo");
            Assert.areEqual("bar foo", element.className);
        },
        
        "Adding a duplicate class on an element should omit the duplicate": function(){
            var element = { className: "bar" };
            nui.dom.addClass(element, "bar");
            Assert.areEqual("bar", element.className);
        },
        
        "Adding a duplicate class on an element with multiple classes should omit the duplicate": function(){
            var element = { className: "bar foo" };
            nui.dom.addClass(element, "bar");
            Assert.areEqual("bar foo", element.className);
        }
    
    }));
    
    suite.add(new YUITest.TestCase({
    
        name: "hassClass Tests",

        groups: [ "core", "dom" ],

        "Detecting a single class should work": function(){
            var element = { className: "foo" };
            Assert.isTrue(nui.dom.hasClass(element, "foo"));
            Assert.isFalse(nui.dom.hasClass(element, "bar"));
        },
        
        "Detecting a class amongst multiple classes should work": function(){
            var element = { className: "bar foo" };
            Assert.isTrue(nui.dom.hasClass(element, "foo"));
            Assert.isTrue(nui.dom.hasClass(element, "bar"));
        }
    
    }));

    suite.add(new YUITest.TestCase({
    
        name: "removeClass Tests",

        groups: [ "core", "dom" ],

        "Removing a class on an element that doesn't have one should work": function(){
            var element = { className: "" };
            nui.dom.removeClass(element, "foo");
            Assert.areEqual("", element.className);
        },
        
        "Removing a class on an element that has one should work": function(){
            var element = { className: "bar" };
            nui.dom.removeClass(element, "bar");
            Assert.areEqual("", element.className);
        },
        
        "Removing one class of multiple should work": function(){
            var element = { className: "bar foo" };
            nui.dom.removeClass(element, "bar");
            Assert.areEqual("foo", element.className);
        }
    
    }));

    YUITest.TestRunner.add(suite);

})();