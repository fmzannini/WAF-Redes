#!/usr/bin/env bash

echo -e "-- BEGIN ${HOSTNAME} --\n"
echo -e "installing node"
sudo apt-get install python-software-properties
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install nodejs

node server.js &
