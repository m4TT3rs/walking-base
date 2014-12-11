module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %>\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' */\n',

    clean: {
      dist: ['dist/css','dist/js','dist/img']
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

    watch: {
      less: {
        files: 'src/less/*.less',
        tasks: 'dist-css'
      },
      js: {
        files: 'src/js/*.js',
        tasks: 'dist-js'
      }
    }


  });

  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('install', ['clean','bower:install','dist']);

  // JS distribution task.
  grunt.registerTask('dist-js', ['jshint','concat_sourcemap','uglify']);

  // CSS distribution task.
  grunt.registerTask('less-compile', ['less:compileCore']);
  grunt.registerTask('dist-css', ['less-compile', 'less:minify', 'usebanner']);

  // Image compression task.
  grunt.registerTask('dist-img', ['newer:imagemin']);

  // Full distribution task.
  grunt.registerTask('dist', ['dist-css', 'dist-js','dist-img']);

  // Set default task
  grunt.registerTask('default', ['dist']);
};
