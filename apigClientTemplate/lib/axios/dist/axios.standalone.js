/*
axios v0.7.0
Copyright (c) 2014 Matt Zabriskie

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["axios"] = factory();
	else
		root["axios"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	var defaults = __webpack_require__(2);
	var utils = __webpack_require__(3);
	var dispatchRequest = __webpack_require__(4);
	var InterceptorManager = __webpack_require__(12);
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	var axios = module.exports = function (config) {
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  config = utils.merge({
	    method: 'get',
	    headers: {},
	    timeout: defaults.timeout,
	    transformRequest: defaults.transformRequest,
	    transformResponse: defaults.transformResponse
	  }, config);
<<<<<<< HEAD
	
	  // Don't allow overriding defaults.withCredentials
	  config.withCredentials = config.withCredentials || defaults.withCredentials;
	
	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);
	
	  axios.interceptors.request.forEach(function (interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  axios.interceptors.response.forEach(function (interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }
	
	  return promise;
	};
	
	// Expose defaults
	axios.defaults = defaults;
	
=======

	  // Don't allow overriding defaults.withCredentials
	  config.withCredentials = config.withCredentials || defaults.withCredentials;

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  axios.interceptors.request.forEach(function (interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  axios.interceptors.response.forEach(function (interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	// Expose defaults
	axios.defaults = defaults;

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	// Expose all/spread
	axios.all = function (promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(13);
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	// Expose interceptors
	axios.interceptors = {
	  request: new InterceptorManager(),
	  response: new InterceptorManager()
	};
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	// Provide aliases for supported request methods
	(function () {
	  function createShortMethods() {
	    utils.forEach(arguments, function (method) {
	      axios[method] = function (url, config) {
	        return axios(utils.merge(config || {}, {
	          method: method,
	          url: url
	        }));
	      };
	    });
	  }
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  function createShortMethodsWithData() {
	    utils.forEach(arguments, function (method) {
	      axios[method] = function (url, data, config) {
	        return axios(utils.merge(config || {}, {
	          method: method,
	          url: url,
	          data: data
	        }));
	      };
	    });
	  }
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  createShortMethods('delete', 'get', 'head');
	  createShortMethodsWithData('post', 'put', 'patch');
	})();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
<<<<<<< HEAD
	
	var utils = __webpack_require__(3);
	
=======

	var utils = __webpack_require__(3);

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/json'
	};
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	module.exports = {
	  transformRequest: [function (data, headers) {
	    if(utils.isFormData(data)) {
	      return data;
	    }
	    if (utils.isArrayBuffer(data)) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isObject(data) && !utils.isFile(data) && !utils.isBlob(data)) {
	      // Set application/json if no Content-Type has been specified
	      if (!utils.isUndefined(headers)) {
	        utils.forEach(headers, function (val, key) {
	          if (key.toLowerCase() === 'content-type') {
	            headers['Content-Type'] = val;
	          }
	        });
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	        if (utils.isUndefined(headers['Content-Type'])) {
	          headers['Content-Type'] = 'application/json;charset=utf-8';
	        }
	      }
	      return JSON.stringify(data);
	    }
	    return data;
	  }],
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  transformResponse: [function (data) {
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*'
	    },
	    patch: utils.merge(DEFAULT_CONTENT_TYPE),
	    post: utils.merge(DEFAULT_CONTENT_TYPE),
	    put: utils.merge(DEFAULT_CONTENT_TYPE)
	  },
<<<<<<< HEAD
	
	  timeout: 0,
	
=======

	  timeout: 0,

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN'
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
<<<<<<< HEAD
	
	/*global toString:true*/
	
	// utils is a library of generic helper functions non-specific to axios
	
	var toString = Object.prototype.toString;
	
=======

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return toString.call(val) === '[object FormData]';
	}
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    return ArrayBuffer.isView(val);
	  } else {
	    return (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	}
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Determine if a value is an Arguments object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Arguments object, otherwise false
	 */
	function isArguments(val) {
	  return toString.call(val) === '[object Arguments]';
	}
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createelement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array or arguments callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }
<<<<<<< HEAD
	
	  // Check if obj is array-like
	  var isArrayLike = isArray(obj) || isArguments(obj);
	
=======

	  // Check if obj is array-like
	  var isArrayLike = isArray(obj) || isArguments(obj);

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArrayLike) {
	    obj = [obj];
	  }
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  // Iterate over array values
	  if (isArrayLike) {
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  }
	  // Iterate over object keys
	  else {
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/*obj1, obj2, obj3, ...*/) {
	  var result = {};
	  forEach(arguments, function (obj) {
	    forEach(obj, function (val, key) {
	      result[key] = val;
	    });
	  });
	  return result;
	}
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  trim: trim
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Dispatch a request to the server using whichever adapter
	 * is supported by the current environment.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  return new Promise(function (resolve, reject) {
	    try {
	      // For browsers use XHR adapter
	      if ((typeof XMLHttpRequest !== 'undefined') || (typeof ActiveXObject !== 'undefined')) {
	        __webpack_require__(6)(resolve, reject, config);
	      }
	      // For node use HTTP adapter
	      else if (typeof process !== 'undefined') {
	        __webpack_require__(6)(resolve, reject, config);
	      }
	    } catch (e) {
	      reject(e);
	    }
	  });
	};
