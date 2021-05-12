/*!
 * TrueJSON: respectful JSON serialization & deserialization for JavaScript v1.0.0-alpha.0
 * https://github.com/nestorrente/true-json
 *
 * Released under the MIT License.
 *
 * Build date: 2021-05-12T19:39:19.198Z
 */
var TrueJSON;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main/json/JsonConverter.ts":
/*!****************************************!*\
  !*** ./src/main/json/JsonConverter.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JsonConverter)
/* harmony export */ });
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _adapter;
class JsonConverter {
    constructor(adapter) {
        _adapter.set(this, void 0);
        __classPrivateFieldSet(this, _adapter, adapter);
    }
    stringify(value, space) {
        return JSON.stringify(__classPrivateFieldGet(this, _adapter).adaptToJson(value), undefined, space);
    }
    parse(text) {
        return __classPrivateFieldGet(this, _adapter).recoverFromJson(JSON.parse(text));
    }
}
_adapter = new WeakMap();


/***/ }),

/***/ "./src/main/json/adapter/JsonAdapters.ts":
/*!***********************************************!*\
  !*** ./src/main/json/adapter/JsonAdapters.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _json_adapter_getIdentityAdapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/json/adapter/getIdentityAdapter */ "./src/main/json/adapter/getIdentityAdapter.ts");
/* harmony import */ var _json_adapter_getISODateAdapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/json/adapter/getISODateAdapter */ "./src/main/json/adapter/getISODateAdapter.ts");
/* harmony import */ var _json_adapter_getDateTimestampAdapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/json/adapter/getDateTimestampAdapter */ "./src/main/json/adapter/getDateTimestampAdapter.ts");
/* harmony import */ var _json_adapter_getArrayJsonAdapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/json/adapter/getArrayJsonAdapter */ "./src/main/json/adapter/getArrayJsonAdapter.ts");
/* harmony import */ var _json_adapter_getSetAdapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/json/adapter/getSetAdapter */ "./src/main/json/adapter/getSetAdapter.ts");
/* harmony import */ var _json_adapter_getRecordAdapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/json/adapter/getRecordAdapter */ "./src/main/json/adapter/getRecordAdapter.ts");
/* harmony import */ var _json_adapter_map_getMapAsEntriesAdapter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/json/adapter/map/getMapAsEntriesAdapter */ "./src/main/json/adapter/map/getMapAsEntriesAdapter.ts");
/* harmony import */ var _json_adapter_map_getMapAsRecordAdapter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/json/adapter/map/getMapAsRecordAdapter */ "./src/main/json/adapter/map/getMapAsRecordAdapter.ts");
/* harmony import */ var _json_adapter_getObjectAdapter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/json/adapter/getObjectAdapter */ "./src/main/json/adapter/getObjectAdapter.ts");
/* harmony import */ var _json_adapter_getByKeyAdapter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/json/adapter/getByKeyAdapter */ "./src/main/json/adapter/getByKeyAdapter.ts");
/* harmony import */ var _json_adapter_getCustomAdapter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/json/adapter/getCustomAdapter */ "./src/main/json/adapter/getCustomAdapter.ts");
/* harmony import */ var _json_adapter_nullish_getNullishAwareCustomAdapter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/json/adapter/nullish/getNullishAwareCustomAdapter */ "./src/main/json/adapter/nullish/getNullishAwareCustomAdapter.ts");












