/*
Adopted from the following tutorial:
Mike Cunsolo 2013. Get Up And Running With Grunt.
URL: http://www.smashingmagazine.com/2013/10/29/get-up-running-grunt/
*/

module.exports = function(grunt){
    'use strict';

    //load nunjucks task
    grunt.loadNpmTasks('grunt-nunjucks');

    // load grunt-jslint;
    grunt.loadNpmTasks('grunt-jslint');

    //grunt-contrib-uglify
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //grunt-contrib-concat
    grunt.loadNpmTasks('grunt-contrib-concat');


    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            html: {
                files: ['index.html'],
                tasks: ['htmlhint', 'concat']
            },
            js: {
                files: ['app/app.js', 'app/framework.js', 'app/content.js', 'app/d3.js'],
                tasks: ['jslint', 'uglify']
            },
            css: {
                files: ['css/style.scss'],
                tasks: ['buildcss']
            },
            nunjucks: {
                files: 'views/*',
                tasks: ['nunjucks']
            }
        },
        uglify: {
            build: {
                src: 'app/*.js',
                dest: 'prod/js/app.min.js'
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['js/d3.v3.min.js',
//                    "js/arbor.js",
//                    "js/arbor-tween.js",
//                    "js/arbor-graphics.js",
                    'js/jquery-2.1.1.min.js',
                    'js/jquery-ui.min-custom.js',
                    'js/nunjucks-slim.min.js'],
                dest: 'prod/js/lib.min.js'
            }
        },
        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,					// Force tags to have a closing pair
                    'tagname-lowercase': true,			// Force tags to be lowercase
                    'attr-lowercase': true,				// Force attribute names to be lowercase
                    'attr-value-double-quotes': false,	// Force attributes to have double quotes rather than single
                    'doctype-first': true,				// Force the DOCTYPE declaration to come first in the document
                    'spec-char-escape': true,			// Force special characters to be escaped
                    'id-unique': true,					// Prevent using the same ID multiple times in a document
                    'head-script-disabled': true,		// Prevent script tags in the header for performance reasons
                    'style-disabled': true				// Prevent style tags
                },
                src: ['index.html']
            }
        },
        nunjucks: {
            precompile: {
                baseDir: 'views/',
                src: 'views/*',
                dest: 'prod/views/compiled.js'
            }
        },
        //jslint
        jslint: {
            build: {
                // files to lint
                src: ['app/app.js', 'app/framework.js', 'app/content.js', 'app/d3.js'],
                // lint options
                directives: {
                    //node: true,
                    //devel: true,
                    //sloppy: true,
                    //unparam: true,
                    //nomen: true,
                    //continue: true,
                    //white: false,
                    //latedef: false
                }
            },
        },
        sass: {
            build: {
                src: 'css/style.scss',
                dest: 'css/style.css'
                /*
                files: {
                    'css/style.css': 'css/style.scss'
                }
                */
            }
        },
        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors:    true,
                    consolidateMediaQueries:    true
                },
                src: 'css/style.css',
                dest: 'prod/css/style.css'
            }
        },
        cssmin: {
            build: {
                src: 'prod/css/style.css',
                dest: 'prod/css/style.css'
            }
        }
    });

    grunt.registerTask('default', []);

    grunt.registerTask('buildcss',  ['sass', 'cssc', 'cssmin']);

};