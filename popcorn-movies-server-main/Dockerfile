FROM node:latest

WORKDIR /app

COPY . /app
RUN npm install && \
    npm install pm2 -g

EXPOSE 8000

CMD ["pm2-runtime", "index.js"]