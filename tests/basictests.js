var test = require('tape');
var truncateToTweet = require('../index');

test('Truncate', function truncate(t) {
  t.plan(1);

  var truncated = truncateToTweet({
    maxTweetMessageLength: 140,
    text: 'I am definitely more that 140 characters. Because I have a lot of important things to say. Yes, America, you need to hear this. You need to hear all of it!'
  });

  t.equal(
    truncated,
    'I am definitely more that 140 characters. Because I have a lot of important things to say. Yes, America, you need to hear this. You need to…',
    'Correctly truncates too-long text.'
  );
});

test('No truncate', function doNotTruncate(t) {
  t.plan(1);

  var oneForty = 'This tweet is exactly 140 characters. It does not deep to be truncated. Truncating it is unnecessary. Why would you do that? It\'s a waste!';

  var truncated = truncateToTweet({
    maxTweetMessageLength: 140,
    text: oneForty
  });

  t.equal(truncated, oneForty, 'Does not truncate if text is short enough.');
});

test('Truncate to fit url', function truncateForURL(t) {
  t.plan(1);

  var truncated = truncateToTweet({
    maxTweetMessageLength: 140,
    text: 'Normally, this text would not need to be truncated. However! A URL must be included in the tweet. URL stands for Universal Resource Locator.',
    urlsToAdd: [
      'http://smidgeo.com/plan'
    ]
  });

  t.equal(
    truncated,
    'Normally, this text would not need to be truncated. However! A URL must be included in the tweet. URL stands fo… http://smidgeo.com/plan',
    'Truncates the text to fit a url.' 
  );
});


test('Truncate to fit two urls', function truncateForTwoURLs(t) {
  t.plan(1);

  var truncated = truncateToTweet({
    maxTweetMessageLength: 140,
    text: 'Normally, this text would not need to be truncated. However! A URL must be included in the tweet. URL stands for Universal Resource Locator.',
    urlsToAdd: [
      'http://smidgeo.com/plan',
      'http://nonstopscrollshop.com'
    ]
  });

  t.equal(
    truncated,
    'Normally, this text would not need to be truncated. However! A URL must be included… http://smidgeo.com/plan http://nonstopscrollshop.com',
    'Truncates the text to fit two urls.'
  );
});

test('Use alternate delimiter', function alternateDelimiter(t) {
  t.plan(1);

  var truncated = truncateToTweet({
    maxTweetMessageLength: 140,
    text: 'Normally, this text would not need to be truncated. However! A URL must be included in the tweet. URL stands for Universal Resource Locator.',
    urlsToAdd: [
      'http://smidgeo.com/plan',
      'http://nonstopscrollshop.com'
    ],
    delimiter: '\n'
  });

  t.equal(
    truncated,
    'Normally, this text would not need to be truncated. However! A URL must be included…\nhttp://smidgeo.com/plan\nhttp://nonstopscrollshop.com',
    'Uses the specified delimiter.'
  );
});
