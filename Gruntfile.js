module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %>\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' */\n',

    clean: {
      dist: ['<%= pkg.baseDistPath %>dist/css','<%= pkg.baseDistPath %>dist/js','<%= pkg.baseDistPath %>dist/img','<%= pkg.baseDistPath %>dist/fonts']
    },

    bower: {
      install: {
        options: {
          targetDir: '<%= pkg.baseDistPath %>dist/lib',
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
          cwd: '<%= pkg.baseDistPath %>dist/lib/bootstrap/fonts/',
          src: '**',
          dest: '<%= pkg.baseDistPath %>dist/fonts/',
          filter: 'isFile'
        },
        otherFonts:{
          expand:true,
          flatten:true,
          cwd: '<%= pkg.baseSrcPath %>src/fonts/',
          src: ['*'],
          dest: '<%= pkg.baseDistPath %>dist/fonts/',
          filter: 'isFile'
        }
    },

    jshint: {
      options: {
        jshintrc: '<%= pkg.baseSrcPath %>src/js/.jshintrc'
      },
      src: {
        src: '<%= pkg.baseSrcPath %>src/js/*.js'
      }
    },

    concat_sourcemap: {
      options: {
        sourcesContent: true
      },
      mypackage: {
        src: ['<%= pkg.baseSrcPath %>src/js/*.js'],
        dest: '<%= pkg.baseDistPath %>dist/js/scripts.js'
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
        dest: '<%= pkg.baseDistPath %>dist/js/scripts.min.js'
      }
    },


    less: {
      compileCore: {
        options: {
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'theme.css.map',
          sourceMapFilename: '<%= pkg.baseDistPath %>dist/css/theme.css.map'
        },
        files: {
          '<%= pkg.baseDistPath %>dist/css/theme.css': '<%= pkg.baseSrcPath %>src/less/theme.less'
        }
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          '<%= pkg.baseDistPath %>dist/css/theme.min.css': '<%= pkg.baseDistPath %>dist/css/theme.css'
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
            '<%= pkg.baseDistPath %>dist/css/theme.css',
            '<%= pkg.baseDistPath %>dist/css/theme.min.css'
          ]
        }
      }
    },

    imagemin: {                          // Task
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: '<%= pkg.baseSrcPath %>src/img/',               // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: '<%= pkg.baseDistPath %>dist/img/'              // Destination path prefix
        }]
      }
    },

    webfont: {
      icons: {
        src: '<%= pkg.baseSrcPath %>src/fonts/icons/*.svg',
        dest: '<%= pkg.baseDistPath %>dist/fonts/',
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
        files: '<%= pkg.baseSrcPath %>src/less/**/*.less',
        tasks: 'dist-css'
      },
      js: {
        options: {
          livereload: true
        },
        files: '<%= pkg.baseSrcPath %>src/js/*.js',
        tasks: 'dist-js'
      },
      html:{
        options: {
          livereload: true
        },
        files: '<%= pkg.baseDistPath %>/*'
      },
      fonts:{
        options: {
          livereload: true
        },
        files: '<%= pkg.baseSrcPath %>src/fonts/*',
        tasks: 'dist-font'
      },
      img:{
        options: {
          livereload: true
        },
        files: '<%= pkg.baseSrcPath %>src/img/**/*',
        tasks: 'dist-img'
      }
    },



    connect: {
      server: {
        options: {
          port: 9001,
          hostname: 'localhost',
          livereload:true,
          open: 'http://localhost:9001/',
          base: '<%= pkg.baseDistPath %>'
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
