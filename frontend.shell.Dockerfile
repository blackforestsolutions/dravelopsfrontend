# building and testing stage
FROM node:14 as build
WORKDIR /dravelopsfrontend
COPY . .
RUN chown -R node:node /dravelopsfrontend
USER node
RUN npm install && npm run all:lint && npm run all:cover && npm run all:build

# deployment stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /dravelopsfrontend/dist/apps/shell .
COPY --from=build /dravelopsfrontend/nginx/default.conf /etc/nginx/conf.d
RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid
USER nginx
