A simple Node module for recursively listing all files in a directory,
or in any subdirectories synchronously.

It does not list directories themselves.

Because it uses fs.readdir, which calls [readdir](http://linux.die.net/man/3/readdir) under the hood
on OS X and Linux, the order of files inside directories is [not guaranteed](http://stackoverflow.com/questions/8977441/does-readdir-guarantee-an-order).

## Installation

    npm install recursive-readdir-synchronous

## Usage


```javascript
var recursive = require('recursive-readdir-synchronous');
// Files is an array of filename
var files = recursive('some/path');
```

It can also take a list of files to ignore.

```javascript
var recursive = require('recursive-readdir-synchronous');

// ignore files named 'foo.cs' or files that end in '.html'.
// Files is an array of filename
var files = recursive('some/path', ['foo.cs', '*.html']);
```

You can also pass functions which are called to determine whether or not to
ignore a file:

```javascript
var recursive = require('recursive-readdir-synchronous');

function ignoreFunc(file, stats) {
  // `file` is the absolute path to the file, and `stats` is an `fs.Stats`
  // object returned from `fs.lstat()`.
  return stats.isDirectory() && path.basename(file) == "test";
}

// Ignore files named 'foo.cs' and descendants of directories named test
// Files is an array of filename
var files = recursive('some/path', ['foo.cs', ignoreFunc]);
```

The ignore strings support Glob syntax via
[minimatch](https://github.com/isaacs/minimatch).
