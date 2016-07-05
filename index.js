var rework = require('rework');
var reworkUrl = require('rework-plugin-url');
var through = require('through2');
var path = require('path');

module.exports = function(options) {
  var root = options.root;

  function convertUrls(css, fileDir) {
     return rework(css)
       .use(reworkUrl(function(url) {
          if (/^http:\/\//.test(url) || /^https:\/\//.test(url) || url.indexOf('data:') === 0 || url.indexOf('about:') === 0) {
            return url;
          }
          url = url.replace(/^\s*([^\s]*)\s*$/, "$1");
          var newUrl = url;
          if (/\.\//.test(url) || /\.\.\//.test(url) || !/^\//.test(url)) {//相对路径, ./images, ../images;非绝对路径，eg: 'images/xxx'
            newUrl = path.join(fileDir, url);
          }
          return newUrl.replace(/\\/gim, "/");
       }))
       .toString();
  }


  return through.obj(function(file, enc, cb) {
    var css = file.contents.toString(),
        filePath = file.path;
    if (/\.css$/.test(filePath)) {
      css = convertUrls(css, path.dirname(filePath).replace(root.replace(/(\/|\\)$/, ""), "").replace(/\\/gim, "/"));
    }
    file.contents = new Buffer(css);
    this.push(file);
    cb();
  });
};