# sudo apt-get update
#isntall git
# sudo apt-get install libtool m4 automake
# download modSecirity github
# install apache2-dev

# https://ansarii.wordpress.com/2011/06/17/compile-mod-securityweb-application-firewall-on-ubuntu/
echo -e "Installing apache2"
# sudo apt-get install apache2 -y

# a2enmod proxy
# a2enmod proxy_http

echo -e "Installing libapache2-modsecurity"
# sudo apt-get install libapache2-mod-security2 -y

# sudo mv /etc/modsecurity/modsecurity.conf-recommended /etc/modsecurity/modsecurity.conf

# apt-get install libapache2-mod-rpaf -y

echo -e "Verify modesecurity module was loaded"
# sudo apachectl -M | grep --color security2

cp security2.conf /etc/apache2/mods-enabled/security2.conf
cp httpd.conf /etc/apache2/httpd.conf
cp mod_security.conf /etc/apache2/mods-enabled/
# cp mod_rpaf.conf /etc/httpd/conf.d/
# cp aloha.conf /etc/httpd/modsecurity.d/aloha.conf

# sudo sed -i "s/SecRuleEngine DetectionOnly/SecRuleEngine On/" /etc/modsecurity/modsecurity.conf
# sudo sed -i "s/SecResponseBodyAccess On/SecResponseBodyAccess Off/" /etc/modsecurity/modsecurity.conf

sudo service apache2 reload
