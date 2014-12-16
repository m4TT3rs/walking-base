# Base theme/static site setup

## Installation
### Prerequisites

1. install nodejs (http://nodejs.org/)
2. install grunt cli (http://gruntjs.com/getting-started)
  - open terminal (on mac) or cmd (on windows)
  - type `npm install -g grunt-cli`
3. (optional) install bower (http://bower.io/)
  - open terminal (on mac) or cmd (on windows)
  - type `npm install -g bower`

### For each newly installed project on your machine
1. open terminal (on mac) or cmd (on windows)
2. cd into your project folder
3. type `npm install`
  - **Windows**: an issue exits atm so you need to copy the contents of the node_modules_tempfix/ folder into node_modules/.
4. type `grunt install`

### For existing projects
1. open terminal (on mac) or cmd (on windows)
2. cd into your project folder
3. type one of the following commands
  - `grunt` - compiles less/css ONE time
  - `grunt watch` - watches for file changes an compiles less/css when changes are detected
  - `grunt serve` - launches a small webserver and waches for changes to less/css/html


## Theme folder structure

### The theme/base folder
| folder                        |Edit |desc|
| ----------------------------- |:---:|:-------------  |
|  /dist/lib/**lib-name**       | :no_entry:  |  *contains all third party code (includes bower output)* |
|  /dist/**css**                | :no_entry:  |  *compiled less files* |
|  /dist/**js**                 | :no_entry:  |  *concatenated & minified js* |
|  /dist/**fonts**              | :no_entry:  |  *font files (from icons for example)* |
|  /dist/**img**                | :no_entry:  |  *compressed images* |
|  /src/**less**                | :white_check_mark:  |  *compiled and concatinated to dist/js* |
|  /src/**js**                  | :white_check_mark:  |  *compiled and concatinated to dist/js* |
|  /src/**img**                 | :white_check_mark:  |  *images, will be minimized to the dist/img folder* |
|  /src/fonts/**icons**         | :white_check_mark:  |  *icons will be auto compiled to a font file (.svg files)* |
|  /**templates**               | :white_check_mark:  |  *PHP/HTML/... template files are copied here* |
|  /files/**documents**         | :white_check_mark:  |  *pdf,word,xls etc* |
|  /files/**downloads**         | :white_check_mark:  |  *zip,exe, etc* |
|  /files/**media**             | :white_check_mark:  |  *all video/audio type files* |
|  /**node_modules**            | :no_entry:  |  *Contains required files for compiling*  |
|  /**bower_components**        | :no_entry:  |  *Contains bower dependencies*  |

*Items can be added here but not edited

## Stuff still to be implemented
### general
- setup bake for static templates (http://www.rorsvort.com/blog/2014/04/11/simple-static-html-partials-includes-with-yeoman-and-gruntjs.html)
- icons (tbd to use icon font or svg background img)
  - http://blog.toggl.com/2014/04/svg-icon-build-system-using-grunt-grunticon/

### security
- .htaccess/web.config for src folder (to deny access it if it is uploaded to live)
- .htaccess/web.config for files folder (to prevent script execution)
- .htaccess/web.config for gruntfile & other config files (to prevent script execution)
