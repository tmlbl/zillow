#!/bin/sh -e
npm i || sudo npm i &&
tsd reinstall -so ||
grunt