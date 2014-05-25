#!/bin/bash

bold=`tput bold`
normal=`tput sgr0`

function usage {
    echo "Uploads (and packages) files to a remote host, using the scp command.\n"
    echo "USAGE:"
    echo "    upload [options] [FILE ...]"
    echo "    "
    echo "    options:"
    echo " ${bold}-l${normal}"
    echo "                lists default options and exit"
    echo " ${bold}-h, --host${normal} HOST"
    echo "                sets the remote host to which the connection is done"
    echo " ${bold}-u, --user${normal} USER"
    echo "                sets the remote user to connect with"
    echo " ${bold}-d, --dir${normal} DIR"
    echo "                sets the remote directory to which the files will be uploaded"
    echo " ${bold}-z, --zip${normal} [true|false]"
    echo "                set whether files should be packaged and compressed"
    exit
}

host="davidmr.es"
user="root"
dir="~/"
zip=true

function list {
    echo "Default configuration values:"
    echo "    host: $host"
    echo "    user: $user"
    echo "     dir: $dir"
    echo "     zip: $zip"
    exit
}

files=()

function treat_file_argument {
    if [ -f $1 ]; then
       files+=($1)
    else
       echo "File $1 does not exist."
       usage
    fi
}

if [[ $# < 1 ]]; then
    usage
fi

while [[ $# > 1 ]]
do
    key="$1"
    shift
    
    case $key in
        -l)
            list
        ;;
        -h|--host)
            host="$1" #we get the next argument and shift
            shift
        ;;
        -u|--user)
            user="$1" #we get the next argument and shift
            shift
        ;;
        -d|--dir)
            dir="$1" #we get the next argument and shift
            shift
        ;;
        *)
            treat_file_argument $key
        ;;
    esac
done

echo "Type the password to connect to: $user@$host:$dir"

#for file in ${files[@]}

