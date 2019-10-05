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
function googleAnalytics(context, category, action, label, value) {
  var trackingID = 'UA-128191866-1';
  var uuidKey = 'google.analytics.uuid';
  var url = 'https://www.google-analytics.com/collect?v=1';
  var uuid = NSUserDefaults.standardUserDefaults().objectForKey(uuidKey);

  if (!uuid) {
    uuid = NSUUID.UUID().UUIDString();
    NSUserDefaults.standardUserDefaults().setObject_forKey(uuid, uuidKey);
  } // Tracking ID


  url += "&tid=".concat(trackingID); // Source

  url += "&ds=sketch".concat(MSApplicationMetadata.metadata().appVersion); // Client ID

  url += "&cid=".concat(uuid); // pageview, screenview, event, transaction, item, social, exception, timing

  url += '&t=event'; // App Name

  url += "&an=".concat(encodeURI(context.plugin.name())); // App Version

  url += "&av=".concat(context.plugin.version()); // Event category

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

/***/ "./src/create-alert-window.js":
/*!************************************!*\
  !*** ./src/create-alert-window.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createAlertWindow; });
function createAlertWindow(context) {
  var alertWindow = COSAlertWindow.new();
  alertWindow.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed('icon.png').path()));
  alertWindow.setMessageText('Camilo');
  alertWindow.setInformativeText("Select a theme library to switch magically document's layerStyles, textStyles and symbols 🎉");
  return alertWindow;
}

/***/ }),

/***/ "./src/create-radio-buttons.js":
/*!*************************************!*\
  !*** ./src/create-radio-buttons.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createRadioButtons; });
function createRadioButtons(options, selected, format) {
  var x = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var y = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var rows = options.length;
  var columns = 1;
  var buttonMatrixWidth = 300;
  var buttonCellWidth = buttonMatrixWidth;

  if (format && format !== 0) {
    rows = options.length / 2;
    columns = 2;
    buttonMatrixWidth = 300;
    buttonCellWidth = buttonMatrixWidth / columns;
  }

  var buttonCell = NSButtonCell.alloc().init();
  buttonCell.setButtonType(NSRadioButton);
  var buttonMatrix = NSMatrix.alloc().initWithFrame_mode_prototype_numberOfRows_numberOfColumns(NSMakeRect(x, y, buttonMatrixWidth, rows * 24), NSRadioModeMatrix, buttonCell, rows, columns);
  buttonMatrix.setCellSize(NSMakeSize(buttonCellWidth, 24));
  var i = 0;

  for (i = 0; i < options.length; i += 1) {
    buttonMatrix.cells().objectAtIndex(i).setTitle(options[i]);
    buttonMatrix.cells().objectAtIndex(i).setTag(i);
  }

  buttonMatrix.selectCellAtRow_column(selected, 0);
  return buttonMatrix;
}

/***/ }),

/***/ "./src/get-option-selected.js":
/*!************************************!*\
  !*** ./src/get-option-selected.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getOptionSelected; });
function getOptionSelected(libraries) {
  var options = [];
  var optionSelected = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 0, 240, 28));
  libraries.forEach(function (lib) {
    options.push(lib.name);
  });
  optionSelected.i18nObjectValues = options;
  optionSelected.setEditable(false);
  optionSelected.addItemsWithObjectValues(options);
  optionSelected.selectItemAtIndex(0);
  return optionSelected;
}

/***/ }),

/***/ "./src/inspect-selection.js":
/*!**********************************!*\
  !*** ./src/inspect-selection.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return inspectSelection; });
/* harmony import */ var _replace_selected_shared_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./replace-selected-shared-styles */ "./src/replace-selected-shared-styles.js");
/* harmony import */ var _replace_selected_symbols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./replace-selected-symbols */ "./src/replace-selected-symbols.js");
/* harmony import */ var _replace_selected_overrides__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./replace-selected-overrides */ "./src/replace-selected-overrides.js");



