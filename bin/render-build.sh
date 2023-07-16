#!/usr/bin/env bash
# exit on error
set -o errexit

# add node_modules/.bin to PATH
PATH=$PATH:$(npm bin)

# change ownership of ~/.npm to current user
mkdir -p ~/.npm
chown -R $(whoami) ~/.npm

bundle install
bundle exec rake assets:precompile
bundle exec rake assets:clean
bundle exec rake db:migrate

# install webpack locally if it's not installed
if ! type "webpack" > /dev/null; then
  npm install webpack
fi

# set webpack_bin path
webpack_bin: /usr/local/bin/webpack

# compile assets with webpack
$(npm bin)/webpack
