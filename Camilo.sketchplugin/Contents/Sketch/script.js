var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/analytics.js":
/*!**************************!*\
  !*** ./src/analytics.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return googleAnalytics; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* globals NSUUID, __command, NSURLSession, NSURL, NSString, NSUserDefaults */

var trackingID = 'UA-128191866-1';
var uuidKey = 'google.analytics.uuid';
var baseURL = 'https://www.google-analytics.com/collect?v=1';
var uuid;

try {
  uuid = sketch__WEBPACK_IMPORTED_MODULE_0__["Settings"].globalSettingForKey(uuidKey);
} catch (err) {
  // this shouldn't be needed if we'd use Settings from the beginning
  var value = NSUserDefaults.standardUserDefaults().objectForKey(uuidKey);

  if (typeof value === 'string') {
    uuid = value;
  } else {
    uuid = NSUUID.UUID().UUIDString();
  }

  sketch__WEBPACK_IMPORTED_MODULE_0__["Settings"].setGlobalSettingForKey(uuid, uuidKey);
}

if (!uuid) {
  uuid = NSUUID.UUID().UUIDString();
  sketch__WEBPACK_IMPORTED_MODULE_0__["Settings"].setGlobalSettingForKey(uuid, uuidKey);
}

function googleAnalytics(category, action, label, value) {
  var url = baseURL; // Tracking ID

  url += "&tid=".concat(trackingID); // Source

  url += "&ds=sketch".concat(sketch__WEBPACK_IMPORTED_MODULE_0__["version"].sketch); // Client ID

  url += "&cid=".concat(uuid); // pageview, screenview, event, transaction, item, social, exception, timing

  url += '&t=event'; // App Name

  url += "&an=".concat(encodeURI(__command.pluginBundle().name())); // App Version

  url += "&av=".concat(__command.pluginBundle().version()); // Event category

  url += "&ec=".concat(encodeURI(category)); // Event action

  url += "&ea=".concat(encodeURI(action)); // Event label

  if (label) {
    url += "&el=".concat(encodeURI(label));
  } // Event value


  if (value) {
    url += "&ev=".concat(encodeURI(value));
  }

  var session = NSURLSession.sharedSession();
  var task = session.dataTaskWithURL(NSURL.URLWithString(NSString.stringWithString(url)));
  task.resume();
}

/***/ }),

/***/ "./src/map-shared-styles.js":
/*!**********************************!*\
  !*** ./src/map-shared-styles.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function createLookup(styles) {
  return styles.reduce(function (prev, s) {
    // eslint-disable-next-line no-param-reassign
    prev[s.name] = s;
    return prev;
  }, {});
}

/* harmony default export */ __webpack_exports__["default"] = (function (document) {
  return {
    layer: createLookup(document.getSharedLayerStyles()),
    text: createLookup(document.getSharedTextStyles())
  };
});

/***/ }),

/***/ "./src/replace-overrides.js":
/*!**********************************!*\
  !*** ./src/replace-overrides.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (docSymbolInstances, _ref) {
  var symbolsMap = _ref.symbolsMap,
      layerStylesMap = _ref.layerStylesMap,
      textStylesMap = _ref.textStylesMap;
  docSymbolInstances.forEach(function (symbolInstance) {
    symbolInstance.overrides.forEach(function (override) {
      if (override.property === 'symbolID' && symbolsMap[override.value]) {
        // eslint-disable-next-line no-param-reassign
        override.value = symbolsMap[override.value];
      }

      if (override.property === 'layerStyle' && layerStylesMap[override.value]) {
        // eslint-disable-next-line no-param-reassign
        override.value = layerStylesMap[override.value];
      }

      if (override.property === 'textStyle' && textStylesMap[override.value]) {
        // eslint-disable-next-line no-param-reassign
        override.value = textStylesMap[override.value];
      }
    });
  });
});

/***/ }),

/***/ "./src/replace-shared-styles.js":
/*!**************************************!*\
  !*** ./src/replace-shared-styles.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (libraryStyles, lookup) {
  var map = {};
  libraryStyles.forEach(function (librarySharedStyle) {
    var currentSharedStyle = lookup[librarySharedStyle.name];

    if (currentSharedStyle) {
      var imported = librarySharedStyle.import(); // if the shared style is coming from a library, then we just want to:
      // - import the matching style
      // - update all the instances to point to the imported style

      if (currentSharedStyle.getLibrary()) {
        map[currentSharedStyle.id] = imported.id;
        currentSharedStyle.getAllInstancesLayers().forEach(function (l) {
          // eslint-disable-next-line no-param-reassign
          l.sharedStyleId = imported.id;
          l.style.syncWithSharedStyle(imported);
        });
      } else {
        currentSharedStyle.style = imported.style;
        currentSharedStyle.getAllInstances().forEach(function (s) {
          return s.syncWithSharedStyle(currentSharedStyle);
        });
      }
    }
  });
  return map;
});

/***/ }),

