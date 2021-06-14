const SharedStylesMappings = require('../../tools/generators/shared-mappings');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');

const sharedMappings = new SharedStylesMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.base.json'),
  ['@dravelopsfrontend/graphql-generated-content']
);

module.exports = {
  output: {
    uniqueName: "efa",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases()
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "efa",
      filename: "remoteEntry.js",
      exposes: {
        './Module': './apps/efa/src/app/feature-shell/feature-shell.module.ts',
      },
      shared: {
        // all micro frontends
        "@angular/animations": {singleton: true, strictVersion: true},
        "@angular/cdk": {singleton: true},
        "@angular/common": {singleton: true},
        "@angular/common/http": {singleton: true, strictVersion: true},
        "@angular/compiler": {singleton: true},
        "@angular/core": {singleton: true},
        "@angular/forms": {singleton: true},
        "@angular/material": {singleton: true},
        "@angular/platform-browser": {singleton: true},
        "@angular/platform-browser-dynamic": {singleton: true},
        "@angular/router": {singleton: true},
        "rxjs": {singleton: true},

        // shell micro frontend and efa micro frontend
        "apollo-angular": {singleton: true, strictVersion: true},
        "@apollo/client": {singleton: true, strictVersion: true},
        "graphql": {singleton: true, strictVersion: true},

        ...sharedMappings.getDescriptors()
      }
    }),
    sharedMappings.getPlugin()
  ],
};
