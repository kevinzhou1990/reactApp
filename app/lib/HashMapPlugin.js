const fse = require('fs-extra');
const path = require('path');
class HashedModuleIdsPlugin {
  constructor(options) {
    this.options = Object.assign({
      fileName: 'manifest.json'
    }, options);
  }

  apply(compiler) {
    const options = this.options;
    let jsonObj = {};
    compiler.plugin("compilation", (compilation) => {
      compilation.plugin("before-module-ids", (modules) => {
        modules.forEach((module) => {
          if (module.id && module.libIdent) {
            const id = module.libIdent({
              context: this.options.context || compiler.options.context
            });
            let entryValues = Object.values(compilation.options.entry);
            if (entryValues.indexOf(id) > -1) {
              jsonObj[id] = module.id;
            }
          }
        });
      });
    });

    compiler.plugin('emit', function(compilation, compileCallback) {
      var outputFile = path.resolve(compilation.options.output.path, options.fileName);
      fse.outputFileSync(outputFile, JSON.stringify(jsonObj));
      compileCallback();

    });
  }
}

module.exports = HashedModuleIdsPlugin;
