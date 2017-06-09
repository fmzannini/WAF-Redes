#!/bin/bash

#https://github.com/justintime/vagrant-haproxy-demo/blob/master/haproxy-setup.sh
/usr/bin/apt-get -y install haproxy

cat > /etc/default/haproxy <<EOD
EOD
cp haproxy.cfg /etc/haproxy/haproxy.cfg.orig
/usr/sbin/service haproxy restart
