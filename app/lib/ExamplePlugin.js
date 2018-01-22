function ExamplePlugin(options) {
  // Setup the plugin instance with options...
}

ExamplePlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    // console.log('Hello World!');
  });
  compiler.plugin("compilation", function(compilation) {
    // compilation.mainTemplate.plugin("modules", function(_, chunk, hash, chunkIdVar) {
    //   _ += "//---------modules--------";
    //   return _;
    // });
    // compilation.mainTemplate.plugin("require-ensure", function(_, chunk, hash, chunkIdVar) {
    //   _ += "//---------require-ensure--------";
    //   return _;
    // });
    compilation.mainTemplate.plugin("bootstrap", function(_, chunk, hash, chunkIdVar) {
      _ += "//---------bootstrap--------";
      return _;
    });
    compilation.mainTemplate.plugin("local-vars", function(_, chunk, hash, chunkIdVar) {
      _ += "this['installedModules'] = installedModules;//---------local-vars--------";
      return _;
    });
    compilation.mainTemplate.plugin("require", function(_, chunk, hash, chunkIdVar) {
      _ += "//---------require--------";
      return _;
    });
    compilation.mainTemplate.plugin("require-extensions", function(_, chunk, hash, chunkIdVar) {
      _ += "//---------require-extensions--------";
      return _;
    });
    compilation.mainTemplate.plugin("startup", function(_, chunk, hash, chunkIdVar) {
      _ += "//---------startup--------";
      return _;
    });
    // compilation.mainTemplate.plugin("render", function(_, chunk, hash, chunkIdVar) {
    //   _ += "//---------render--------";
    //   return _;
    // });
    // compilation.mainTemplate.plugin("render-with-entry", function(_, chunk, hash, chunkIdVar) {
    //   _ += "//---------render-with-entry--------";
    //   return _;
    // });
    // compilation.mainTemplate.plugin("module-require", function(requireFn, chunk, hash, varModuleId) {
      // global['requireFn'] = requireFn;
      // _ += "//---------module-require--------";
      // return _;
    // });
    compilation.mainTemplate.plugin("add-module", function(_, chunk, hash, chunkIdVar) {
      _ += "//---------add-module--------";
      return _;
    });
    // compilation.mainTemplate.plugin("current-hash", function(_, chunk, hash, chunkIdVar) {
    //   _ += "//---------current-hash--------";
    //   return _;
    // });
    // compilation.mainTemplate.plugin("asset-path", function(_, chunk, hash, chunkIdVar) {
    //   _ += "//---------asset-path--------";
    //   return _;
    // });
    // compilation.mainTemplate.plugin("global-hash-paths", function(_, chunk, hash, chunkIdVar) {
    //   _ += "//---------current-hash--------";
    //   return _;
    // });

    compilation.mainTemplate.plugin("module-obj", function(_, chunk, hash, chunkIdVar) {
      _ += "//---------module-obj--------";
      return _;
    });
  });
};

module.exports = ExamplePlugin;
