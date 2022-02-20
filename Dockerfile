FROM node:14.17 AS frontend-builder
ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

# https://hub.docker.com/_/httpd
FROM httpd:2.4
COPY --from=frontend-builder /app/build /usr/local/apache2/htdocs/

# docker run -d --name sedurdle \
#     --network proxynet \
#     psidex/sedurdle
