Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/trusty64"

    # Configs for web server 1
    config.vm.define :webserver1 do |webserver1_config|
        webserver1_config.vm.provider :virtualbox do |vb_config|
            vb_config.name = "Web Server 1"
        end
        webserver1_config.vm.hostname = "webserver1"
        webserver1_config.vm.network "private_network", ip: "192.168.33.80"
        webserver1_config.vm.provision "file", source: "./server/server.js", destination: "server.js"
        webserver1_config.vm.provision "file", source: "./server/server1.html", destination: "server.html"
        webserver1_config.vm.provision :shell, path: "server/server.sh"
    end

    # Configs for web server 2
    config.vm.define :webserver2 do |webserver2_config|
        webserver2_config.vm.provider :virtualbox do |vb_config|
            vb_config.name = "Web Server 2"
        end
        webserver2_config.vm.hostname = "webserver2"
        webserver2_config.vm.network "private_network", ip: "192.168.33.90"
        webserver2_config.vm.provision "file", source: "./server/server.js", destination: "server.js"
        webserver2_config.vm.provision "file", source: "./server/server2.html", destination: "server.html"
        webserver2_config.vm.provision :shell, path: "server/server.sh"
    end

    # Configs for haproxy
    config.vm.define :haproxy do |haproxy_config|
        haproxy_config.vm.provider :virtualbox do |vb_config|
            vb_config.name = "HAProxy"
        end
        haproxy_config.vm.hostname = "haproxy"
        haproxy_config.vm.network :forwarded_port, guest: 80, host: 8080
        haproxy_config.vm.network "private_network", ip: "192.168.33.70"
        haproxy_config.vm.provision :shell, path: "haproxy/haproxy.sh"
    end
    # Configs for haproxy
    config.vm.define :waf do |waf_config|
        waf_config.vm.provider :virtualbox do |vb_config|
            vb_config.name = "WAF"
        end
        waf_config.vm.hostname = "waf"
        waf_config.vm.network "private_network", ip: "192.168.33.60"
        waf_config.vm.provision "file", source: "./waf/httpd.conf", destination: "httpd.conf"
        waf_config.vm.provision "file", source: "./waf/mod_security.conf", destination: "mod_security.conf"
        waf_config.vm.provision "file", source: "./waf/modsecurity.conf", destination: "modsecurity.conf"
        waf_config.vm.provision :shell, path: "waf/waf.sh"
    end

end
