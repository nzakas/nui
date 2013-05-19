module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            all: ["src/core/*.js", "src/components/*/*.js"]
        },
        concat: {
            "build/nui-core.js": [
                "src/core/nui.js",
                "src/core/!(nui).js"
            ],

            "build/nui-components.js": [
                "src/components/*/*.js"
            ]
        }
    });

    grunt.registerTask("default", ["jshint", "concat"]);

};
