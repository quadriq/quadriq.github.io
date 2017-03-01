---
layout: post
title:  "Authenticate Express.js with GitLab"
comments: true
date:   2016-10-02 12:00:00 +0000
permalink: /:year/:month/:day/:title/
---

how to add `sign in with GitLab` Button to your page? Very simple. Let's use some public npm_s for this:

```
"passport": "*",
"passport-gitlab2": "*"
```

So, we would need `passport` to make authentication. And `passport-gitlab2` plugin to make it with GitLab

and here is the code of the `server.js`

```JavaScript
'use strict'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var config = require('./config.json');

var fs = require("fs");
var express = require("express");
var passport = require("passport");
var session = require('express-session');
var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser());
app.use(session({
  secret: 'clinksecret', // TODO: STORE outside
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var GitlabStrategy = require('passport-gitlab2').Strategy;

passport.use(new GitlabStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL,
    baseURL: config.baseURL
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));

app.use(/^\/(?!oauth|assets).*/, function(req, res, next) {
  if (req.user == null) {
    console.log("doing redirect as not login");
    res.redirect('/oauth/login');
    return;
  }
  console.log("user logged in");
  next()
});
app.use(express.static(__dirname + '/public'));


app.use('/oauth/login', express.static(__dirname + '/views/login.html'));

app.get('/oauth/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

app.get('/oauth/gitlab', passport.authenticate('gitlab'));

app.get('/oauth/callback', passport.authenticate('gitlab', {
  successRedirect: '/',
  failureRedirect: '/oauth/login'
}));

app.get('/oauth/user', function(req, res) {
  console.log(JSON.stringify(req.user));
  res.send(JSON.stringify(req.user));
});

app.listen(3000, "0.0.0.0");
'use strict'

```
