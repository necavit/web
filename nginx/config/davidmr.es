## ******************************************** ##
## nginx configuration file for a custom        ##
##   node.js server, reverse-proxied through    ##
##   an nginx server                            ##
## author: necavit                              ##
## date: 24, May, 2014                          ##
## ******************************************** ##

# IP address and port to listen to
upstream davidmr.es {
    server 188.226.214.223:8080;
}

# nginx server configuration
server {
	listen 80; #listen on the 80 port
	server_name davidmr.es; #(sub)domain
	
	location / { #redirection
		proxy_pass http://davidmr.es #upstream defined
	}
}
