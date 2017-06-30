FROM node:8.1.2

WORKDIR /opt/pru-warehouse

ADD . /opt/pru-warehouse

RUN npm install

EXPOSE 80

CMD ["npm", "start"]