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
    psql -U thingsboard -f '/dev_db/thingsboard' thingsboard
    touch ${firstlaunch}
    echo "*** [DEV] db populated, starting thingsboard ***"
fi

start-tb.sh
