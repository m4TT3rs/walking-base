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
4. type `grunt install`

### For existing projects
1. open terminal (on mac) or cmd (on windows)
2. cd into your project folder
3. type one of the following commands
  - `grunt` - compiles less/css ONE time
  - `grunt watch` - watches for file changes an compiles less/css when changes are detected


## Theme folder structure

### The theme/base folder
| folder                        |Edit | Drupal |desc|
| ----------------------------- |:---:|:---:|:-------------  |
|  /dist/lib/**lib-name**         | :no_entry:*  | :white_check_mark: |  *contains all third party code* |
|  /dist/**css**                | :no_entry:  | :white_check_mark: |  *compiled less files* |
|  /dist/**js**                 | :no_entry:  | :white_check_mark: |  *concatenated & minified js* |
|  /dist/**fonts**              | :no_entry:  | :white_check_mark: |  *font files (from icons for example)* |
|  /dist/**img**                | :no_entry:  | :white_check_mark: |  *compressed images* |
|  /src/**less**                | :white_check_mark: | :white_check_mark: |  *compiled and concatinated to dist/js* |
|  /src/**js**                  | :white_check_mark: | :white_check_mark: |  *compiled and concatinated to dist/js* |
|  /src/**img**                 | :white_check_mark: | :white_check_mark: |  *images, will be minimized to the dist/img folder* |
|  /src/**icons**               | :white_check_mark: | :white_check_mark: |  *icons will be auto compiled to a font file (.svg files)* |
|  /**templates**               | :white_check_mark: | :white_check_mark: |  *Drupal template files are copied here* |
|  /files/**documents**         | :white_check_mark: | :no_entry:  |  *pdf,word,xls etc* |
|  /files/**downloads**         | :white_check_mark: | :no_entry:  |  *zip,exe, etc* |
|  /files/**media**             | :white_check_mark: | :no_entry:  |  *all video/audio type files* |
|  /**node_modules**            | :no_entry:  | :white_check_mark: |  *Contains required files for compiling*  |
|  /**bower_components**        | :no_entry:  | :white_check_mark: |  *Contains bower dependencies*  |

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
