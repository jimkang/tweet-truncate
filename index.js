var shortenedURLLength = 27;
var maxTweetMessageLength = 140;
 - shortenedURLLength - 2;
var ellipsis = '\u2026';

function truncateToTweet(opts) {
  if (!opts || !opts.text) {
    throw new Error('No text supplied in opts.');
  }

  var truncated = opts.text;
  var maxTextLength = maxTweetMessageLength;
  var urlDelimiter = ' ';
  if (opts.delimiter) {
    urlDelimiter = opts.delimiter;
  }

  if (opts.urlsToAdd && opts.urlsToAdd.length > 0) {
    // 20 chars for each url.
    maxTextLength -= shortenedURLLength * opts.urlsToAdd.length;
    // Space between urls.
    maxTextLength -= opts.urlsToAdd.length;
  }

  if (truncated.length > maxTextLength) {
    // Make space for the ellipsis.
    var startTruncateAt = maxTextLength - 1;
    truncated = truncated.slice(0, startTruncateAt) + ellipsis;
  }

  if (opts.urlsToAdd) {
    opts.urlsToAdd.forEach(function appendURL(url) {
      truncated += (urlDelimiter + url);
    });
  }

  return truncated;
}

module.exports = truncateToTweet;