/***/ "./src/replace-symbols.js":
/*!********************************!*\
  !*** ./src/replace-symbols.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Replace all symbols in the document wich match their names with selected theme library
/* harmony default export */ __webpack_exports__["default"] = (function (document, library) {
  var docSymbols = document.getSymbols();
  var docSymbolInstances = [];
  var symbolsMap = {};

  if (!docSymbols.length) {
    return {
      symbolsMap: symbolsMap,
      docSymbolInstances: docSymbolInstances
    };
  }

  var librarySymbols = library.getImportableSymbolReferencesForDocument(document);
  docSymbols.forEach(function (symbolMaster) {
    var instances = symbolMaster.getAllInstances();
    docSymbolInstances = docSymbolInstances.concat(instances);
    var matchingSymbolInLib = librarySymbols.find(function (s) {
      return s.name === symbolMaster.name;
    });

    if (!matchingSymbolInLib) {
      return;
    } // import the matching symbol


    var importedSymbolMaster = matchingSymbolInLib.import(); // store the mapping so that we can update the overrides later on

    symbolsMap[symbolMaster.symbolId] = importedSymbolMaster.symbolId; // update all the instances

    instances.forEach(function (symbolInstance) {
      // eslint-disable-next-line no-param-reassign
      symbolInstance.symbolId = importedSymbolMaster.symbolId; // eslint-disable-next-line no-param-reassign

      symbolInstance.name = importedSymbolMaster.name;
    }); // now that we replaced all the instances, we remove the master
    // eslint-disable-next-line no-param-reassign

    symbolMaster.parent = null;
  });
  return {
    symbolsMap: symbolsMap,
    docSymbolInstances: docSymbolInstances
  };
});

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./analytics */ "./src/analytics.js");
/* harmony import */ var _sync_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sync-library */ "./src/sync-library.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



 // Replace layerStyles and textLayerStyles in the document with selected theme library

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var libraries = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getLibraries().filter(function (l) {
    return l.valid && l.enabled;
  });

  var _sketch$UI$getSelecti = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.getSelectionFromUser("Select a theme library to replace magically document's layer styles and symbols 🎉", libraries.map(function (l) {
    return l.name;
  })),
      _sketch$UI$getSelecti2 = _slicedToArray(_sketch$UI$getSelecti, 3),
      selectionIndex = _sketch$UI$getSelecti2[1],
      ok = _sketch$UI$getSelecti2[2];

  Object(_analytics__WEBPACK_IMPORTED_MODULE_1__["default"])('Open Camilo', 'Alert', 'UI'); // Depending selected control, current document will sync with predefined brand

  if (ok) {
    var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
    var chosenLibrary = libraries[selectionIndex];
    Object(_analytics__WEBPACK_IMPORTED_MODULE_1__["default"])('Camilo replacement with', chosenLibrary.name, 'Library');
    Object(_sync_library__WEBPACK_IMPORTED_MODULE_2__["default"])(doc, chosenLibrary);
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("\uD83C\uDF89 \uD83C\uDF88 \uD83D\uDE4C\uD83C\uDFFC  Applied theme from ".concat(chosenLibrary.name, "  \uD83D\uDE4C\uD83C\uDFFC \uD83C\uDF89 \uD83C\uDF88"));
  }
});

/***/ }),

/***/ "./src/sync-library.js":
/*!*****************************!*\
  !*** ./src/sync-library.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _map_shared_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map-shared-styles */ "./src/map-shared-styles.js");
/* harmony import */ var _replace_symbols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./replace-symbols */ "./src/replace-symbols.js");
/* harmony import */ var _replace_overrides__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./replace-overrides */ "./src/replace-overrides.js");
/* harmony import */ var _replace_shared_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./replace-shared-styles */ "./src/replace-shared-styles.js");




/* harmony default export */ __webpack_exports__["default"] = (function (document, library) {
  var lookups = Object(_map_shared_styles__WEBPACK_IMPORTED_MODULE_0__["default"])(document); // replace the styles

  var layerStylesMap = Object(_replace_shared_styles__WEBPACK_IMPORTED_MODULE_3__["default"])(library.getImportableLayerStyleReferencesForDocument(document), lookups.layer);
  var textStylesMap = Object(_replace_shared_styles__WEBPACK_IMPORTED_MODULE_3__["default"])(library.getImportableTextStyleReferencesForDocument(document), lookups.text); // replace the symbols

  var _replaceSymbols = Object(_replace_symbols__WEBPACK_IMPORTED_MODULE_1__["default"])(document, library),
      symbolsMap = _replaceSymbols.symbolsMap,
      docSymbolInstances = _replaceSymbols.docSymbolInstances;

  Object(_replace_overrides__WEBPACK_IMPORTED_MODULE_2__["default"])(docSymbolInstances, {
    symbolsMap: symbolsMap,
    layerStylesMap: layerStylesMap,
    textStylesMap: textStylesMap
  }); // reload the inspector to make sure we show the latest changes

  document.sketchObject.reloadInspector();
});

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=script.js.map