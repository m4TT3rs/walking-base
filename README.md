## theme folder structure

### The theme/base folder
| folder                        |Edit | Drupal |desc|
| ----------------------------- |:---:|:---:|:-------------  |
|  /vendor/**lib-name**         | :no_entry:*  | :white_check_mark: |  *contains all third party code* |
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

## TODO

### general
- gitignore
  - node_modules,bower_components


### grunt
- basic setup
- bower integration (use grunt-bower to copy specific filetypes only to vendor folder...)
- setup bake (http://www.rorsvort.com/blog/2014/04/11/simple-static-html-partials-includes-with-yeoman-and-gruntjs.html)
- icons
  - http://blog.toggl.com/2014/04/svg-icon-build-system-using-grunt-grunticon/
  -

### security
- .htaccess/web.config for src folder (to deny access it if it is uploaded to live)
- .htaccess/web.config for files folder (to prevent script execution)
- .htaccess/web.config for gruntfile & other config files (to prevent script execution)