function inspectSelection(layers, lookup, documentSymbols, documentLayerStyles, documentTextStyles) {
  layers.forEach(function (layer) {
    if (layer.sharedStyleId != null) {
      Object(_replace_selected_shared_styles__WEBPACK_IMPORTED_MODULE_0__["default"])(layer, layer.sharedStyleId, documentLayerStyles, lookup.layer, documentTextStyles, lookup.text);
    } else {
      if (layer.layers !== undefined) {
        inspectSelection(layer.layers, lookup, documentSymbols, documentLayerStyles, documentTextStyles);
      }

      if (layer.layers === undefined) {
        if (layer.type === 'SymbolInstance') {
          Object(_replace_selected_symbols__WEBPACK_IMPORTED_MODULE_1__["default"])(layer, lookup.symbol, lookup.documentsymbol);
        }

        if (layer.overrides !== undefined) {
          layer.overrides.forEach(function (overrides) {
            if (overrides.property === 'symbolID') {
              Object(_replace_selected_overrides__WEBPACK_IMPORTED_MODULE_2__["default"])(overrides.value, overrides, documentSymbols, lookup.symbol, 'symbolId');
            }

            if (overrides.property === 'layerStyle') {
              Object(_replace_selected_overrides__WEBPACK_IMPORTED_MODULE_2__["default"])(overrides.value, overrides, documentLayerStyles, lookup.layer, 'id');
            }

            if (overrides.property === 'textStyle') {
              Object(_replace_selected_overrides__WEBPACK_IMPORTED_MODULE_2__["default"])(overrides.value, overrides, documentTextStyles, lookup.text, 'id');
            }
          });
        } else if (layer.sharedStyleId !== null) {
          Object(_replace_selected_shared_styles__WEBPACK_IMPORTED_MODULE_0__["default"])(layer, layer.sharedStyleId, documentLayerStyles, lookup.layer, documentTextStyles, lookup.text);
        }
      }
    }
  });
}

/***/ }),

/***/ "./src/map-shared-styles.js":
/*!**********************************!*\
  !*** ./src/map-shared-styles.js ***!
  \**********************************/
/*! exports provided: createLookup, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLookup", function() { return createLookup; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createLookup(styles) {
  return styles.reduce(function (prev, s) {
    return _objectSpread({}, prev, {
      [s.name]: s
    });
  }, {});
}
/* harmony default export */ __webpack_exports__["default"] = (function (document, library) {
  return {
    layer: createLookup(library.getImportableLayerStyleReferencesForDocument(document)),
    text: createLookup(library.getImportableTextStyleReferencesForDocument(document))
  };
});

/***/ }),

/***/ "./src/map-symbols-and-styles.js":
/*!***************************************!*\
  !*** ./src/map-symbols-and-styles.js ***!
  \***************************************/
/*! exports provided: createIdLookup, createLookup, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createIdLookup", function() { return createIdLookup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLookup", function() { return createLookup; });
function createIdLookup(styles) {
  return styles.reduce(function (prev, s) {
    // eslint-disable-next-line no-param-reassign
    prev[s.symbolId] = s;
    return prev;
  }, {});
}
function createLookup(styles) {
  return styles.reduce(function (prev, s) {
    // eslint-disable-next-line no-param-reassign
    prev[s.name] = s;
    return prev;
  }, {});
}
/* harmony default export */ __webpack_exports__["default"] = (function (document, library) {
  return {
    layer: createLookup(library.getImportableLayerStyleReferencesForDocument(document)),
    text: createLookup(library.getImportableTextStyleReferencesForDocument(document)),
    symbol: createLookup(library.getImportableSymbolReferencesForDocument(document)),
    documentsymbol: createIdLookup(document.getSymbols())
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

/***/ "./src/replace-selected-overrides.js":
/*!*******************************************!*\
  !*** ./src/replace-selected-overrides.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (overrideValue, overrides, documentStyles, libraryStyles, key) {
  documentStyles.forEach(function (style) {
    if (style[key] === overrideValue) {
      var styleToImport = libraryStyles[style.name];

      if (styleToImport) {
        var imported = styleToImport.import();
        var importedId = imported[key];
        overrides.value = importedId;
      }
    }
  });
});

/***/ }),

/***/ "./src/replace-selected-shared-styles.js":
/*!***********************************************!*\
  !*** ./src/replace-selected-shared-styles.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (layer, sharedStyleId, documentLayerStyles, libraryLayerStyles, documentTextStyles, libraryTextStyles) {
  documentLayerStyles.forEach(function (style) {
    if (style.id === sharedStyleId) {
      var styleToImport = libraryLayerStyles[style.name];

      if (styleToImport) {
        var importedStyle = styleToImport.import();
        var importedStyleId = importedStyle.id;
        layer.sharedStyleId = importedStyleId;
        layer.style.syncWithSharedStyle(importedStyle);
      }
    }
  });
  documentTextStyles.forEach(function (style) {
    if (style.id === sharedStyleId) {
      var styleToImport = libraryTextStyles[style.name];

      if (styleToImport) {
        var importedStyle = styleToImport.import();
        var importedStyleId = importedStyle.id;
        layer.sharedStyleId = importedStyleId;
        layer.style.syncWithSharedStyle(importedStyle);
      }
    }
  });
});

/***/ }),

