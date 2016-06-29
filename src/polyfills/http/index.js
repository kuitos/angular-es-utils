/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-06-23
 */

import angular from 'angular';

const isString = angular.isString;
const isObject = angular.isObject;
const forEach = angular.forEach;
const isUndefined = angular.isUndefined;
const fromJson = angular.fromJson;

var APPLICATION_JSON = 'application/json';
var CONTENT_TYPE_APPLICATION_JSON = {'Content-Type': APPLICATION_JSON + ';charset=utf-8'};
var JSON_START = /^\[|^\{(?!\{)/;
var JSON_ENDS = {
	'[': /]$/,
	'{': /}$/
};
var JSON_PROTECTION_PREFIX = /^\)\]\}',?\n/;

function defaultHttpResponseTransform(data, headers) {
	if (isString(data)) {
		// Strip json vulnerability protection prefix and trim whitespace
		var tempData = data.replace(JSON_PROTECTION_PREFIX, '').trim();

		if (tempData) {
			var contentType = headers('Content-Type');
			if ((contentType && (contentType.indexOf(APPLICATION_JSON) === 0)) || isJsonLike(tempData)) {
				data = fromJson(tempData);
			}
		}
	}

	return data;
}

function isJsonLike(str) {
	var jsonStart = str.match(JSON_START);
	return jsonStart && JSON_ENDS[jsonStart[0]].test(str);
}

function parseHeaders(headers) {
	var parsed = createMap(), i;

	function fillInParsed(key, val) {
		if (key) {
			parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
		}
	}

	if (isString(headers)) {
		forEach(headers.split('\n'), function (line) {
			i = line.indexOf(':');
			fillInParsed(lowercase(trim(line.substr(0, i))), trim(line.substr(i + 1)));
		});
	} else if (isObject(headers)) {
		forEach(headers, function (headerVal, headerKey) {
			fillInParsed(lowercase(headerKey), trim(headerVal));
		});
	}

	return parsed;
}

function headersGetter(headers) {
	var headersObj;

	return function (name) {
		if (!headersObj) headersObj = parseHeaders(headers);

		if (name) {
			var value = headersObj[lowercase(name)];
			if (value === void 0) {
				value = null;
			}
			return value;
		}

		return headersObj;
	};
}

function transformData(data, headers, status, fns) {
	if (isFunction(fns)) {
		return fns(data, headers, status);
	}

	forEach(fns, function (fn) {
		data = fn(data, headers, status);
	});

	return data;
}

function isSuccess(status) {
	return 200 <= status && status < 300;
}

/**
 * @ngdoc provider
 * @name $httpProvider
 * @description
 * Use `$httpProvider` to change the default behavior of the {@link ng.$http $http} service.
 * */
