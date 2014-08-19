# MARKDOWN #

* [safehold](https://safehold.com/)
* [maritimepg](https://www.maritimepg.com/)
* [harborrisk](https://www.harborrisk.com/home.html)

----
Body text -- `mono text`

## PRE ##


    $ do `it`

### UL ###


* [spot link](http://site/) `(http://site/)`
* [named link][site] `[site]`

#### OL ####


0. 0
0. 0

[site]: http://site/

    I'm taking the advice from @Daniel Pryden's comment and posting this as an answer instead.

    I had a think about this problem and thought - why not create the website in an old fashioned manner, actual pages and everything but then perform the following steps.

    1   Intercept all internal links on the homepage using jQuery and prepend a hash (#) before the window.location.pathname, thus triggering the hashchange event. (see step 3)

    2   Add a javascript redirect on all pages apart from the homepage to redirect pages back to the homepage, but append the window.location.pathname after a hash (#).
        For example, Google crawls http://www.domain.com/about-us.aspx but when a user visits the page, they're redirected to http://www.domain.com/#/about-us.aspx

    3   On the homepage, use jQuery BBQ or a similar plugin to listen for the hashchange event including when the page loads so that dynamic content can be loaded.
        Umbraco can be configured to serve partial or full page content based on whether the request is an AJAX one or not.

    This way, users without Javascript will have a full-blown (semi-good-looking) website,
    Google will crawl all of the pages without any issues, but users with Javascript will always stay on the homepage
    - and the cool concept of having a Web App rather than a Web Site will be accomplished.