/***/ "./src/replace-selected-symbols.js":
/*!*****************************************!*\
  !*** ./src/replace-selected-symbols.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (selectedSymbols, librarySymbols, documentSymbols) {
  var symbolMasterName = documentSymbols[selectedSymbols.symbolId];

  if (symbolMasterName) {
    var symbolToImport = librarySymbols[symbolMasterName.name];

    if (symbolToImport) {
      var imported = symbolToImport.import();
      selectedSymbols.symbolId = imported.symbolId;
      selectedSymbols.name = imported.name;
    }
  }
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
      var imported = currentSharedStyle.import(); // if the shared style is coming from a library, then we just want to:
      // - import the matching style
      // - update all the instances to point to the imported style
      // - map the current style to the imported one

      if (librarySharedStyle.getLibrary()) {
        map[librarySharedStyle.id] = imported.id;
        librarySharedStyle.getAllInstancesLayers().forEach(function (l) {
          // eslint-disable-next-line no-param-reassign
          l.sharedStyleId = imported.id;
          l.style.syncWithSharedStyle(imported);
        });
      } else {
        // if the shared style is local, then we just want to:
        // - import the matching style to update the local one
        // - update all the instances to point to the imported style
        // eslint-disable-next-line no-param-reassign
        librarySharedStyle.style = imported.style;
        librarySharedStyle.getAllInstances().forEach(function (s) {
          return s.syncWithSharedStyle(librarySharedStyle);
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
/* harmony import */ var sketch_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch/settings */ "sketch/settings");
/* harmony import */ var sketch_settings__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_settings__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _analytics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./analytics */ "./src/analytics.js");
/* harmony import */ var _create_radio_buttons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./create-radio-buttons */ "./src/create-radio-buttons.js");
/* harmony import */ var _switch_library__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./switch-library */ "./src/switch-library.js");
/* harmony import */ var _switch_selection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./switch-selection */ "./src/switch-selection.js");
/* harmony import */ var _get_option_selected__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./get-option-selected */ "./src/get-option-selected.js");
/* harmony import */ var _create_alert_window__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./create-alert-window */ "./src/create-alert-window.js");








