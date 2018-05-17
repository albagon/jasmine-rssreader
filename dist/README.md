# Jasmine-rssreader

Jasmine-rssreader is a set of unit tests writen against a pre-existing RSS Reader using an open source testing framework for JavaScript called [Jasmine](http://jasmine.github.io/). These test the underlying business logic of the application as well as the event handling and DOM manipulation. In addition to this, the project includes a [gulp](https://gulpjs.com/) file packed with tools that will help to speed up the building of future unit tests.


## Install

Jasmine-rssreader only requires [Node.js](https://nodejs.org/) and [Jasmine](https://jasmine.github.io/setup/nodejs.html) to run the tests, but if you want to take advantage of the build tools, make sure to install [Gulp](https://gulpjs.com/) and all the plugins required:

* [gulp-sass](https://www.npmjs.com/package/gulp-sass)
* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
* [browser-sync](https://browsersync.io/)
* [gulp-eslint](https://www.npmjs.com/package/gulp-eslint)
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
* [gulp-babel](https://www.npmjs.com/package/gulp-babel)
* [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)


Clone the GitHub repository.

```
$ git clone https://github.com/albagon/jasmine-rssreader.git
```

## Run unit tests

Open `/dist/index.html` in your browser to start the RSS Reader and run the tests. The test results will be at the bottom of the page, after the last RSS feed.

## Write new unit tests
Raw code files before minification or concatenation are stored in the `src` directory while files ready for production are located in the `dist` directory. Any new unit tests should be written in `src/jasmine/spec/feedreader.js` file.

Before you start coding awesome new unit tests, go to your terminal and start the build tools.

```
$ gulp
```

This will launch the app and unit tests in your browser. But before that, the tool will copy files from the `src` directory to the `dist` directory and `watch` them so there's always an up-to-date version of them in the `dist` directory. The tool will also syncronize them with your browser. Making it very easy to see the changes you make in the unit tests.

Build tools are defined in `gulpfile.js` file.

Once you are happy with the results, stop the `watch` of files with `ctrl+C` in your terminal and get your files ready for distribution by running:

```
$ gulp dist
```

## Current unit tests

1. This test ensures that `allFeeds` is defined.
2. This test loops through each feed in the `allFeeds` object and ensures that it has a URL defined and that the URL is not empty.
3. This test loops through each feed in the `allFeeds` object and ensures that it has a name defined and that the name is not empty.
4. This test ensures that the menu element is hidden by default.
5. This test ensures that the menu changes visibility when the menu icon is clicked. This test has two expectations: does the menu display when clicked and does it hide when clicked again.
6. This test ensures that when the `loadFeed` function is called and completes its work, there is at least a single `.entry` element within the `.feed` container.
7. This test ensures that when a new feed is loaded by the `loadFeed` function the content actually changes.

## Contributing

This repository is the result of a project I worked on to finish a section of the Udacity curriculum for a Front-End Developer Nanodegree Program. Therefore, all contributions are welcome.

For details, check out [CONTRIBUTING](CONTRIBUTING.md).

## License

Jasmine-rssreader is distributed under the [MIT license](LICENSE.md).
