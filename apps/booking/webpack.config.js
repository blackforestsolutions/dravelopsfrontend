const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const SharedStylesMappings = require("../../tools/generators/shared-mappings");
const path = require("path");

const sharedMappings = new SharedStylesMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.base.json'),
  [/* mapped paths to share */]
);

module.exports = {
  output: {
    uniqueName: "booking",
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
      name: "booking",
      filename: "remoteEntry.js",
      exposes: {
        './Module': './apps/booking/src/app/feature-booking/feature-booking.module.ts',
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

        ...sharedMappings.getDescriptors()
      }
    }),
    sharedMappings.getPlugin()
  ],
};
