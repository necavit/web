#!/bin/bash

function usage {
    echo "USAGE:"
    echo "    nginx_utils COMMAND"
    echo "    "
    echo "    Available COMMANDs:"
    echo "                         help   shows this help and exits"
    echo "                        start   starts as root the nginx server as a service"
    echo "                         stop   stops the running nginx server service"
    echo "        catlog [error|access]   cats the error or access log of the nginx service"
    exit
}

function start_nginx {
    echo "> service nginx start"
    service nginx start
}

function stop_nginx {
    echo "> service nginx stop"
    service nginx stop
}

function catlog {
    case $1 in
        error)
            cat /var/log/nginx/error.log
        ;;
        start)
            cat /var/log/nginx/access.log
        ;;
        *)
            echo "Unknown log option"
            usage
        ;;
    esac
}

#switch on the first command line argument
case $1 in
    start)
        start_nginx
    ;;
    stop)
        stop_nginx
    ;;
    catlog)
        shift
        catlog $1
    ;;
    -h|--help|help|*)
        usage
    ;;
esac
