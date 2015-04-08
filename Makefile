.PHONY: test
test:
	- node test/*.js

run:
	- docker run -d --name=zz tmlbl/zillow 

build:
	- docker build -t tmlbl/zillow .
