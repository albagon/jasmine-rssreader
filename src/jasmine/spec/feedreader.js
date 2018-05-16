/* eslint-env jasmine */
/* global $, allFeeds, loadFeed */

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure that they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures that it has a URL
         * defined and that the URL is not empty.
         */
        allFeeds.forEach(function(feed){
            it('feed '+allFeeds.indexOf(feed)+' has a URL and it is not empty', function() {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull();
            });
        });

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures that it has a
         * name defined and that the name is not empty.
         */
        allFeeds.forEach(function(feed){
            it('feed '+allFeeds.indexOf(feed)+' has a name and it is not empty', function() {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
            });
        });
    });

    /* This is a new test suite for "The menu" */
    describe('The menu', function() {
        /* This test ensures that the menu element is
         * hidden by default.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* This test ensures that the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('should display/hidde when the menu icon is clicked', function() {
            // Make sure the menu is hidden
            $('body').class = 'menu-hidden';
            // Trigger a click event
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            // Trigger a second click event
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* This is a new test suite for "Initial Entries" */
    describe('Initial Entries', function() {
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('are added to the .feed container by the loadFeed function', function(done) {
            expect($('.feed').find('.entry').length).not.toBe(0);
            done();
        });
    });

    /* This is a new test suite for a "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* This test ensures that the content of the feed actually
         * changes when a new feed is loaded by the loadFeed function.
         * Remember, loadFeed() is asynchronous.
         */
        var initialFeed = $('.feed').html();
        var newFeed;

        beforeEach(function(done) {
            /* The initial feed id is 0 so we will call loadFeed()
             * with a different feed id, e.g. 1
             */
            loadFeed(1, done);
            newFeed = $('.feed').html();
        });

        it('is loaded by the loadFeed function', function(done) {
            expect(initialFeed).not.toEqual(newFeed);
            done();
        });

        afterEach(function(done) {
            /* Return the feed to its original state */
            loadFeed(0, done);
        });
    });
}());
