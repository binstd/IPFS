/* eslint-env mocha */
var assert = require('assert')
var p = require('path')
var readdir = require('../index')

function getAbsolutePath(file) {
  return p.join(__dirname, file)
}

function getAbsolutePaths(files) {
  return files.map(getAbsolutePath)
}

describe('readdir', function () {
    it('correctly lists all files in nested directories', function () {
        var expectedFiles = getAbsolutePaths([
            '/testdir/a/a', '/testdir/a/beans',
            '/testdir/b/123', '/testdir/b/b/hurp-durp',
            '/testdir/c.txt', '/testdir/d.txt'
        ])
        
        var list = readdir(p.join(__dirname, 'testdir'));
        assert.deepEqual(list.sort(), expectedFiles.sort())
    });
    
    it('ignores the files listed in the ignores array', function () {
        var notExpectedFiles = getAbsolutePaths([
            '/testdir/d.txt', '/testdir/a/beans'
        ])
        
        var list = readdir(p.join(__dirname, 'testdir'), ['d.txt', 'beans']);
        console.log('list' + list.length);
        list.forEach(function (file) {
            assert.equal(notExpectedFiles.indexOf(file), -1,
          'Failed to ignore file "' + file + '".')
        })
    })
    
    it('ignores the directories listed in the ignores array', function () {
        var notExpectedFiles = getAbsolutePaths([
            '/testdir/a/a', '/testdir/a/beans'
        ])
        
        var list = readdir(p.join(__dirname, 'testdir'), ['**/testdir/a']);
        list.forEach(function (file) {
            assert.equal(notExpectedFiles.indexOf(file), -1,
          'Failed to ignore file "' + file + '".')
        })
    })
    
    it('ignores symlinked files and directories listed in the ignores array', function () {
        var notExpectedFiles = getAbsolutePaths([
            '/testsymlinks/testdir/linkeddir/hi.docx', '/testsymlinks/testdir/linkedfile.wmf'
        ])
        var list = readdir(p.join(__dirname, 'testsymlinks/testdir'), ['linkeddir', 'linkedfile.wmf']);
        list.forEach(function (file) {
            assert.equal(notExpectedFiles.indexOf(file), -1,
                     'Failed to ignore file "' + file + '".')
        })
    })
    
    it('supports ignoring files with just basename globbing', function () {
        var notExpectedFiles = getAbsolutePaths([
            '/testdir/d.txt', '/testdir/a/beans'
        ])
        
        var list = readdir(p.join(__dirname, 'testdir'), ['*.txt', 'beans']);
        list.forEach(function (file) {
            assert.equal(notExpectedFiles.indexOf(file), -1,
          'Failed to ignore file "' + file + '".')
        })
    })
    
    it('supports ignoring files with the globstar syntax', function () {
        var notExpectedFiles = getAbsolutePaths([
            '/testdir/d.txt', '/testdir/a/beans'
        ])
        
        var ignores = ['**/*.txt', '**/a/beans']
        
        var list = readdir(p.join(__dirname, 'testdir'), ignores);
        list.forEach(function (file) {
            assert.equal(notExpectedFiles.indexOf(file), -1,
          'Failed to ignore file "' + file + '".')
        })
    })
    
    context('when there is a function in the ignores array', function () {
        it('passes each file and directory path to the function', function () {
            var expectedPaths = getAbsolutePaths([
                '/testdir/a',
                '/testdir/a/a',
                '/testdir/a/beans',
                '/testdir/b',
                '/testdir/b/123',
                '/testdir/b/b',
                '/testdir/b/b/hurp-durp',
                '/testdir/c.txt',
                '/testdir/d.txt'
            ])
            var paths = []
            function ignoreFunction(path) {
                paths.push(path)
                return false
            }
            var list = readdir(p.join(__dirname, 'testdir'), [ignoreFunction]);
            assert.deepEqual(paths.sort(), expectedPaths.sort())
        })
        
        it('passes the stat object of each file to the function as its second argument', function () {
            var paths = {}
            function ignoreFunction(path, stats) {
                paths[path] = stats
                return false
            }
            var list = readdir(p.join(__dirname, 'testdir'), [ignoreFunction]);
            assert(paths[getAbsolutePath('/testdir/a')].isDirectory())
            assert(paths[getAbsolutePath('/testdir/c.txt')].isFile())
        })
        
        it('ignores files that the function returns true for', function () {
            var ignoredFiles = getAbsolutePaths([
                '/testdir/d.txt',
                '/testdir/a/beans'
            ])
            function ignoreFunction(path) {
                return ignoredFiles.indexOf(path) != -1
            }
            
            var list = readdir(p.join(__dirname, 'testdir'), [ignoreFunction]);
            list.forEach(function (file) {
                assert.equal(ignoredFiles.indexOf(file), -1,
            'Failed to ignore file "' + file + '".')
            })
        })
        
        it('does not ignore files that the function returns false for', function () {
            var notIgnoredFiles = getAbsolutePaths([
                '/testdir/d.txt',
                '/testdir/a/beans'
            ])
            function ignoreFunction(path) {
                return notIgnoredFiles.indexOf(path) == -1
            }
            
            var list = readdir(p.join(__dirname, 'testdir'), [ignoreFunction]);
            notIgnoredFiles.forEach(function (file) {
                assert.notEqual(notIgnoredFiles.indexOf(file), -1,
            'Incorrectly ignored file "' + file + '".')
            })
        })
        
        it('ignores directories that the function returns true for', function () {
            var ignoredDirectory = getAbsolutePath('/testdir/a')
            var ignoredFiles = getAbsolutePaths([
                '/testdir/a/a',
                '/testdir/a/beans'
            ])
            function ignoreFunction(path) {
                return ignoredDirectory == path
            }
            
            var list = readdir(p.join(__dirname, 'testdir'), [ignoreFunction]);
            list.forEach(function (file) {
                assert.equal(ignoredFiles.indexOf(file), -1,
            'Failed to ignore file "' + file + '".')
            })
        })
        
        it('does not ignore directories that the function returns false for', function () {
            var ignoredDirectory = getAbsolutePath('/testdir/a')
            var notIgnoredFiles = getAbsolutePaths([
                '/testdir/b/123',
                '/testdir/b/b/hurp-durp'
            ])
            function ignoreFunction(path) {
                return ignoredDirectory == path
            }
            
            var list = readdir(p.join(__dirname, 'testdir'), [ignoreFunction]);
            notIgnoredFiles.forEach(function (file) {
                assert.notEqual(notIgnoredFiles.indexOf(file), -1,
            'Incorrectly ignored file "' + file + '".')
            })
        })
        
        it('does not descend into directories that the function returns true for', function () {
            var ignoredDirectory = getAbsolutePath('/testdir/a')
            var ignoredFiles = getAbsolutePaths([
                '/testdir/a/a',
                '/testdir/a/beans'
            ])
            var paths = []
            function ignoreFunction(path) {
                paths.push(path)
                return ignoredDirectory == path
            }
            
            var list = readdir(p.join(__dirname, 'testdir'), [ignoreFunction]);
            paths.forEach(function (file) {
                assert.equal(ignoredFiles.indexOf(file), -1,
            'Transversed file in ignored directory "' + file + '".')
            })
        })
    })
    
    it('works when there are no files to report except ignored files', function () {
        var list = readdir(p.join(__dirname, 'testdirBeta'), ['*']);
        assert.equal(list.length, 0, 'expect to report 0 files')
    })
    
    it('works when negated ignore list is given', function () {
        var expectedFiles = getAbsolutePaths([
            '/testdirBeta/ignore.txt'
        ])
        
        var list = readdir(p.join(__dirname, 'testdirBeta'), ['!*.txt'])
        assert.deepEqual(list.sort(), expectedFiles,
                       'Failed to find expected files.')
    })
    
    it('traverses directory and file symbolic links', function () {
        var expectedFiles = getAbsolutePaths([
            '/testsymlinks/testdir/linkeddir/hi.docx',
            '/testsymlinks/testdir/linkedfile.wmf'
        ])
        
        var list = readdir(p.join(__dirname, 'testsymlinks', 'testdir'));
        assert.deepEqual(list.sort(), expectedFiles,
                       'Failed to find expected files.')
    })
})
