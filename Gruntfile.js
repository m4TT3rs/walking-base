module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %>\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' */\n',

    clean: {
      dist: ['dist/css','dist/js','dist/img','dist/icons','dist/fonts'],
      iconsAfter:['temp-svg']
    },

    bower: {
      install: {
        options: {
          targetDir: './dist/lib',
          layout: 'byComponent',
          install: true,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: false,
          bowerOptions: {}
        }
      }
    },

    copy:{
        bootstrapFonts:{
          expand:true,
          flatten:true,
          cwd: './dist/lib/bootstrap/fonts/',
          src: '**',
          dest: './dist/fonts/',
          filter: 'isFile'
        }
    },

    jshint: {
      options: {
        jshintrc: 'src/js/.jshintrc'
      },
      src: {
        src: 'src/js/*.js'
      }
    },

    concat_sourcemap: {
      options: {
        sourcesContent: true
      },
      mypackage: {
        src: ['src/js/*.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        report: 'min'
      },
      mypackage: {
        options: {
          banner: '<%= banner %>',
          compress: {
            drop_console: true
          }
        },
        src: '<%= concat_sourcemap.mypackage.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },


    less: {
      compileCore: {
        options: {
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        files: {
          'dist/css/<%= pkg.name %>.css': 'src/less/<%= pkg.name %>.less'
        }
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          'dist/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.css'
        }
      }
    },

    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [
            'dist/css/<%= pkg.name %>.css',
            'dist/css/<%= pkg.name %>.min.css'
          ]
        }
      }
    },

    imagemin: {                          // Task
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/img/',               // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'dist/img/'              // Destination path prefix
        }]
      }
    },

    svgmin: { //minimize SVG files
        options: {
            plugins: [
                { removeXMLProcInst:false },
                { removeViewBox: false },
                { removeUselessStrokeAndFill: false }
            ]
        },
        dist: {
            expand: true,
            cwd: 'src/icons',
            src: ['*.svg'],
            dest: 'temp-svg/compressed'
        }
    },

    grunticon: { //makes SVG icons into a CSS file
        myIcons: {
            files: [{
                expand: true,
                cwd: 'temp-svg/compressed',
                src: ['*.svg'],
                dest: 'dist/icons/'
            }],
            options: {
                cssprefix: '.icon-',
                pngfolder: "png/",
                cssbasepath: "/dist/icons/",
                colors: {
                    primary:  '#428bca',
                    success:  '#5cb85c',
                    info:     '#5bc0de',
                    warning:  '#f0ad4e',
                    danger:   '#d9534f',
                    black:    '#000000',
                    white:    '#ffffff',
                    gray:     '#555555'

                }
            }
        }
    },

    watch: {
      less: {
        options: {
          livereload: true
        },
        files: 'src/less/*.less',
        tasks: 'dist-css'
      },
      js: {
        options: {
          livereload: true
        },
        files: 'src/js/*.js',
        tasks: 'dist-js'
      },
      html:{
        options: {
          livereload: true
        },
        files: 'templates/*'
      }
    },



    connect: {
      server: {
        options: {
          port: 9001,
          hostname: 'localhost',
          livereload:true,
          open: 'http://localhost:9001/templates/',
          base: ''
        }
      }
    }


  });

  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('install', ['clean','bower:install','copy:bootstrapFonts','dist']);

  grunt.registerTask('serve', ['connect','watch']);

  // JS distribution task.
  grunt.registerTask('dist-js', ['jshint','concat_sourcemap','uglify']);

  // CSS distribution task.
  grunt.registerTask('less-compile', ['less:compileCore']);
  grunt.registerTask('dist-css', ['less-compile', 'less:minify', 'usebanner']);

  // Image compression task.
  grunt.registerTask('dist-img', ['newer:imagemin']);
  grunt.registerTask('dist-svg', ['svgmin','grunticon','clean:iconsAfter']);

  // Full distribution task.
  grunt.registerTask('dist', ['dist-css', 'dist-js','dist-img']);

  // Set default task
  grunt.registerTask('default', ['dist']);
};