const JsonAdapters = {
    identity: _json_adapter_getIdentityAdapter__WEBPACK_IMPORTED_MODULE_0__.default,
    isoDate: _json_adapter_getISODateAdapter__WEBPACK_IMPORTED_MODULE_1__.default,
    dateTimestamp: _json_adapter_getDateTimestampAdapter__WEBPACK_IMPORTED_MODULE_2__.default,
    array: _json_adapter_getArrayJsonAdapter__WEBPACK_IMPORTED_MODULE_3__.default,
    set: _json_adapter_getSetAdapter__WEBPACK_IMPORTED_MODULE_4__.default,
    record: _json_adapter_getRecordAdapter__WEBPACK_IMPORTED_MODULE_5__.default,
    mapAsEntries: _json_adapter_map_getMapAsEntriesAdapter__WEBPACK_IMPORTED_MODULE_6__.default,
    mapAsRecord: _json_adapter_map_getMapAsRecordAdapter__WEBPACK_IMPORTED_MODULE_7__.default,
    object: _json_adapter_getObjectAdapter__WEBPACK_IMPORTED_MODULE_8__.default,
    byKey: _json_adapter_getByKeyAdapter__WEBPACK_IMPORTED_MODULE_9__.default,
    custom: _json_adapter_getCustomAdapter__WEBPACK_IMPORTED_MODULE_10__.default,
    nullishAwareCustom: _json_adapter_nullish_getNullishAwareCustomAdapter__WEBPACK_IMPORTED_MODULE_11__.default
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (JsonAdapters);


/***/ }),

/***/ "./src/main/json/adapter/exports.ts":
/*!******************************************!*\
  !*** ./src/main/json/adapter/exports.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JsonAdapters": () => (/* reexport safe */ _json_adapter_JsonAdapters__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _json_adapter_JsonAdapters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/json/adapter/JsonAdapters */ "./src/main/json/adapter/JsonAdapters.ts");




/***/ }),

/***/ "./src/main/json/adapter/getArrayJsonAdapter.ts":
/*!******************************************************!*\
  !*** ./src/main/json/adapter/getArrayJsonAdapter.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getArrayJsonAdapter)
/* harmony export */ });
/* harmony import */ var _json_adapter_nullish_getNullishAwareCustomAdapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/json/adapter/nullish/getNullishAwareCustomAdapter */ "./src/main/json/adapter/nullish/getNullishAwareCustomAdapter.ts");

function getArrayJsonAdapter(elementAdapter) {
    return (0,_json_adapter_nullish_getNullishAwareCustomAdapter__WEBPACK_IMPORTED_MODULE_0__.default)({
        adaptToJson(array) {
            return array.map(e => elementAdapter.adaptToJson(e));
        },
        recoverFromJson(jsonArray) {
            return jsonArray.map(e => elementAdapter.recoverFromJson(e));
        }
    });
}


/***/ }),

/***/ "./src/main/json/adapter/getByKeyAdapter.ts":
/*!**************************************************!*\
  !*** ./src/main/json/adapter/getByKeyAdapter.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getByKeyAdapter)
/* harmony export */ });
function getByKeyAdapter(keyValuePairs, fallbackKey) {
    return {
        adaptToJson(value) {
            const entry = Object.entries(keyValuePairs).find(([, entryValue]) => value === entryValue);
            if (!entry) {
                return fallbackKey;
            }
            const [key] = entry;
            return key;
        },
        recoverFromJson(key) {
            if (key != null && keyValuePairs.hasOwnProperty(key)) {
                return keyValuePairs[key];
            }
            else if (fallbackKey != null) {
                return keyValuePairs[fallbackKey];
            }
            else {
                return undefined;
            }
        }
    };
}


/***/ }),

/***/ "./src/main/json/adapter/getCustomAdapter.ts":
/*!***************************************************!*\
  !*** ./src/main/json/adapter/getCustomAdapter.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCustomAdapter)
/* harmony export */ });
// This method exists only for type inference purposes
function getCustomAdapter(adapter) {
    return adapter;
}


/***/ }),

/***/ "./src/main/json/adapter/getDateTimestampAdapter.ts":
/*!**********************************************************!*\
  !*** ./src/main/json/adapter/getDateTimestampAdapter.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDateTimestampAdapter)
/* harmony export */ });
/* harmony import */ var _json_adapter_nullish_getNullishAwareCustomAdapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/json/adapter/nullish/getNullishAwareCustomAdapter */ "./src/main/json/adapter/nullish/getNullishAwareCustomAdapter.ts");

function getDateTimestampAdapter() {
    return (0,_json_adapter_nullish_getNullishAwareCustomAdapter__WEBPACK_IMPORTED_MODULE_0__.default)({
        adaptToJson(date) {
            return date.getTime();
        },
        recoverFromJson(timestamp) {
            return new Date(timestamp);
        }
    });
}


