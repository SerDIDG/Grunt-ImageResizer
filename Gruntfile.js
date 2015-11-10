module.exports = function(grunt) {
    var config = {
        'ios' : {
            'src' : 'src/logo.png',
            'sizes' : [1024, 180, 120, 80, 60, 167, 152, 76]
        },
        'android' : {
            'src' : 'src/logo.png',
            'sizes' : [512, 192, 144, 96, 72, 48]
        }
    };
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);
    // Display how match time it took to build each task
    require('time-grunt')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        clean : {
            options : {
                force : true
            },
            build : [
                'build'
            ]
        }
    });
    // Custom function
    var imageResizeConfig = function(){
        var myConfig = {},
            item,
            buildSrc,
            files;
        for(var osName in config){
            if(config.hasOwnProperty(osName)){
                item = config[osName];
                item['sizes'].forEach(function(size){
                    buildSrc = ['build', osName, size + '.png'].join('/');
                    files = {};
                    files[buildSrc] = item['src'];

                    myConfig[[osName, size].join('_')] = {
                        options : {
                            width : size,
                            height : size,
                            overwrite : false
                        },
                        files : files
                    };
                });
            }
        }
        grunt.config('image_resize', myConfig);
    };
    // Tasks
    grunt.registerTask('configure', 'Create image resize config', imageResizeConfig);
    grunt.registerTask('default', ['clean', 'configure', 'image_resize']);
};