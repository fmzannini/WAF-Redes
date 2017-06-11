#!/usr/bin/env bash
sudo apt-get update -y

echo -e "-- BEGIN ${HOSTNAME} --\n"
echo -e "installing node"
sudo apt-get install python-software-properties
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install nodejs

echo -e "installing postgres"
sudo apt-get install libpq-dev postgresql-common postgresql -y
sql_command="ALTER ROLE \"postgres\" WITH LOGIN SUPERUSER PASSWORD 'postgres';"
sudo sql_command="$sql_command" -Eu postgres bash -c 'psql -c "$sql_command"'
sudo db_command="CREATE DATABASE mydb;" -Eu postgres bash -c 'psql -c "$db_command"'
sudo db_command="CREATE TABLE mytable(name varchar(64));" -Eu postgres bash -c 'psql -d mydb -c "$db_command"'

echo -e "installing sequelize"
npm i -g sequelize
npm i sequelize

echo -e "installing pg"
npm i pg
npm i -g pg

echo -e "running server"
node server.js