/***/ }),

/***/ "./src/main/json/adapter/getISODateAdapter.ts":
/*!****************************************************!*\
  !*** ./src/main/json/adapter/getISODateAdapter.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getISODateAdapter)
/* harmony export */ });
/* harmony import */ var _json_adapter_nullish_getNullishAwareCustomAdapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/json/adapter/nullish/getNullishAwareCustomAdapter */ "./src/main/json/adapter/nullish/getNullishAwareCustomAdapter.ts");

function getISODateAdapter() {
    return (0,_json_adapter_nullish_getNullishAwareCustomAdapter__WEBPACK_IMPORTED_MODULE_0__.default)({
        adaptToJson(date) {
            return date.toJSON();
        },
        recoverFromJson(isoDateText) {
            return new Date(isoDateText);
        }
    });
}


/***/ }),

/***/ "./src/main/json/adapter/getIdentityAdapter.ts":
/*!*****************************************************!*\
  !*** ./src/main/json/adapter/getIdentityAdapter.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getIdentityAdapter)
/* harmony export */ });
function getIdentityAdapter() {
    return {
        adaptToJson: v => v,
        recoverFromJson: v => v
    };
}


/***/ }),

/***/ "./src/main/json/adapter/getObjectAdapter.ts":
/*!***************************************************!*\
  !*** ./src/main/json/adapter/getObjectAdapter.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getObjectAdapter)
/* harmony export */ });
/* harmony import */ var _json_adapter_nullish_getNullishAwareCustomAdapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/json/adapter/nullish/getNullishAwareCustomAdapter */ "./src/main/json/adapter/nullish/getNullishAwareCustomAdapter.ts");

function getObjectAdapter(propertyAdapters, config) {
    const fullConfig = getFullConfig(config);
    return (0,_json_adapter_nullish_getNullishAwareCustomAdapter__WEBPACK_IMPORTED_MODULE_0__.default)({
        adaptToJson(object) {
            const mappedEntries = getObjectEntries(object, propertyAdapters, fullConfig)
                .map(([key, value]) => {
                const adapter = propertyAdapters[key];
                return [key, adapter ? adapter.adaptToJson(value) : value];
            });
            return Object.fromEntries(mappedEntries);
        },
        recoverFromJson(jsonObject) {
            const mappedEntries = getObjectEntries(jsonObject, propertyAdapters, fullConfig)
                .map(([key, value]) => {
                const adapter = propertyAdapters[key];
                return [key, adapter ? adapter.recoverFromJson(value) : value];
            });
            return Object.fromEntries(mappedEntries);
        }
    });
}
function getFullConfig(partialConfig) {
    return Object.assign({ omitUnmappedProperties: false, omittedProperties: [] }, partialConfig);
}
function getObjectEntries(object, propertyAdapters, config) {
    const { omitUnmappedProperties, omittedProperties } = config;
    const entries = Object.entries(object);
    if (!omitUnmappedProperties && omittedProperties.length === 0) {
        return entries;
    }
    return entries.filter(([key]) => !shouldPropertyBeIgnored(key, propertyAdapters, config));
}
function shouldPropertyBeIgnored(propertyName, propertyAdapters, config) {
    return isIgnoredProperty(propertyName, config)
        || config.omitUnmappedProperties && isUnmappedProperty(propertyName, propertyAdapters);
}
function isIgnoredProperty(propertyName, config) {
    const { omittedProperties } = config;
    return omittedProperties.includes(propertyName);
}
function isUnmappedProperty(propertyName, propertyAdapters) {
    return !propertyAdapters.hasOwnProperty(propertyName);
}


/***/ }),

/***/ "./src/main/json/adapter/getRecordAdapter.ts":
/*!***************************************************!*\
  !*** ./src/main/json/adapter/getRecordAdapter.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getRecordAdapter)
/* harmony export */ });
/* harmony import */ var _json_adapter_nullish_getNullishAwareCustomAdapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/json/adapter/nullish/getNullishAwareCustomAdapter */ "./src/main/json/adapter/nullish/getNullishAwareCustomAdapter.ts");

