## nginx configuration
The nginx server configuration files are located under the `/etc/nginx` directory. There is couple of subdirectories that we should focus on:
* `/etc/nginx/sites-enabled` is meant to hold symlinks to config files under the `sites-available` directory. Only those files referenced from this directory will result on actual sites on our nginx server.
* `/etc/nginx/sites-available` contains the config definition files for each site or service we would like to have.

## nginx useful commands
To run nginx as a service:

