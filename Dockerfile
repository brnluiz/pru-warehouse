FROM node:8.1.2

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT

WORKDIR /opt/pru-warehouse
ADD . /opt/pru-warehouse
RUN npm install

CMD ["npm", "start"]