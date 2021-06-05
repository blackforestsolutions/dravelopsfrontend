# building and testing stage
FROM node:14 as build
WORKDIR /dravelopsfrontend
COPY . .
RUN chown -R node:node /dravelopsfrontend
USER node
RUN npm install && npm run all:lint && npm run all:cover && npm run all:build

# deployment stage
FROM node:14-alpine
COPY --from=build /dravelopsfrontend/dist/apps/shell/browser dist/apps/shell/browser
COPY --from=build /dravelopsfrontend/dist/apps/shell/server dist/apps/shell/server
RUN chown node:node dist/apps/shell/server && chown node:node dist/apps/shell/browser
USER node
CMD ["node", "dist/apps/shell/server/main.js"]
