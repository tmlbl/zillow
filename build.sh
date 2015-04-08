#!/bin/sh -e
npm i &&
tsd reinstall -so &&   #typescript definition manager
grunt                  #build
