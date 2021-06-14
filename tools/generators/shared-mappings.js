const path = require('path');
const fs = require('fs');
const NormalModuleReplacementPlugin = require("webpack/lib/NormalModuleReplacementPlugin");


class SharedMappings {

  mappings = [];

  register(tsConfigPath, shared = null) {

    if (!path.isAbsolute(tsConfigPath)) {
      throw new Error('SharedMappings.register: tsConfigPath needs to be an absolute path!');
    }

    const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, {encoding: 'utf-8'}));
    const mappings = tsConfig?.compilerOptions?.paths;
    const rootPath = path.normalize(path.dirname(tsConfigPath));

    if (!mappings) {
      return;
    }

    for (const key in mappings) {

      const libPath = path.normalize(path.join(rootPath, mappings[key][0]));
      const version = this.getPackageVersion(libPath);

      if (shared && shared.includes(key)) {
        this.mappings.push({
          key,
          path: libPath,
          version
        });
      }
    }
  }

  getPackageVersion(libPath) {

    if (libPath.endsWith('.ts')) {
      libPath = path.dirname(libPath);
    }

    const packageJsonPath = path.join(libPath, '..', 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, {encoding: 'utf-8'}));
      return packageJson.version ?? null;
    }
    return null;
  }

  getPlugin() {
    return new NormalModuleReplacementPlugin(/./, (req) => {
      const from = req.context;
      const to = path.normalize(path.join(req.context, req.request));

      if (!req.request.startsWith('.')) return;

      for (const m of this.mappings) {
        const libFolder = path.normalize(path.dirname(m.path));
        if (!from.startsWith(libFolder) && to.startsWith(libFolder)) {
          req.request = m.key;
        }
      }
    });
  }

  getAliases() {
    const result = {};

    for (const m of this.mappings) {
      result[m.key] = m.path;
    }

    return result;
  }

  getDescriptors() {
    const result = {};

    for (const m of this.mappings) {
      result[m.key] = {
        requiredVersion: false
      };
    }

    return result;
  }
}

module.exports = SharedMappings;