function getRecordAdapter(valueAdapter) {
    return (0,_json_adapter_nullish_getNullishAwareCustomAdapter__WEBPACK_IMPORTED_MODULE_0__.default)({
        adaptToJson(object) {
            const mappedEntries = Object.entries(object)
                .map(([key, value]) => {
                return [key, valueAdapter.adaptToJson(value)];
            });
            return Object.fromEntries(mappedEntries);
        },
        recoverFromJson(jsonObject) {
            const mappedEntries = Object.entries(jsonObject)
                .map(([key, value]) => {
                return [key, valueAdapter.recoverFromJson(value)];
            });
            return Object.fromEntries(mappedEntries);
        }
    });
}


/***/ }),

/***/ "./src/main/json/adapter/getSetAdapter.ts":
/*!************************************************!*\
  !*** ./src/main/json/adapter/getSetAdapter.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getSetAdapter)
/* harmony export */ });
/* harmony import */ var _json_adapter_getArrayJsonAdapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/json/adapter/getArrayJsonAdapter */ "./src/main/json/adapter/getArrayJsonAdapter.ts");
/* harmony import */ var _json_adapter_getIdentityAdapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/json/adapter/getIdentityAdapter */ "./src/main/json/adapter/getIdentityAdapter.ts");
/* harmony import */ var _json_adapter_nullish_getNullishAwareCustomAdapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/json/adapter/nullish/getNullishAwareCustomAdapter */ "./src/main/json/adapter/nullish/getNullishAwareCustomAdapter.ts");



function getSetAdapter(elementAdapter = (0,_json_adapter_getIdentityAdapter__WEBPACK_IMPORTED_MODULE_1__.default)()) {
    const arrayAdapter = (0,_json_adapter_getArrayJsonAdapter__WEBPACK_IMPORTED_MODULE_0__.default)(elementAdapter);
    return (0,_json_adapter_nullish_getNullishAwareCustomAdapter__WEBPACK_IMPORTED_MODULE_2__.default)({
        adaptToJson(set) {
            return arrayAdapter.adaptToJson([...set]);
        },
        recoverFromJson(jsonArray) {
            return new Set(arrayAdapter.recoverFromJson(jsonArray));
        }
    });
}


/***/ }),

/***/ "./src/main/json/adapter/map/getMapAsEntriesAdapter.ts":
/*!*************************************************************!*\
  !*** ./src/main/json/adapter/map/getMapAsEntriesAdapter.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getMapAsEntriesAdapter)
/* harmony export */ });
/* harmony import */ var _json_adapter_getArrayJsonAdapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/json/adapter/getArrayJsonAdapter */ "./src/main/json/adapter/getArrayJsonAdapter.ts");
/* harmony import */ var _json_adapter_getIdentityAdapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/json/adapter/getIdentityAdapter */ "./src/main/json/adapter/getIdentityAdapter.ts");
/* harmony import */ var _json_adapter_nullish_getNullishAwareCustomAdapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/json/adapter/nullish/getNullishAwareCustomAdapter */ "./src/main/json/adapter/nullish/getNullishAwareCustomAdapter.ts");



function getMapAsEntriesAdapter(config) {
    var _a, _b;
    const keyAdapter = (_a = config === null || config === void 0 ? void 0 : config.keyAdapter) !== null && _a !== void 0 ? _a : (0,_json_adapter_getIdentityAdapter__WEBPACK_IMPORTED_MODULE_1__.default)();
    const valueAdapter = (_b = config === null || config === void 0 ? void 0 : config.valueAdapter) !== null && _b !== void 0 ? _b : (0,_json_adapter_getIdentityAdapter__WEBPACK_IMPORTED_MODULE_1__.default)();
    const entryAdapter = (0,_json_adapter_getArrayJsonAdapter__WEBPACK_IMPORTED_MODULE_0__.default)({
        adaptToJson(entry) {
            const [key, value] = entry;
            return [
                keyAdapter.adaptToJson(key),
                valueAdapter.adaptToJson(value)
            ];
        },
        recoverFromJson(jsonEntry) {
            const [jsonKey, jsonValue] = jsonEntry;
            return [
                keyAdapter.recoverFromJson(jsonKey),
                valueAdapter.recoverFromJson(jsonValue)
            ];
        }
    });
    return (0,_json_adapter_nullish_getNullishAwareCustomAdapter__WEBPACK_IMPORTED_MODULE_2__.default)({
        adaptToJson(map) {
            return entryAdapter.adaptToJson([...map]);
        },
        recoverFromJson(jsonArray) {
            return new Map(entryAdapter.recoverFromJson(jsonArray));
        }
    });
}


