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
  - **Windows**: You must run this as administrator /!\
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
| folder                               |Edit                 |desc            |
| ------------------------------------ |:-------------------:|:-------------  |
|  /public/dist/lib/**lib-name**       | :no_entry:          |  *contains all third party code (includes bower output)* |
|  /public/dist/**css**                | :no_entry:          |  *compiled less files* |
|  /public/dist/**js**                 | :no_entry:          |  *concatenated & minified js* |
|  /public/dist/**fonts**              | :no_entry:          |  *font files (from icons for example)* |
|  /public/dist/**img**                | :no_entry:          |  *compressed images* |
|  /public/**templates**               | :white_check_mark:  |  *PHP/CFM/... template files are copied here* |
|  /public/                            | :white_check_mark:  |  *Static html pages can be placed here (public folder = webroot)* |
|  /public/files/**documents**         | :white_check_mark:  |  *pdf,word,xls etc* |
|  /public/files/**downloads**         | :white_check_mark:  |  *zip,exe, etc* |
|  /public/files/**media**             | :white_check_mark:  |  *all video/audio type files* |
|  /private/src/**less**               | :white_check_mark:  |  *compiled and concatinated to dist/js* |
|  /private/src/**js**                 | :white_check_mark:  |  *compiled and concatinated to dist/js* |
|  /private/src/**img**                | :white_check_mark:  |  *images, will be minimized to the dist/img folder* |
|  /private/src/fonts/**icons**        | :white_check_mark:  |  *icons will be auto compiled to a font file (.svg files)* |
|  /**node_modules**                   | :no_entry:          |  *Contains required files for compiling*  |
|  /**bower_components**               | :no_entry:          |  *Contains bower dependencies*  |
       
*Items can be added here but not edited

## Stuff still to be implemented
### general
- setup bake for static templates (http://www.rorsvort.com/blog/2014/04/11/simple-static-html-partials-includes-with-yeoman-and-gruntjs.html)
