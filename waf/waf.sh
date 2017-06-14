#!/usr/bin/env bash
sudo -i
sudo apt-get update

echo -e "-- BEGIN ${HOSTNAME} --\n"

echo -e "Installing apache2"
sudo apt-get install apache2 -y

echo -e "Installing mod-security"
apt-get install libapache2-modsecurity -y
sets recommended configuration
cp mod_security.conf /etc/modsecurity/modsecurity.conf
cp modsecurity.conf /etc/apache2/mods-available/security2.conf
service apache2 reload
ln -s /usr/share/modsecurity-crs/base_rules/modsecurity_crs_41_xss_attacks.conf /usr/share/modsecurity-crs/activated_rules/
ln -s /usr/share/modsecurity-crs/base_rules/modsecurity_crs_41_sql_injection_attacks.conf /usr/share/modsecurity-crs/activated_rules/
ln -s /usr/share/modsecurity-crs/base_rules/modsecurity_crs_30_http_policy.conf /usr/share/modsecurity-crs/activated_rules/
service apache2 reload

mkdir /var/www/error

echo -e "Changing mode to proxy"
sudo a2enmod proxy
sudo a2enmod proxy_http

echo -e "Copying configuration"
cat httpd.conf >> /etc/apache2/apache2.conf
cp error.html /var/www/error/error.html

echo -e "Reloading apache2 service"
sudo service apache2 restart
