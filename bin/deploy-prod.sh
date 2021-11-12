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
echo "==============拉取所有tags================="
git fetch --tags
echo "==============切换tag $1================="
git checkout "$1"

sleep 1

npm config set registry https://registry.npm.taobao.org

npm install

npm run prod

echo "==============build end================"