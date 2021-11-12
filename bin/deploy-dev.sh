#!/bin/bash

echo "==============开始部署================="
if [ ! -d "/home/work/app" ]; then
   mkdir -p "/home/work/app"
fi
cd /home/work/app

if [ ! -d "/home/work/app/test-server" ]; then
   echo "==============git clone start================="
   git clone git@github.com:xiaozhu188/test-server.git
   echo "==============git clone success================="
fi
cd "/home/work/app/test-server"

echo "==============切换到dev分支================="
git checkout dev
echo "==============拉取最新的dev分支代码================="
git pull origin dev

sleep 1

docker-compose build test-server
docker-compose up -d

echo "==============docker-compose build end================"