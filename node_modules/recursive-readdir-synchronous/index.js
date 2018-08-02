var fs = require('fs')
var p = require('path')
var minimatch = require('minimatch')

function patternMatcher(pattern) {
  return function(path, stats) {
    var minimatcher = new minimatch.Minimatch(pattern, {matchBase: true})
    return (!minimatcher.negate || stats.isFile()) && minimatcher.match(path)
  }
}

function toMatcherFunction(ignoreEntry) {
  if (typeof ignoreEntry == 'function') {
    return ignoreEntry
  } else {
    return patternMatcher(ignoreEntry)
  }
}

function readdir(path, ignores) {
    ignores = ignores || [];
    ignores = ignores.map(toMatcherFunction);
    
    var list = [];
    
    var files = fs.readdirSync(path);
    
    if (!files.length) {
        return list;
    }
    
    files.forEach(function (file) {
        var filePath = p.join(path, file)
        var stats = fs.statSync(filePath);
        
        if (ignores.some(function (matcher) { return matcher(filePath, stats) })) {
            return;
        }
        
        if (stats.isDirectory()) {
            list = list.concat(readdir(filePath, ignores));
        } else {
            list.push(filePath)
        }
    })
    return list;
}

module.exports = readdir
