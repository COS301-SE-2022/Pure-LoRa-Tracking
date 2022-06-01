#!/bin/sh
set -e # exit shell if we encounter issues
psql --username "$POSTGRES_USER" <<-EOSQL
    create role chirpstack_ns with login password 'chirpstack_ns';
    create database chirpstack_ns with owner chirpstack_ns;
    create role chirpstack_as with login password 'chirpstack_as';
    create database chirpstack_as with owner chirpstack_as;
    \c chirpstack_as;
    create extension pg_trgm;
    create extension hstore;
EOSQL

if [ "$PURELORABUILD" == "DEV" ]; then
    psql --username "$POSTGRES_USER" -f '/dev_db/chirpstack_as' chirpstack_as;
    # psql --username "$POSTGRES_USER" -f '/dev_db/chirpstack_ns' chirpstack_ns;
fi