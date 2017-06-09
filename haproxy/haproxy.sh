#!/usr/bin/env bash

echo -e "-- BEGIN HAPROXY --\n"

echo -e "-- Installing HAProxy\n"
apt-get install -y haproxy > /dev/null 2>&1

echo -e "-- Enabling HAProxy as a start-up deamon\n"
cat > /etc/default/haproxy <<EOF
ENABLED=1
EOF

echo -e "-- Validating HAProxy configuration\n"
haproxy -f haproxy.cfg -c

echo -e "-- Starting HAProxy\n"
service haproxy start
