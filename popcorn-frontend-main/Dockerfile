FROM node

WORKDIR /app

COPY . /app

RUN npm install && \
    npm run build

CMD cp -r /app/build/* /app/dist

