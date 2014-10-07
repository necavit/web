## ******************************************** ##
## nginx configuration file for a custom        ##
##   node.js server, reverse-proxied through    ##
##   an nginx server                            ##
## author: necavit                              ##
## date: 9, July, 2014                          ##
## ******************************************** ##

# IP address and port to listen to
upstream hades.davidmr.es {
    server 188.226.214.223:5000;
}

# nginx server configuration
server {
	listen 80; #listen on the 80 port
	server_name hades.davidmr.es; #(sub)domain
	
	location / { #redirection
		proxy_pass http://hades.davidmr.es; #upstream defined
	}
}
