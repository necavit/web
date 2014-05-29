## ******************************************** ##
## nginx configuration file for the Ghost       ##
##   blogging engine, running under a node.js   ##
##   server, reverse-proxied through nginx      ##
## author: necavit                              ##
## date: 24, May, 2014                          ##
## ******************************************** ##

# IP address and port to listen to
upstream blog.davidmr.es {
    server 188.226.214.223:2369;
}

# nginx server configuration
server {
	listen 80; #listen on the 80 port
	server_name blog.davidmr.es; #(sub)domain
	
	location / { #redirection
		proxy_pass http://blog.davidmr.es #upstream defined
	}
}
