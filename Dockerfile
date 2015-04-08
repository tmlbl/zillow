FROM ubuntu:latest

RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup | sudo bash -
RUN apt-get install -y nodejs
ADD . /opt/zillow
WORKDIR /opt/zillow
ENTRYPOINT node server.js