<<<<<<< HEAD
	
	
=======


>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 5 */
/***/ function(module, exports) {

	// shim for using process in browser
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
<<<<<<< HEAD
	
	function noop() {}
	
=======

	function noop() {}

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
<<<<<<< HEAD
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
=======

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
<<<<<<< HEAD
	
	/*global ActiveXObject:true*/
	
=======

	/*global ActiveXObject:true*/

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	var defaults = __webpack_require__(2);
	var utils = __webpack_require__(3);
	var buildUrl = __webpack_require__(7);
	var parseHeaders = __webpack_require__(8);
	var transformData = __webpack_require__(9);
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	module.exports = function xhrAdapter(resolve, reject, config) {
	  // Transform request data
	  var data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  // Merge headers
	  var requestHeaders = utils.merge(
	    defaults.headers.common,
	    defaults.headers[config.method] || {},
	    config.headers || {}
	  );
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  if (utils.isFormData(data)) {
	    // Content-Type needs to be sent in all requests so the mapping template can be applied
	    //delete requestHeaders['Content-Type']; // Let the browser set it
	  }
<<<<<<< HEAD
	
	  // Create the request
	  var request = new (XMLHttpRequest || ActiveXObject)('Microsoft.XMLHTTP');
	  request.open(config.method.toUpperCase(), buildUrl(config.url, config.params), true);
	
	  // Set the request timeout in MS
	  request.timeout = config.timeout;
	
=======

	  // Create the request
	  var request = new (XMLHttpRequest || ActiveXObject)('Microsoft.XMLHTTP');
	  request.open(config.method.toUpperCase(), buildUrl(config.url, config.params), true);

	  // Set the request timeout in MS
	  request.timeout = config.timeout;

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  // Listen for ready state
	  request.onreadystatechange = function () {
	    if (request && request.readyState === 4) {
	      // Prepare the response
	      var responseHeaders = parseHeaders(request.getAllResponseHeaders());
	      var responseData = ['text', ''].indexOf(config.responseType || '') !== -1 ? request.responseText : request.response;
	      var response = {
	        data: transformData(
	          responseData,
	          responseHeaders,
	          config.transformResponse
	        ),
	        status: request.status,
	        statusText: request.statusText,
	        headers: responseHeaders,
	        config: config
	      };
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	      // Resolve or reject the Promise based on the status
	      (request.status >= 200 && request.status < 300 ?
	        resolve :
	        reject)(response);
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	      // Clean up request
	      request = null;
	    }
	  };
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  // Add xsrf header
	  // This is only done if running in a standard browser environment.
	  // Specifically not if we're in a web worker, or react-native.
	  if (utils.isStandardBrowserEnv()) {
	    var cookies = __webpack_require__(10);
	    var urlIsSameOrigin = __webpack_require__(11);
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	    // Add xsrf header
	    var xsrfValue = urlIsSameOrigin(config.url) ?
	        cookies.read(config.xsrfCookieName || defaults.xsrfCookieName) :
	        undefined;
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	    if (xsrfValue) {
	      requestHeaders[config.xsrfHeaderName || defaults.xsrfHeaderName] = xsrfValue;
	    }
	  }
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  // Add headers to the request
	  utils.forEach(requestHeaders, function (val, key) {
	    // Remove Content-Type if data is undefined
	    if (!data && key.toLowerCase() === 'content-type') {
	      delete requestHeaders[key];
	    }
	    // Otherwise add header to the request
	    else {
	      request.setRequestHeader(key, val);
	    }
	  });
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  // Add withCredentials to request if needed
	  if (config.withCredentials) {
	    request.withCredentials = true;
	  }
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  // Add responseType to request if needed
	  if (config.responseType) {
	    try {
	      request.responseType = config.responseType;
	    } catch (e) {
	      if (request.responseType !== 'json') {
	        throw e;
	      }
	    }
	  }
<<<<<<< HEAD
	
	  if (utils.isArrayBuffer(data)) {
	    data = new DataView(data);
	  }
	
=======

	  if (utils.isArrayBuffer(data)) {
	    data = new DataView(data);
	  }

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  // Send the request
	  request.send(data);
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
<<<<<<< HEAD
	
	var utils = __webpack_require__(3);
	
=======

	var utils = __webpack_require__(3);

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildUrl(url, params) {
	  if (!params) {
	    return url;
	  }
<<<<<<< HEAD
	
	  var parts = [];
	
=======

	  var parts = [];

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  utils.forEach(params, function (val, key) {
	    if (val === null || typeof val === 'undefined') {
	      return;
	    }
<<<<<<< HEAD
	
	    if (utils.isArray(val)) {
	      key = key + '[]';
	    }
	
	    if (!utils.isArray(val)) {
	      val = [val];
	    }
	
=======

	    if (utils.isArray(val)) {
	      key = key + '[]';
	    }

	    if (!utils.isArray(val)) {
	      val = [val];
	    }

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	    utils.forEach(val, function (v) {
	      if (utils.isDate(v)) {
	        v = v.toISOString();
	      }
	      else if (utils.isObject(v)) {
	        v = JSON.stringify(v);
	      }
	      parts.push(encode(key) + '=' + encode(v));
	    });
	  });
<<<<<<< HEAD
	
	  if (parts.length > 0) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&');
	  }
	
=======

	  if (parts.length > 0) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&');
	  }

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  return url;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
<<<<<<< HEAD
	
	var utils = __webpack_require__(3);
	
=======

	var utils = __webpack_require__(3);

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {}, key, val, i;
<<<<<<< HEAD
	
	  if (!headers) { return parsed; }
	
=======

	  if (!headers) { return parsed; }

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  utils.forEach(headers.split('\n'), function(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  return parsed;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
<<<<<<< HEAD
	
	var utils = __webpack_require__(3);
	
=======

	var utils = __webpack_require__(3);

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  utils.forEach(fns, function (fn) {
	    data = fn(data, headers);
	  });
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  return data;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * WARNING:
	 *  This file makes references to objects that aren't safe in all environments.
	 *  Please see lib/utils.isStandardBrowserEnv before including this file.
	 */
<<<<<<< HEAD
	
	var utils = __webpack_require__(3);
	
=======

	var utils = __webpack_require__(3);

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	module.exports = {
	  write: function write(name, value, expires, path, domain, secure) {
	    var cookie = [];
	    cookie.push(name + '=' + encodeURIComponent(value));
<<<<<<< HEAD
	
	    if (utils.isNumber(expires)) {
	      cookie.push('expires=' + new Date(expires).toGMTString());
	    }
	
	    if (utils.isString(path)) {
	      cookie.push('path=' + path);
	    }
	
	    if (utils.isString(domain)) {
	      cookie.push('domain=' + domain);
	    }
	
	    if (secure === true) {
	      cookie.push('secure');
	    }
	
	    document.cookie = cookie.join('; ');
	  },
	
=======

	    if (utils.isNumber(expires)) {
	      cookie.push('expires=' + new Date(expires).toGMTString());
	    }

	    if (utils.isString(path)) {
	      cookie.push('path=' + path);
	    }

	    if (utils.isString(domain)) {
	      cookie.push('domain=' + domain);
	    }

	    if (secure === true) {
	      cookie.push('secure');
	    }

	    document.cookie = cookie.join('; ');
	  },

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  read: function read(name) {
	    var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	    return (match ? decodeURIComponent(match[3]) : null);
	  },
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  remove: function remove(name) {
	    this.write(name, '', Date.now() - 86400000);
	  }
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * WARNING:
	 *  This file makes references to objects that aren't safe in all environments.
	 *  Please see lib/utils.isStandardBrowserEnv before including this file.
	 */
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	var utils = __webpack_require__(3);
	var msie = /(msie|trident)/i.test(navigator.userAgent);
	var urlParsingNode = document.createElement('a');
	var originUrl;
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Parse a URL to discover it's components
	 *
	 * @param {String} url The URL to be parsed
	 * @returns {Object}
	 */
	function urlResolve(url) {
	  var href = url;
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  if (msie) {
	    // IE needs attribute set twice to normalize properties
	    urlParsingNode.setAttribute('href', href);
	    href = urlParsingNode.href;
	  }
<<<<<<< HEAD
	
	  urlParsingNode.setAttribute('href', href);
	
=======

	  urlParsingNode.setAttribute('href', href);

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	  // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	  return {
	    href: urlParsingNode.href,
	    protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	    host: urlParsingNode.host,
	    search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	    hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	    hostname: urlParsingNode.hostname,
	    port: urlParsingNode.port,
	    pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	              urlParsingNode.pathname :
	              '/' + urlParsingNode.pathname
	  };
	}
<<<<<<< HEAD
	
	originUrl = urlResolve(window.location.href);
	
=======

	originUrl = urlResolve(window.location.href);

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Determine if a URL shares the same origin as the current location
	 *
	 * @param {String} requestUrl The URL to test
	 * @returns {boolean} True if URL shares the same origin, otherwise false
	 */
	module.exports = function urlIsSameOrigin(requestUrl) {
	  var parsed = (utils.isString(requestUrl)) ? urlResolve(requestUrl) : requestUrl;
	  return (parsed.protocol === originUrl.protocol &&
	        parsed.host === originUrl.host);
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
<<<<<<< HEAD
	
	var utils = __webpack_require__(3);
	
	function InterceptorManager() {
	  this.handlers = [];
	}
	
=======

	var utils = __webpack_require__(3);

	function InterceptorManager() {
	  this.handlers = [];
	}

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function (fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function (id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `remove`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function (fn) {
	  utils.forEach(this.handlers, function (h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	module.exports = InterceptorManager;


/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
<<<<<<< HEAD
	
=======

>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function (arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ }
/******/ ])
});
;
<<<<<<< HEAD
//# sourceMappingURL=axios.map
=======
//# sourceMappingURL=axios.map
>>>>>>> 2a385fa14d9871e819487b314e17638a75c4806a
