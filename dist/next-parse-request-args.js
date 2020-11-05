/*!
 * name: @feizheng/next-parse-request-args
 * description: Request arguments parser.
 * homepage: https://github.com/afeiship/next-parse-request-args
 * version: 1.0.11
 * date: 2020-11-05T09:21:01.951Z
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var nxDelete = nx.delete || require('@feizheng/next-delete');
  var DEFAULT_OPTIONS = { method: 'get' };
  var DEL_FIELDS = ['method', 'url', 'data'];
  var MSG_ERROR = 'The arguments.length should between 1 ~ 4.';
  var HTTP_METHOD = ['GET', 'POST', 'DELETE', 'PUT', 'CONNECT', 'HEAD', 'OPTIONS', 'TRACE'];
  var isValidMethod = function (arg) {
    return HTTP_METHOD.includes(arg.toUpperCase());
  };

  nx.parseRequestArgs = function (inArguments, inIsArray) {
    var args = inArguments;
    var length = args.length;
    var options = null;

    // input:
    // 1. (config)
    // 2. (url)
    // 3. (url, config)
    // 4. (method, config)
    // 5. (method, url, config)
    // 6. (method, url, data, config)

    switch (length) {
      case 1:
        options = typeof args[0] === 'string' ? { url: args[0] } : args[0];
        break;
      case 2:
        options = isValidMethod(args[0])
          ? nx.mix({ method: args[0] }, args[1])
          : nx.mix({ url: args[0] }, args[1]);
        break;
      case 3:
        options = nx.mix({ method: args[0], url: args[1] }, args[2]);
        break;
      case 4:
        options = nx.mix({ method: args[0], url: args[1], data: args[2] }, args[3]);
        break;
      default:
        options = null;
        nx.error(MSG_ERROR);
    }

    options = nx.mix(null, DEFAULT_OPTIONS, options);

    return !inIsArray
      ? options
      : [options.method, options.url, options.data, nxDelete(options, DEL_FIELDS)];
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.parseRequestArgs;
  }
})();

//# sourceMappingURL=next-parse-request-args.js.map
