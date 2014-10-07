## ******************************************** ##
## nginx configuration file for the blog's      ##
##   comments engine, running a python server,  ##
##   reverse-proxied through nginx              ##
## author: necavit                              ##
## date: 24, May, 2014                          ##
## ******************************************** ##

# IP address and port to listen to
upstream comments.blog.davidmr.es {
    server 188.226.214.223:2370;
}

# nginx server configuration
server {
	listen 80; #listen on the 80 port
	server_name comments.blog.davidmr.es; #(sub)domain
	
	location / { #redirection
		proxy_pass http://comments.blog.davidmr.es; #upstream defined
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        	proxy_set_header Host $host;
        	proxy_set_header X-Forwarded-Proto $scheme;
	}
}
