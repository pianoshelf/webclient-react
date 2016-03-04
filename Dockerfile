
# Use Ubuntu distribution
FROM ubuntu:14.04
MAINTAINER Ankit Sardesai <me@ankitsardesai.ca>

# Install node and sqlite3 on Ubuntu
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
RUN apt-get update -y
RUN apt-get install -y nodejs nginx supervisor

# Install packages
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# Copy application code
WORKDIR /opt/app
ADD . /opt/app

# Compile codebase
RUN npm run compile

# Prune developer packages and uncompiled files
RUN rm -rf app && npm prune --production

# Add hier directories to root
ADD hier /

# Add nginx user
RUN useradd -ms /bin/bash nginx

# Define environment variables
ENV NODE_ENV production
ENV PORT 5092

# Expose the port being used
EXPOSE 80

# Start the server
CMD ["/usr/bin/supervisord"]
