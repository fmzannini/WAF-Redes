sudo apt-get update

echo -e "Installing apache2"
sudo apt-get install apache2 -y

echo -e "Installing libapache2-modsecurity"
sudo apt-get install libapache2-mod-security2 -y

echo -e "Verify modesecurity module was loaded"
sudo apachectl -M | grep --color security2

cp httpd.conf /etc/apache2/httpd.conf
# sudo mv /etc/modsecurity/modsecurity.conf-recommended /etc/modsecurity/modsecurity.conf
sudo service apache2 reload

sudo sed -i "s/SecRuleEngine DetectionOnly/SecRuleEngine On/" /etc/modsecurity/modsecurity.conf
sudo sed -i "s/SecResponseBodyAccess On/SecResponseBodyAccess Off/" /etc/modsecurity/modsecurity.conf
