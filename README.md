# gulp-css-url-to-absolute

> 基于根目录来将css文件里的相对路径转换成绝对路径，gulp-concat打包，如果打包到其他目录，那么相对路径可能出错.

## Getting Started

you may like to combo css files with gulp-concat, and css background image write in relative path will point to a wrong path. this task  convert relative path to absolute path based on root directory, you may install this plugin with this command:

```
npm install gulp-css-url-to-absolute --save

```

Once the plugin has been installed, you can go on like that on your gulpfile:

```
var cssUrlToAbsolute = require('gulp-css-url-to-absolute');

    return gulp.src(files)
        .pipe(cssUrlToAbsolute({
            root: './'//input your root path
        }))
```


## Options

### options.root
Type: `String`

Default value: `process.cwd()` (node)

root directory.