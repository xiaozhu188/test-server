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

echo "==============撤销一切文件改动================="
git checkout .
echo "==============拉取最新的主分支代码================="
git pull origin main
echo "==============切换tag $1================="
git checkout main

sleep 1

docker-compose build test-server
docker-compose up -d

echo "==============docker-compose build success================"