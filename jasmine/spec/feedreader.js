/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
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


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
          it('all urls are defined', function() {
            allFeeds.forEach(function(feeds) {
            expect(feeds.url).toBeDefined();
            expect(feeds.url.length).not.toBe(0);
            });
        });

        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('all names are defined', function() {
            allFeeds.forEach(function(feeds) {
            expect(feeds.name).toBeDefined();
            expect(feeds.name.length).not.toBe(0);
            });
        });
    });


    /* a new test suite named "The menu" to check its toggle visibility */
    describe('The menu', function() {
        /* a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should be hidden on load', function() {
           expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('toggles on click' , function() {
            $('.menu-icon-link').click();// triggers click event
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();// triggers click event
            expect($('body').hasClass('menu-hidden')).toBe(true);
            
        });
    });

    /* a new test suite named "Initial Entries" to check entries presence */
    describe('Initial Entries' , function() {
        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0 , done);
        });

        it('entries are there' , function() {
            expect($('.feed .entry').length).not.toBe(0);
        });
    });

    /* a new test suite named "New Feed Selection" to witness the feed changes*/
    describe('New Feed Selection' , function() {
        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var oldEntry, newEntry;// variable to store entry
        beforeEach(function(done) {
            loadFeed(0 , function() {
                oldEntry = $('.feed .entry').text();
                console.log(oldEntry);
            });
            done();
        });

        beforeEach(function(done) {
            loadFeed(1 , function() {
                newEntry = $('.feed .entry').text();
                console.log(newEntry);
            });
            done();
        });

        it('feed content changes', function() {
            expect(newEntry).not.toBe(oldEntry);
        });
    });
}());
