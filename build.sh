#!/bin/sh -e
npm i || sudo npm i && #for our libs
tsd reinstall -so &&   #typescript definition manager
grunt                  #build