/***/ }),

/***/ "./src/main/json/adapter/map/getMapAsRecordAdapter.ts":
/*!************************************************************!*\
  !*** ./src/main/json/adapter/map/getMapAsRecordAdapter.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getMapAsRecordAdapter)
/* harmony export */ });
/* harmony import */ var _json_adapter_map_getMapAsEntriesAdapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/json/adapter/map/getMapAsEntriesAdapter */ "./src/main/json/adapter/map/getMapAsEntriesAdapter.ts");
/* harmony import */ var _json_adapter_nullish_getNullishAwareCustomAdapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/json/adapter/nullish/getNullishAwareCustomAdapter */ "./src/main/json/adapter/nullish/getNullishAwareCustomAdapter.ts");


function getMapAsRecordAdapter(config) {
    const mapAsEntriesAdapter = (0,_json_adapter_map_getMapAsEntriesAdapter__WEBPACK_IMPORTED_MODULE_0__.default)(config);
    return (0,_json_adapter_nullish_getNullishAwareCustomAdapter__WEBPACK_IMPORTED_MODULE_1__.default)({
        adaptToJson(map) {
            const adaptedEntries = mapAsEntriesAdapter.adaptToJson(map);
            return Object.fromEntries(adaptedEntries);
        },
        recoverFromJson(jsonObject) {
            const entries = Object.entries(jsonObject);
            return mapAsEntriesAdapter.recoverFromJson(entries);
        }
    });
}


/***/ }),

/***/ "./src/main/json/adapter/nullish/getNullishAwareCustomAdapter.ts":
/*!***********************************************************************!*\
  !*** ./src/main/json/adapter/nullish/getNullishAwareCustomAdapter.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNullishAwareCustomAdapter)
/* harmony export */ });
function getNullishAwareCustomAdapter(adapter) {
    return {
        adaptToJson(value) {
            if (value == null) {
                return value;
            }
            return adapter.adaptToJson(value);
        },
        recoverFromJson(value) {
            if (value == null) {
                return value;
            }
            return adapter.recoverFromJson(value);
        }
    };
}


/***/ }),

/***/ "./src/main/json/exports.ts":
/*!**********************************!*\
  !*** ./src/main/json/exports.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JsonAdapters": () => (/* reexport safe */ _adapter_exports__WEBPACK_IMPORTED_MODULE_1__.JsonAdapters),
/* harmony export */   "JsonConverter": () => (/* reexport safe */ _json_JsonConverter__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _json_JsonConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/json/JsonConverter */ "./src/main/json/JsonConverter.ts");
/* harmony import */ var _adapter_exports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adapter/exports */ "./src/main/json/adapter/exports.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./src/main/json/types.ts");






/***/ }),

/***/ "./src/main/json/types.ts":
/*!********************************!*\
  !*** ./src/main/json/types.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/main/standalone-entry.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _json_exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json/exports */ "./src/main/json/exports.ts");


const TrueJSON = {
    JsonConverter: _json_exports__WEBPACK_IMPORTED_MODULE_0__.JsonConverter,
    JsonAdapters: _json_exports__WEBPACK_IMPORTED_MODULE_0__.JsonAdapters
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TrueJSON);

})();

TrueJSON = __webpack_exports__.default;
/******/ })()
;
//# sourceMappingURL=true-json.js.map