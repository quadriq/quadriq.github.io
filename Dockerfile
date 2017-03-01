
FROM ubuntu:16.04
RUN apt-get update
RUN apt-get -y install ruby rubygems ruby-dev make gcc vim git
RUN gem install jekyll bundler

