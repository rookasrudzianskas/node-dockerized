FROM node:15
WORKDIR /app
COPY package.json .
RUN yarn
COPY . ./
ENV PORT 3000
EXPOSE $PORT
CMD ["node", "index.js"]
