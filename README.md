tweet-truncate
==================

Chops text down to size for Twitter using ellipses. You give it the text and any urls you want to include in the tweet, and it gives you back something that will fit.

Installation
------------

    npm install tweet-truncate

Usage
-----

    var truncateToTweet = require('tweet-truncate');
    console.log(truncateToTweet({
      maxTweetMessageLength: 140,
      text: 'Normally, this text would not need to be truncated. However! A URL must be included in the tweet. URL stands for Universal Resource Locator.',
      urlsToAdd: [
        'http://smidgeo.com/plan'
      ]
    });

This would print out:

    Normally, this text would not need to be truncated. However! A URL must be included in the tweet. URL stands for Uni… http://smidgeo.com/plan

`maxTweetMessageLength` defaults to 280 now.

Tests
-----

Run tests with `make test`.

License
-------

MIT.
