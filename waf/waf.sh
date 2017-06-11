#!/usr/bin/env bash
sudo apt-get update

echo -e "-- BEGIN ${HOSTNAME} --\n"

echo -e "Installing apache2"
sudo apt-get install apache2 -y

echo -e "Changing mode to proxy"
sudo a2enmod proxy
sudo a2enmod proxy_http

echo -e "Copying configuration"
cat httpd.conf >> /etc/apache2/apache2.conf

echo -e "Reloading apache2 service"
sudo service apache2 restart
