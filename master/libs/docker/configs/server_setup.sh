#!/bin/bash
# This script is intended to automate some parts of the server deployment process
# currently it only contains the base setup commands

# goes to base directory of the repo
export INSTALL_DIR=$(git rev-parse --show-toplevel)
cd $INSTALL_DIR/master
# load environment variables from .env file
export $(grep -v '^#' .env | xargs)
# installs nginx
apt update && apt install nginx
# copies over nginx configs
cp libs/docker/configs/nginx/* /etc/nginx/sites-enabled
sed -i 's/<<DOMAIN>>/'$DOMAIN'/g' /etc/nginx/sites-enabled/*
# install pm2 globally (runs backend)
yarn global add pm2
# build the project 
yarn nx build lora-tracking --prod
yarn nx build api --prod
# start the api server & nginx
pm2 start dist/apps/api/main.js
systemctl restart nginx
# save configuration and enable service for automatic startup
sudo pm2 save
sudo pm2 startup
