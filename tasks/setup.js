/**
 * Setup gh-pages and bower repos as sibling directories to this one.
 */

'use strict';

module.exports = function (grunt, options) {

  grunt.registerMultiTask('setup', 'Setup gh-pages and bower repos as sibling directories to this one.', function() {
    var path = require('path');
    var done = this.async();


    // Merge task-specific and/or target-specific options with these defaults.
    var defaults = {
      ghpages: {
        name: '',
        append: '-gh-pages',
        prepend: ''
      },
      bower: {
        name: '',
        append: '',
        prepend: 'bower-'
      }
    };
    var options = this.options(defaults);

    options.ghpages.name = !!options.ghpages.name ? options.ghpages.name : defaults.ghpages.name;
    options.ghpages.append = !!options.ghpages.append ? options.ghpages.append : defaults.ghpages.append;
    options.ghpages.prepend = !!options.ghpages.prepend ? options.ghpages.prepend : defaults.ghpages.prepend;
    options.bower.name = !!options.bower.name ? options.bower.name : defaults.bower.name;
    options.bower.append = !!options.bower.append ? options.bower.append : defaults.bower.append;
    options.bower.prepend = !!options.bower.prepend ? options.bower.prepend : defaults.bower.prepend;
    grunt.verbose.writeln('options.ghpages.name: '.magenta + options.ghpages.name);
    grunt.verbose.writeln('options.ghpages.append: '.magenta + options.ghpages.append);
    grunt.verbose.writeln('options.ghpages.prepend: '.magenta + options.ghpages.prepend);
    grunt.verbose.writeln('options.bower.name: '.magenta + options.bower.name);
    grunt.verbose.writeln('options.bower.append: '.magenta + options.bower.append);
    grunt.verbose.writeln('options.bower.prepend: '.magenta + options.bower.prepend);

    var cmds = {
      pwd: 'git',
      gitUrl: ['config', 'remote.origin.url'],
      gitTop: ['rev-parse', '--show-toplevel']
    };
    var mainRepoUrl = '';
    var mainRepoPath = '';
    var bowerRepoUrl = '';
    var bowerRepoPath = '';
    var ghpagesRepoPath = '';
    var taskCounter = 0;
    var tasks = [
      checkBowerRepo,
      checkGhpagesRepo
    ];
    var cp1;
    var cp2;
    var cp3;
    var cp4;

    grunt.util.spawn({
      cmd: 'git',
      args: cmds.gitUrl
    }, function (error, result, code){
      if (error) {
        grunt.warn(error);
      } else {
        mainRepoUrl = String(result);
        bowerRepoUrl = mainRepoUrl.toString().replace(options.bower.name, options.bower.prepend + options.bower.name + options.bower.append);
        grunt.verbose.writeln('mainRepoUrl: '.magenta + mainRepoUrl);
        grunt.verbose.writeln('bowerRepoUrl: '.magenta + bowerRepoUrl);
        grunt.util.spawn({
          cmd: 'git',
          args: cmds.gitTop
        }, function (error, result, code) {
          if (error) {
            grunt.warn(error);
          } else {
            mainRepoPath = String(result);
            bowerRepoPath = path.join(mainRepoPath, '../', options.bower.prepend + options.bower.name + options.bower.append);
            ghpagesRepoPath = path.join(mainRepoPath, '../', options.ghpages.prepend + options.ghpages.name + options.ghpages.append);
            grunt.verbose.writeln('mainRepoPath: '.magenta + mainRepoPath);
            grunt.verbose.writeln('bowerRepoPath: '.magenta + bowerRepoPath);
            grunt.verbose.writeln('ghpagesRepoPath: '.magenta + ghpagesRepoPath);
            nextTask();
          }
        });
      }
    });

    function nextTask() {
      if (taskCounter >= tasks.length) {
        done();
      } else {
        tasks[taskCounter++]();
      }
    }

    function checkBowerRepo() {
      grunt.log.write('Checking if you have a bower repo: '.cyan);
      var isrepo = false;
      if (grunt.file.isDir(path.join(bowerRepoPath, '.git'))) {
        isrepo = true;
      }
      if (isrepo) {
        grunt.log.writeln('Ok'.green);
        nextTask();
      } else {
        grunt.log.writeln('No'.yellow);
        grunt.log.writeln('Cloning repo repo:'.cyan);
        grunt.log.writeln('  src:  '.cyan + String(bowerRepoUrl));
        grunt.log.writeln('  dest: '.cyan + String(bowerRepoPath));
        grunt.util.spawn({
          cmd: 'git',
          args: ['clone', bowerRepoUrl, bowerRepoPath]
        }, function (error, result, code) {
          if (error) {
            grunt.warn(error);
          } else {
            grunt.log.writeln('Bower repo created!'.green);
            nextTask();
          }
        });
      }
    }

    function checkGhpagesRepo() {
      grunt.log.write('Checking if you have a gh-pages repo: '.cyan);
      var isrepo = false;
      if (grunt.file.isDir(path.join(ghpagesRepoPath, '.git'))) {
        isrepo = true;
      }
      if (isrepo) {
        grunt.log.writeln('Ok'.green);
        nextTask();
      } else {
        grunt.log.writeln('No'.yellow);
        grunt.log.writeln('Cloning gh-pages repo:'.cyan);
        grunt.log.writeln('  src:  '.cyan + String(mainRepoUrl));
        grunt.log.writeln('  dest: '.cyan + String(ghpagesRepoPath));
        grunt.util.spawn({
          cmd: 'git',
          args: ['clone', '-b', 'gh-pages', mainRepoUrl, ghpagesRepoPath]
        }, function (error, result, code) {
          if (error) {
            grunt.warn(error);
          } else {
            grunt.log.writeln('gh-pages repo created!'.green);
            nextTask();
          }
        });
      }
    }
  });
};


