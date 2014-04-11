# grunt-setup-dist-repos

> Setup gh-pages and bower repos as sibling directories to the repo we are in

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-setup-dist-repos --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-setup-dist-repos');
```

### Overview
In your project's Gruntfile, add a section named `setup` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  setup: {
    options: {
      // Task-specific options go here.
    }
  },
});
```

### Options

#### options.ghpages.name
Type: `String`
Default value: ``

A string value that is used to define the folder name of the current repo.

#### options.ghpages.append
Type: `String`
Default value: `-gh-pages`

A string value that is used to append to the folder name of the gh-pages repo.

#### options.ghpages.prepend
Type: `String`
Default value: ``

A string value that is used to preappend to the folder name of the gh-pages repo.

#### options.bower.name
Type: `String`
Default value: ``

A string value that is used to define the folder name of the current repo.

#### options.bower.append
Type: `String`
Default value: ``

A string value that is used to append to the folder name of the bower repo.

#### options.bower.prepend
Type: `String`
Default value: `bower-`

A string value that is used to preappend to the folder name of the bower repo.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. 

```js
grunt.initConfig({
  setup: {
    ghpages: {
      name: 'foo',
      append: '-gh-pages',
      prepend: ''
    },
    bower: {
      name: 'foo',
      append: '',
      prepend: 'bower-'
    }
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. 

```js
grunt.initConfig({
  setup: {
    ghpages: {
      name: 'bar',
      append: '',
      prepend: 'gh-pages-'
    },
    bower: {
      name: 'bar',
      append: '-bower',
      prepend: ''
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