/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var libraries = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getLibraries().filter(function (l) {
    return l.valid && l.enabled;
  });
  var lastSelected = sketch_settings__WEBPACK_IMPORTED_MODULE_1___default.a.sessionVariable('Selected'); // create the alertWindow UI

  var alertWindow = Object(_create_alert_window__WEBPACK_IMPORTED_MODULE_7__["default"])(context);
  alertWindow.addAccessoryView(Object(_get_option_selected__WEBPACK_IMPORTED_MODULE_6__["default"])(libraries));
  alertWindow.addButtonWithTitle('Switch');
  alertWindow.addButtonWithTitle('Cancel'); // create the radioButtons

  var swapType = Object(_create_radio_buttons__WEBPACK_IMPORTED_MODULE_3__["default"])(['Apply to document', 'Apply to selection'], lastSelected);
  alertWindow.addAccessoryView(swapType);
  Object(_analytics__WEBPACK_IMPORTED_MODULE_2__["default"])(context, 'Open Camilo', 'Alert', 'UI');

  if (alertWindow.runModal() === NSAlertFirstButtonReturn) {
    var chosenLibraryName = String(alertWindow.viewAtIndex(0).stringValue());
    var lib = libraries.find(function (l) {
      return l.name === chosenLibraryName;
    });
    var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument(); // get the info from radioButtons
    // - if 0 selected it will apply to document
    // - if 1 selected it will apply to selection

    if (swapType.selectedCell().tag() === 0) {
      sketch_settings__WEBPACK_IMPORTED_MODULE_1___default.a.setSessionVariable('Selected', 0);
      Object(_switch_library__WEBPACK_IMPORTED_MODULE_4__["default"])(doc, lib);
      Object(_analytics__WEBPACK_IMPORTED_MODULE_2__["default"])(context, 'Replace document with', lib.name, 'Library');
      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("\uD83C\uDF89 \uD83C\uDF88 \uD83D\uDE4C\uD83C\uDFFC  Applied theme from ".concat(lib.name, "  \uD83D\uDE4C\uD83C\uDFFC \uD83C\uDF89 \uD83C\uDF88"));
    }

    if (swapType.selectedCell().tag() === 1) {
      sketch_settings__WEBPACK_IMPORTED_MODULE_1___default.a.setSessionVariable('Selected', 1);
      Object(_switch_selection__WEBPACK_IMPORTED_MODULE_5__["default"])(doc, lib);
      Object(_analytics__WEBPACK_IMPORTED_MODULE_2__["default"])(context, 'Replace selected with', lib.name, 'Library');
      var selectedLayers = doc.selectedLayers.layers;

      if (selectedLayers.length < 1) {
        sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Select a layer");
      } else {
        sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("\uD83C\uDF89 \uD83C\uDF88 \uD83D\uDE4C\uD83C\uDFFC  Applied theme from ".concat(lib.name, "  \uD83D\uDE4C\uD83C\uDFFC \uD83C\uDF89 \uD83C\uDF88"));
      }
    }
  }
});

/***/ }),

/***/ "./src/switch-library.js":
/*!*******************************!*\
  !*** ./src/switch-library.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _map_shared_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map-shared-styles */ "./src/map-shared-styles.js");
/* harmony import */ var _replace_symbols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./replace-symbols */ "./src/replace-symbols.js");
/* harmony import */ var _replace_overrides__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./replace-overrides */ "./src/replace-overrides.js");
/* harmony import */ var _replace_shared_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./replace-shared-styles */ "./src/replace-shared-styles.js");




/* harmony default export */ __webpack_exports__["default"] = (function (document, library) {
  var lookup = Object(_map_shared_styles__WEBPACK_IMPORTED_MODULE_0__["default"])(document, library); // replace the symbols

  var _replaceSymbols = Object(_replace_symbols__WEBPACK_IMPORTED_MODULE_1__["default"])(document, library),
      symbolsMap = _replaceSymbols.symbolsMap,
      docSymbolInstances = _replaceSymbols.docSymbolInstances; // replace the styles


  var layerStylesMap = Object(_replace_shared_styles__WEBPACK_IMPORTED_MODULE_3__["default"])(document.getSharedLayerStyles(), lookup.layer);
  var textStylesMap = Object(_replace_shared_styles__WEBPACK_IMPORTED_MODULE_3__["default"])(document.getSharedTextStyles(), lookup.text);
  Object(_replace_overrides__WEBPACK_IMPORTED_MODULE_2__["default"])(docSymbolInstances, {
    symbolsMap: symbolsMap,
    layerStylesMap: layerStylesMap,
    textStylesMap: textStylesMap
  }); // reload the inspector to make sure we show the latest changes

  document.sketchObject.reloadInspector();
});

/***/ }),

/***/ "./src/switch-selection.js":
/*!*********************************!*\
  !*** ./src/switch-selection.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _map_symbols_and_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map-symbols-and-styles */ "./src/map-symbols-and-styles.js");
/* harmony import */ var _inspect_selection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inspect-selection */ "./src/inspect-selection.js");


/* harmony default export */ __webpack_exports__["default"] = (function (document, library) {
  var selection = document.selectedLayers.layers;
  var lookup = Object(_map_symbols_and_styles__WEBPACK_IMPORTED_MODULE_0__["default"])(document, library);
  var docSymbols = document.getSymbols();
  Object(_inspect_selection__WEBPACK_IMPORTED_MODULE_1__["default"])(selection, lookup, docSymbols, document.getSharedLayerStyles(), document.getSharedTextStyles()); // reload the inspector to make sure we show the latest changes

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

/***/ }),

/***/ "sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

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