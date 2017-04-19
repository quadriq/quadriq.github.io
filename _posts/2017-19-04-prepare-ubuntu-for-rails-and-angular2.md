---
layout: post
title:  "Prepare Ubuntu 14.04 for Rails5 and Angular2"
comments: true
date:   2017-19-04 12:00:00 +0000
permalink: /:year/:month/:day/:title/
---

here how to prepare a Ubuntu 14.04 for Rails5 and Angular2 Apps

### Ruby 2.x

```
sudo apt-get update
sudo apt-get install software-properties-common -y
sudo apt-add-repository ppa:brightbox/ruby-ng
sudo apt-get update
sudo apt-get install ruby2.2 ruby2.2-dev

ruby --version
ruby 2.2.6p396 (2016-11-15 revision 56800) [x86_64-linux-gnu]
```
