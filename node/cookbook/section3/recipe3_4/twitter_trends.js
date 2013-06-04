var http = require('http');
var colors = require('colors');

function makeCall(urlOps, cb){
    console.log('url option: ' + urlOps.host + urlOps.path);
    http.get(urlOps, function (res) { // send Twitter API request
        trendingTopics.jsonHandler(res, cb);
    }).on('error', function (e) {
        console.log('Connection Error: ' + e.message);
    });
}

var trendingTopics = module.exports = {
    trends: {
        urlOpts: {
            host: 'api.twitter.com',
            path: '/1/trends/1.json', // 1.json returnds global trends
            headers: {'User-Agent': 'Node Cookbook: Twitter trend'}
        }
    },
    tweets: {
        maxResults:3,
        resultsType: 'realtime',
        language: 'en',
        urlOpts: {
            host: 'search.twitter.com',
            headers: {'User-Agent': 'Node Cookbook: Twitter trend'}
        }
    },
    jsonHandler: function(res, cb){
        var json = '';
        res.setEncoding('utf8');
        if (res.statusCode === 200) {
            res.on('data', function(chunk) {
                json += chunk;
            }).on('end', function() {
//                console.log('  server returns: ' + json);
                cb(JSON.parse(json));
            });
        }else{
            throw('Server returnts error: ' + res.statusCode);
        }
    },
    tweetPath: function(q) {
        var p = '/search.json?lang=' + this.tweets.language + '&q=' + q + '&rpp=' + this.tweets.maxResults + '&include_entities=true' + '&with_twitter_user_id=true&result_type=' + this.tweets.resultsType;
        this.tweets.urlOpts.path = p;
    }
};


function dumpObject(obj, indent) {
    if(indent == null){
        indent = '';
    }

    for (var p in obj) {
        console.log(indent + p + ' = ' + obj[p]);
        if (typeof obj[p] == 'object'){
            indent += '   ';
            dumpObject(obj[p], indent);
        }
    }
}

//
makeCall(trendingTopics.trends.urlOpts, function(trendsArr) {
    trendingTopics.tweetPath(trendsArr[0].trends[0].query);
    makeCall(trendingTopics.tweets.urlOpts, function(tweetsObj){
//        console.log(' JSON parsed obj : ' + tweetsObj.toString());
//        dumpObject(tweetsObj);
        tweetsObj.results.forEach(function(tweet) {
            console.log(tweet.from_user.yellow.bold + ': ' + tweet.text);
        });
    });
})


dumpObject(trendingTopics);
