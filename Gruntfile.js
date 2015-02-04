module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %>\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' */\n',

    clean: {
      dist: ['<%= pkg.baseThemePath %>dist/css','<%= pkg.baseThemePath %>dist/js','<%= pkg.baseThemePath %>dist/img','<%= pkg.baseThemePath %>dist/fonts']
    },

    bower: {
      install: {
        options: {
          targetDir: '<%= pkg.baseThemePath %>dist/lib',
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
          cwd: '<%= pkg.baseThemePath %>dist/lib/bootstrap/fonts/',
          src: '**',
          dest: '<%= pkg.baseThemePath %>dist/fonts/',
          filter: 'isFile'
        },
        otherFonts:{
          expand:true,
          flatten:true,
          cwd: '<%= pkg.baseThemePath %>src/fonts/',
          src: ['*'],
          dest: '<%= pkg.baseThemePath %>dist/fonts/',
          filter: 'isFile'
        }
    },

    jshint: {
      options: {
        jshintrc: '<%= pkg.baseThemePath %>src/js/.jshintrc'
      },
      src: {
        src: '<%= pkg.baseThemePath %>src/js/*.js'
      }
    },

    concat_sourcemap: {
      options: {
        sourcesContent: true
      },
      mypackage: {
        src: ['<%= pkg.baseThemePath %>src/js/*.js'],
        dest: '<%= pkg.baseThemePath %>dist/js/<%= pkg.name %>.js'
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
        dest: '<%= pkg.baseThemePath %>dist/js/<%= pkg.name %>.min.js'
      }
    },


    less: {
      compileCore: {
        options: {
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: '<%= pkg.baseThemePath %>dist/css/<%= pkg.name %>.css.map'
        },
        files: {
          '<%= pkg.baseThemePath %>dist/css/<%= pkg.name %>.css': '<%= pkg.baseThemePath %>src/less/<%= pkg.name %>.less'
        }
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          '<%= pkg.baseThemePath %>dist/css/<%= pkg.name %>.min.css': '<%= pkg.baseThemePath %>dist/css/<%= pkg.name %>.css'
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
            '<%= pkg.baseThemePath %>dist/css/<%= pkg.name %>.css',
            '<%= pkg.baseThemePath %>dist/css/<%= pkg.name %>.min.css'
          ]
        }
      }
    },

    imagemin: {                          // Task
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: '<%= pkg.baseThemePath %>src/img/',               // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: '<%= pkg.baseThemePath %>dist/img/'              // Destination path prefix
        }]
      }
    },

    webfont: {
      icons: {
        src: '<%= pkg.baseThemePath %>src/fonts/icons/*.svg',
        dest: '<%= pkg.baseThemePath %>dist/fonts/',
        options: {
          types:'eot,woff,ttf,svg',
          engine: 'node'
        }
      }
    },

    watch: {
      less: {
        options: {
          livereload: true
        },
        files: '<%= pkg.baseThemePath %>src/less/**/*.less',
        tasks: 'dist-css'
      },
      js: {
        options: {
          livereload: true
        },
        files: '<%= pkg.baseThemePath %>src/js/*.js',
        tasks: 'dist-js'
      },
      html:{
        options: {
          livereload: true
        },
        files: '<%= pkg.baseThemePath %>templates/*'
      },
      fonts:{
        options: {
          livereload: true
        },
        files: '<%= pkg.baseThemePath %>src/fonts/*',
        tasks: 'dist-font'
      },
      img:{
        options: {
          livereload: true
        },
        files: '<%= pkg.baseThemePath %>src/img/**/*',
        tasks: 'dist-img'
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
  grunt.registerTask('dist-font', ['webfont','copy:otherFonts']);

  // Full distribution task.
  grunt.registerTask('dist', ['dist-css', 'dist-js','dist-img','dist-font']);

  // Set default task
  grunt.registerTask('default', ['dist']);
};
