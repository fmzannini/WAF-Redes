# Install haproxy
  /usr/bin/apt-get -y install haproxy

  # Configure haproxy
  cat > /etc/default/haproxy <<EOD
# Set ENABLED to 1 if you want the init script to start haproxy.
ENABLED=1
# Add extra flags here.
#EXTRAOPTS="-de -m 16"
EOD
  cat > /etc/haproxy/haproxy.cfg <<EOD
  global
      daemon
      maxconn 256
  defaults
      mode http
      timeout connect 5000ms
      timeout client 50000ms
      timeout server 50000ms
  frontend webservers_front
      bind 192.168.17.50:80
      default_backend webservers_back
  backend webservers_back
      balance roundrobin
      server web1 192.168.17.80:80 maxconn 32 check
      server web2 192.168.17.90:80 maxconn 32 check
  listen admin
      bind *:8080
      stats enable

EOD

  cp /etc/haproxy/haproxy.cfg /etc/haproxy/haproxy.cfg.orig
  /usr/sbin/service haproxy restart
