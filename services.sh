#!/bin/bash

function usage {
    echo "USAGE:"
    echo "    services COMMAND"
    echo "    "
    echo "    Available COMMANDs:"
    echo "                         help   shows this help and exits"
    echo "                        start   starts all services"
    echo "                         stop   stops all the running services"
    exit
}

function start_services {
    echo "Starting nginx reverse proxy server..."
    echo "> nginx_utils.sh start"
    nginx_utils.sh start

    echo "Starting Ghost blogging engine server..."
    echo "> NODE_ENV=production forever start blog/ghost/index.js"
    NODE_ENV=production forever start blog/ghost/index.js

    echo "Starting custom node.js server..."
    echo "> forever start server/index.js"
    forever start server/index.js
}

function stop_services {
    echo "Stopping nginx reverse proxy server..."
    echo "> nginx_utils.sh stop"
    nginx_utils.sh stop

    echo "Stopping Ghost blogging engine server..."
    echo "Stopping custom node.js server..."
    echo "> forever stopall -v"
    forever stopall -v
}

case $1 in
    start)
        start_services
    ;;
    stop)
        stop_services
    ;;
    -h|--help|help)
        usage
    ;;
    *)
        echo "error: Unknown command"
        usage
    ;;
esac
