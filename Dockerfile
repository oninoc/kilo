FROM node:20-alpine AS base
WORKDIR /code
COPY package.json package-lock.json ./
RUN npm install

FROM base as dev
COPY . /code    
EXPOSE 5173
CMD ["npm", "run", "dev"]

