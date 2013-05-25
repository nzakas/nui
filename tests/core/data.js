(function(){

    var Assert = YUITest.Assert;

    YUITest.TestRunner.add(new YUITest.TestCase({
    
        name: "NUI Data Parsing Tests",
        
        "String with only one key-value pair should parse ok": function(){
            var result = nui.data.parse("foo:bar");
            Assert.areEqual("bar", result.foo);
        },
        
        "String with multiple key-value pairs should parse ok": function(){
            var result = nui.data.parse("foo:bar; name: value");
            Assert.areEqual("bar", result.foo);
            Assert.areEqual("value", result.name);
        },
        
        "String with multiple key-value pairs and no white space should parse ok": function(){
            var result = nui.data.parse("foo:bar;name:value");
            Assert.areEqual("bar", result.foo);
            Assert.areEqual("value", result.name);
        }        
    
    
    }));

})();