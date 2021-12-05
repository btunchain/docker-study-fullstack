FROM node:alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# frontend nginx
FROM nginx
EXPOSE 3000
# nginx 설정파일 복사. 컨테이너 안에있는 nginx 설정파일 경로
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html