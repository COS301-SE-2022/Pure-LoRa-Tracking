#!/bin/bash

firstlaunch=${DATA_FOLDER}/.firstlaunch

if [ ! -f ${firstlaunch} ] && [ "$PURELORABUILD" == "DEV" ]; then
    echo "DEV_B" > /tmp/dmsg.txt
    echo "==============="
    echo "|| DEV BUILD ||"
    echo "==============="
    echo "*** [DEV] Starting db ***\n"
    start-db.sh
    
    echo "*** [DEV] Populating db ***"
    export PGPASSWORD=root
    psql -h postgresql -U thingsboard -f '/dev_db/thingsboard' thingsboard
    exit
    touch ${firstlaunch}
    echo "*** [DEV] db populated, starting thingsboard ***"
fi

start-tb.sh
