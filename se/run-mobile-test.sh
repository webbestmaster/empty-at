#!/usr/bin/env bash

# parameters $deviceId devicePort

deviceId=$1
serverPort=$2

if [[ -z "${serverPort}" ]] ; then
    echo "You should pass two parameters: deviceId and serverPort"
    exit 1
fi

SE_SERVER_PORT=${serverPort} mocha --require @babel/register ./test-mocha/

exit 0
