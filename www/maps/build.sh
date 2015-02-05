#!/bin/sh -e
cd ../../ &&
npm i || sudo npm i &&
cd www/maps &&
npm i || sudo npm i &&
grunt