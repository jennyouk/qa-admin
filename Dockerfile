FROM node:20.9.0
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm run build
# below would be for typical docker implementation
EXPOSE 5001
ENTRYPOINT ["node", "./mock-backend/server.js"]

# below would be to implement with heroku registry (where expose and entrypoint are not allowed)
# CMD ["node", "./mock-server/server.js"]
