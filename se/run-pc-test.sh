#!/usr/bin/env bash

clear
browser=$1

if [[ -z "${browser}" ]] ; then
    echo "You should pass a parameter: browser"
    exit 1
fi

mocha --require @babel/register ./test-mocha/
