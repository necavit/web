#!/bin/bash

function usage {
    echo "USAGE:"
    echo "    nginx_utils COMMAND"
    echo "    "
    echo "    Available COMMANDs:"
    echo "        start  starts as root the nginx server as a service"
    echo "        stop   stops the running nginx server service"
    echo "        help   shows this help and exits"
    exit
}

function start_nginx {
    echo "> sudo service nginx start"
    sudo service nginx start
}

function stop_nginx {
    echo "> sudo service nginx stop"
    sudo service nginx stop
}

#switch on the first command line argument
case $1 in
    start)
        start_nginx
    ;;
    stop)
        stop_nginx
    ;;
    -h|--help|help|*)
        usage
    ;;
esac