function $HttpProvider() {

	var defaults = this.defaults = {
		// transform incoming response data
		transformResponse: [defaultHttpResponseTransform],

		// transform outgoing request data
		transformRequest: [function (d) {
			return isObject(d) && !isFile(d) && !isBlob(d) && !isFormData(d) ? toJson(d) : d;
		}],

		// default headers
		headers: {
			common: {
				'Accept': 'application/json, text/plain, */*'
			},
			post: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
			put: shallowCopy(CONTENT_TYPE_APPLICATION_JSON),
			patch: shallowCopy(CONTENT_TYPE_APPLICATION_JSON)
		},

		xsrfCookieName: 'XSRF-TOKEN',
		xsrfHeaderName: 'X-XSRF-TOKEN',

		paramSerializer: '$httpParamSerializer'
	};

	var useApplyAsync = false;
	this.useApplyAsync = function (value) {
		if (isDefined(value)) {
			useApplyAsync = !!value;
			return this;
		}
		return useApplyAsync;
	};

	var useLegacyPromise = true;
	this.useLegacyPromiseExtensions = function (value) {
		if (isDefined(value)) {
			useLegacyPromise = !!value;
			return this;
		}
		return useLegacyPromise;
	};

	var interceptorFactories = this.interceptors = [];

	this.$get = ['$httpBackend', '$$cookieReader', '$cacheFactory', '$rootScope', '$q', '$injector',
		function ($httpBackend, $$cookieReader, $cacheFactory, $rootScope, $q, $injector) {

			var defaultCache = $cacheFactory('$http');

			/**
			 * Make sure that default param serializer is exposed as a function
			 */
			defaults.paramSerializer = isString(defaults.paramSerializer) ?
				$injector.get(defaults.paramSerializer) : defaults.paramSerializer;

			/**
			 * Interceptors stored in reverse order. Inner interceptors before outer interceptors.
			 * The reversal is needed so that we can build up the interception chain around the
			 * server request.
			 */
			var reversedInterceptors = [];

			forEach(interceptorFactories, function (interceptorFactory) {
				reversedInterceptors.unshift(isString(interceptorFactory)
					? $injector.get(interceptorFactory) : $injector.invoke(interceptorFactory));
			});

			function $http(requestConfig) {

				if (!isObject(requestConfig)) {
					throw minErr('$http')('badreq', 'Http request configuration must be an object.  Received: {0}', requestConfig);
				}

				if (!isString(requestConfig.url)) {
					throw minErr('$http')('badreq', 'Http request configuration url must be a string.  Received: {0}', requestConfig.url);
				}

				var config = extend({
					method: 'get',
					transformRequest: defaults.transformRequest,
					transformResponse: defaults.transformResponse,
					paramSerializer: defaults.paramSerializer
				}, requestConfig);

				config.headers = mergeHeaders(requestConfig);
				config.method = uppercase(config.method);
				config.paramSerializer = isString(config.paramSerializer) ?
					$injector.get(config.paramSerializer) : config.paramSerializer;

				var serverRequest = function (config) {
					var headers = config.headers;
					var reqData = transformData(config.data, headersGetter(headers), undefined, config.transformRequest);

					// strip content-type if data is undefined
					if (isUndefined(reqData)) {
						forEach(headers, function (value, header) {
							if (lowercase(header) === 'content-type') {
								delete headers[header];
							}
						});
					}

					if (isUndefined(config.withCredentials) && !isUndefined(defaults.withCredentials)) {
						config.withCredentials = defaults.withCredentials;
					}

					// send request
					return sendReq(config, reqData).then(transformResponse, transformResponse);
				};

				var chain = [serverRequest, undefined];
				var promise = $q.when(config);

				// apply interceptors
				forEach(reversedInterceptors, function (interceptor) {
					if (interceptor.request || interceptor.requestError) {
						chain.unshift(interceptor.request, interceptor.requestError);
					}
					if (interceptor.response || interceptor.responseError) {
						chain.push(interceptor.response, interceptor.responseError);
					}
				});

				while (chain.length) {
					var thenFn = chain.shift();
					var rejectFn = chain.shift();

					promise = promise.then(thenFn, rejectFn);
				}

				if (useLegacyPromise) {
					promise.success = function (fn) {
						assertArgFn(fn, 'fn');

						promise.then(function (response) {
							fn(response.data, response.status, response.headers, config);
						});
						return promise;
					};

					promise.error = function (fn) {
						assertArgFn(fn, 'fn');

						promise.then(null, function (response) {
							fn(response.data, response.status, response.headers, config);
						});
						return promise;
					};
				} else {
					promise.success = $httpMinErrLegacyFn('success');
					promise.error = $httpMinErrLegacyFn('error');
				}

				return promise;

				function transformResponse(response) {
					// make a copy since the response must be cacheable
					var resp = extend({}, response);
					resp.data = transformData(response.data, response.headers, response.status,
						config.transformResponse);
					return (isSuccess(response.status))
						? resp
						: $q.reject(resp);
				}

				function executeHeaderFns(headers, config) {
					var headerContent, processedHeaders = {};

					forEach(headers, function (headerFn, header) {
						if (isFunction(headerFn)) {
							headerContent = headerFn(config);
							if (headerContent != null) {
								processedHeaders[header] = headerContent;
							}
						} else {
							processedHeaders[header] = headerFn;
						}
					});

					return processedHeaders;
				}

				function mergeHeaders(config) {
					var defHeaders = defaults.headers,
						reqHeaders = extend({}, config.headers),
						defHeaderName, lowercaseDefHeaderName, reqHeaderName;

					defHeaders = extend({}, defHeaders.common, defHeaders[lowercase(config.method)]);

					// using for-in instead of forEach to avoid unnecessary iteration after header has been found
					defaultHeadersIteration:
						for (defHeaderName in defHeaders) {
							lowercaseDefHeaderName = lowercase(defHeaderName);

							for (reqHeaderName in reqHeaders) {
								if (lowercase(reqHeaderName) === lowercaseDefHeaderName) {
									continue defaultHeadersIteration;
								}
							}

							reqHeaders[defHeaderName] = defHeaders[defHeaderName];
						}

					// execute if header value is a function for merged headers
					return executeHeaderFns(reqHeaders, shallowCopy(config));
				}
			}

			$http.pendingRequests = [];

			createShortMethods('get', 'delete', 'head', 'jsonp');

			createShortMethodsWithData('post', 'put', 'patch');

			$http.defaults = defaults;

			return $http;

			function createShortMethods(names) {
				forEach(arguments, function (name) {
					$http[name] = function (url, config) {
						return $http(extend({}, config || {}, {
							method: name,
							url: url
						}));
					};
				});
			}

			function createShortMethodsWithData(name) {
				forEach(arguments, function (name) {
					$http[name] = function (url, data, config) {
						return $http(extend({}, config || {}, {
							method: name,
							url: url,
							data: data
						}));
					};
				});
			}

			/**
			 * Makes the request.
			 *
			 * !!! ACCESSES CLOSURE VARS:
			 * $httpBackend, defaults, $log, $rootScope, defaultCache, $http.pendingRequests
			 */
			function sendReq(config, reqData) {
				var deferred = $q.defer(),
					promise = deferred.promise,
					cache,
					cachedResp,
					reqHeaders = config.headers,
					url = buildUrl(config.url, config.paramSerializer(config.params));

				$http.pendingRequests.push(config);
				promise.then(removePendingReq, removePendingReq);

				if ((config.cache || defaults.cache) && config.cache !== false &&
					(config.method === 'GET' || config.method === 'JSONP')) {
					cache = isObject(config.cache) ? config.cache
						: isObject(defaults.cache) ? defaults.cache
						: defaultCache;
				}

				if (cache) {
					cachedResp = cache.get(url);
					if (isDefined(cachedResp)) {
						if (isPromiseLike(cachedResp)) {
							// cached request has already been sent, but there is no response yet
							cachedResp.then(resolvePromiseWithResult, resolvePromiseWithResult);
						} else {
							// serving from cache
							if (isArray(cachedResp)) {
								resolvePromise(cachedResp[1], cachedResp[0], shallowCopy(cachedResp[2]), cachedResp[3]);
							} else {
								resolvePromise(cachedResp, 200, {}, 'OK');
							}
						}
					} else {
						// put the promise for the non-transformed response into cache as a placeholder
						cache.put(url, promise);
					}
				}

				// if we won't have the response in cache, set the xsrf headers and
				// send the request to the backend
				if (isUndefined(cachedResp)) {
					var xsrfValue = urlIsSameOrigin(config.url)
						? $$cookieReader()[config.xsrfCookieName || defaults.xsrfCookieName]
						: undefined;
					if (xsrfValue) {
						reqHeaders[(config.xsrfHeaderName || defaults.xsrfHeaderName)] = xsrfValue;
					}

					$httpBackend(config.method, url, reqData, done, reqHeaders, config.timeout,
						config.withCredentials, config.responseType,
						createApplyHandlers(config.eventHandlers),
						createApplyHandlers(config.uploadEventHandlers));
				}

				return promise;

				function createApplyHandlers(eventHandlers) {
					if (eventHandlers) {
						var applyHandlers = {};
						forEach(eventHandlers, function (eventHandler, key) {
							applyHandlers[key] = function (event) {
								if (useApplyAsync) {
									$rootScope.$applyAsync(callEventHandler);
								} else if ($rootScope.$$phase) {
									callEventHandler();
								} else {
									$rootScope.$apply(callEventHandler);
								}

								function callEventHandler() {
									eventHandler(event);
								}
							};
						});
						return applyHandlers;
					}
				}

				/**
				 * Callback registered to $httpBackend():
				 *  - caches the response if desired
				 *  - resolves the raw $http promise
				 *  - calls $apply
				 */
				function done(status, response, headersString, statusText) {
					if (cache) {
						if (isSuccess(status)) {
							cache.put(url, [status, response, parseHeaders(headersString), statusText]);
						} else {
							// remove promise from the cache
							cache.remove(url);
						}
					}

					function resolveHttpPromise() {
						resolvePromise(response, status, headersString, statusText);
					}

					if (useApplyAsync) {
						$rootScope.$applyAsync(resolveHttpPromise);
					} else {
						resolveHttpPromise();
						if (!$rootScope.$$phase) $rootScope.$apply();
					}
				}

				/**
				 * Resolves the raw $http promise.
				 */
				function resolvePromise(response, status, headers, statusText) {
					//status: HTTP response status code, 0, -1 (aborted by timeout / promise)
					status = status >= -1 ? status : 0;

					(isSuccess(status) ? deferred.resolve : deferred.reject)({
						data: response,
						status: status,
						headers: headersGetter(headers),
						config: config,
						statusText: statusText
					});
				}

				function resolvePromiseWithResult(result) {
					resolvePromise(result.data, result.status, shallowCopy(result.headers()), result.statusText);
				}

				function removePendingReq() {
					var idx = $http.pendingRequests.indexOf(config);
					if (idx !== -1) $http.pendingRequests.splice(idx, 1);
				}
			}

			function buildUrl(url, serializedParams) {
				if (serializedParams.length > 0) {
					url += ((url.indexOf('?') == -1) ? '?' : '&') + serializedParams;
				}
				return url;
			}
		}];
}

export default angular.module('ngUtils.polyfills.http', [])
	.decorator('$http', $httpDecorator)
	.name;
