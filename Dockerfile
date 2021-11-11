# node镜像
FROM node:14

# 指定接下来的工作路径为/app  - 类似于cd命令
WORKDIR /app
COPY ./ .

RUN npm config set registry https://registry.npm.taobao.org;
RUN npm install
RUN echo npx pm2 -v

CMD npm run prod-dev && npx pm2 log
