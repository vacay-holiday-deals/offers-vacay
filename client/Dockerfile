# base image
FROM node:latest

# set working directory
WORKDIR /app

# copy the package.json file
COPY package.json /app/package.json 

# copy all to folder
COPY . /app

# run npm install
RUN npm install 

#run npm build to build folder
RUN npm run build

# install server module
RUN npm i -g serve

# start app
CMD ["serve", "-s", "build"]