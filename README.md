# OurStay - FS

## Pre-Install
Make sure you install the following for your platform, Mac, Linux or Windows.

    git (For your platform)
    NodeJS (For your platform)
    npm install -g bower
    npm install -g jsdoc

## Installing Windows
Go to root folder of your project then run the following.

    npm install
    bower install
    del out
    jsdoc src -r --readme README.docs.md

## Installing Mac or Linux
Run `./scripts/install` from project directory

## Running Locally
`gulp serve`

## Tests
Run `./scripts/test` from project directory

## Production
Merging anything into `master` will trigger CircleCI to run a pass and push to production. **DO SO WITH CAUTION**.# ourstay_up
