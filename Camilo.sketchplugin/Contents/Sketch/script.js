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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (context) {
  var libraries = _sketch2['default'].getLibraries().filter(function (l) {
    return l.valid && l.enabled;
  });
  var lastSelected = _settings2['default'].sessionVariable('Selected');

  // create the alertWindow UI
  var alertWindow = (0, _createAlertWindow2['default'])(context);
  alertWindow.addAccessoryView((0, _getOptionSelected2['default'])(libraries));
  alertWindow.addButtonWithTitle('Switch');
  alertWindow.addButtonWithTitle('Cancel');

  // create the radioButtons
  var swapType = (0, _createRadioButtons2['default'])(['Apply to document', 'Apply to selection'], lastSelected);
  alertWindow.addAccessoryView(swapType);

  (0, _analytics2['default'])(context, 'Open Camilo', 'Alert', 'UI');

  if (alertWindow.runModal() === NSAlertFirstButtonReturn) {
    var chosenLibraryName = String(alertWindow.viewAtIndex(0).stringValue());
    var lib = libraries.find(function (l) {
      return l.name === chosenLibraryName;
    });
    var doc = _sketch2['default'].getSelectedDocument();

    // get the info from radioButtons
    // - if 0 selected it will apply to document
    // - if 1 selected it will apply to selection
    if (swapType.selectedCell().tag() === 0) {
      _settings2['default'].setSessionVariable('Selected', 0);
      (0, _switchLibrary2['default'])(doc, lib);
      (0, _analytics2['default'])(context, 'Replace document with', lib.name, 'Library');
      _sketch2['default'].UI.message('\uD83C\uDF89 \uD83C\uDF88 \uD83D\uDE4C\uD83C\uDFFC  Applied theme from ' + String(lib.name) + '  \uD83D\uDE4C\uD83C\uDFFC \uD83C\uDF89 \uD83C\uDF88');
    }

    if (swapType.selectedCell().tag() === 1) {
      _settings2['default'].setSessionVariable('Selected', 1);
      (0, _switchSelection2['default'])(doc, lib);
      (0, _analytics2['default'])(context, 'Replace selected with', lib.name, 'Library');
      var selectedLayers = doc.selectedLayers.layers;
      if (selectedLayers.length < 1) {
        _sketch2['default'].UI.message('Select a layer');
      } else {
        _sketch2['default'].UI.message('\uD83C\uDF89 \uD83C\uDF88 \uD83D\uDE4C\uD83C\uDFFC  Applied theme from ' + String(lib.name) + '  \uD83D\uDE4C\uD83C\uDFFC \uD83C\uDF89 \uD83C\uDF88');
      }
    }
  }
};

var _sketch = __webpack_require__(1);

var _sketch2 = _interopRequireDefault(_sketch);

var _settings = __webpack_require__(2);

var _settings2 = _interopRequireDefault(_settings);

var _analytics = __webpack_require__(3);

var _analytics2 = _interopRequireDefault(_analytics);

var _createRadioButtons = __webpack_require__(4);

var _createRadioButtons2 = _interopRequireDefault(_createRadioButtons);

var _switchLibrary = __webpack_require__(5);

var _switchLibrary2 = _interopRequireDefault(_switchLibrary);

var _switchSelection = __webpack_require__(10);

var _switchSelection2 = _interopRequireDefault(_switchSelection);

var _getOptionSelected = __webpack_require__(16);

var _getOptionSelected2 = _interopRequireDefault(_getOptionSelected);

var _createAlertWindow = __webpack_require__(17);

var _createAlertWindow2 = _interopRequireDefault(_createAlertWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = googleAnalytics;
function googleAnalytics(context, category, action, label, value) {
  var trackingID = 'UA-128191866-1';
  var uuidKey = 'google.analytics.uuid';
  var url = 'https://www.google-analytics.com/collect?v=1';
  var uuid = NSUserDefaults.standardUserDefaults().objectForKey(uuidKey);

  if (!uuid) {
    uuid = NSUUID.UUID().UUIDString();
    NSUserDefaults.standardUserDefaults().setObject_forKey(uuid, uuidKey);
  }

  // Tracking ID
  url += '&tid=' + trackingID;
  // Source
  url += '&ds=sketch' + String(MSApplicationMetadata.metadata().appVersion);
  // Client ID
  url += '&cid=' + String(uuid);
  // pageview, screenview, event, transaction, item, social, exception, timing
  url += '&t=event';
  // App Name
  url += '&an=' + String(encodeURI(context.plugin.name()));
  // App Version
  url += '&av=' + String(context.plugin.version());
  // Event category
  url += '&ec=' + String(encodeURI(category));
  // Event action
  url += '&ea=' + String(encodeURI(action));
  // Event label
  if (label) {
    url += '&el=' + String(encodeURI(label));
  }
  // Event value
  if (value) {
    url += '&ev=' + String(encodeURI(value));
  }

  var session = NSURLSession.sharedSession();
  var task = session.dataTaskWithURL(NSURL.URLWithString(NSString.stringWithString(url)));
  task.resume();
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createRadioButtons;
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (document, library) {
  var lookup = (0, _mapSharedStyles2['default'])(document, library);

  // replace the symbols

  var _replaceSymbols = (0, _replaceSymbols3['default'])(document, library),
      symbolsMap = _replaceSymbols.symbolsMap,
      docSymbolInstances = _replaceSymbols.docSymbolInstances;

  // replace the styles


  var layerStylesMap = (0, _replaceSharedStyles2['default'])(document.getSharedLayerStyles(), lookup.layer, library);
  var textStylesMap = (0, _replaceSharedStyles2['default'])(document.getSharedTextStyles(), lookup.text, library);

  (0, _replaceOverrides2['default'])(docSymbolInstances, {
    symbolsMap: symbolsMap,
    layerStylesMap: layerStylesMap,
    textStylesMap: textStylesMap
  });

  // reload the inspector to make sure we show the latest changes
  document.sketchObject.reloadInspector();
};

var _mapSharedStyles = __webpack_require__(6);

var _mapSharedStyles2 = _interopRequireDefault(_mapSharedStyles);

var _replaceSymbols2 = __webpack_require__(7);

var _replaceSymbols3 = _interopRequireDefault(_replaceSymbols2);

var _replaceOverrides = __webpack_require__(8);

var _replaceOverrides2 = _interopRequireDefault(_replaceOverrides);

var _replaceSharedStyles = __webpack_require__(9);

var _replaceSharedStyles2 = _interopRequireDefault(_replaceSharedStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLookup = createLookup;
function createLookup(styles) {
  return styles.reduce(function (prev, s) {
    // eslint-disable-next-line no-param-reassign
    prev[s.name] = s;
    return prev;
  }, {});
}

exports["default"] = function (document, library) {
  return {
    layer: createLookup(library.getImportableLayerStyleReferencesForDocument(document)),
    text: createLookup(library.getImportableTextStyleReferencesForDocument(document))
  };
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (document, library) {
  var docSymbols = document.getSymbols();
  var docSymbolInstances = [];
  var symbolsMap = {};

  if (!docSymbols.length) {
    return { symbolsMap: symbolsMap, docSymbolInstances: docSymbolInstances };
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
    }
    // import the matching symbol
    var importedSymbolMaster = matchingSymbolInLib["import"]();

    // store the mapping so that we can update the overrides later on
    symbolsMap[symbolMaster.symbolId] = importedSymbolMaster.symbolId;

    // update all the instances
    instances.forEach(function (symbolInstance) {
      // eslint-disable-next-line no-param-reassign
      symbolInstance.symbolId = importedSymbolMaster.symbolId;
      // eslint-disable-next-line no-param-reassign
      symbolInstance.name = importedSymbolMaster.name;
    });

    // now that we replaced all the instances, we remove the master
    // eslint-disable-next-line no-param-reassign
    symbolMaster.parent = null;
  });

  return { symbolsMap: symbolsMap, docSymbolInstances: docSymbolInstances };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (docSymbolInstances, _ref) {
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
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (libraryStyles, lookup, library) {
  var map = {};
  libraryStyles.forEach(function (librarySharedStyle) {
    var currentSharedStyle = lookup[librarySharedStyle.name];
    if (currentSharedStyle) {
      var imported = currentSharedStyle["import"]();
      // if the shared style is coming from a library, then we just want to:
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
        librarySharedStyle.style = imported.style;
        librarySharedStyle.getAllInstances().forEach(function (s) {
          return s.syncWithSharedStyle(librarySharedStyle);
        });
      }
    }
  });
  return map;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (document, library) {
  var selection = document.selectedLayers.layers;
  var lookup = (0, _mapSymbolsAndStyles2['default'])(document, library);
  var docSymbols = document.getSymbols();

  (0, _inspectSelection2['default'])(selection, lookup, docSymbols, document.getSharedLayerStyles(), document.getSharedTextStyles());

  // reload the inspector to make sure we show the latest changes
  document.sketchObject.reloadInspector();
};

var _mapSymbolsAndStyles = __webpack_require__(11);

var _mapSymbolsAndStyles2 = _interopRequireDefault(_mapSymbolsAndStyles);

var _inspectSelection = __webpack_require__(12);

var _inspectSelection2 = _interopRequireDefault(_inspectSelection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIdLookup = createIdLookup;
exports.createLookup = createLookup;
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

exports["default"] = function (document, library) {
  return {
    layer: createLookup(library.getImportableLayerStyleReferencesForDocument(document)),
    text: createLookup(library.getImportableTextStyleReferencesForDocument(document)),
    symbol: createLookup(library.getImportableSymbolReferencesForDocument(document)),
    documentsymbol: createIdLookup(document.getSymbols())
  };
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = inspectSelection;

var _replaceSelectedSharedStyles = __webpack_require__(13);

var _replaceSelectedSharedStyles2 = _interopRequireDefault(_replaceSelectedSharedStyles);

var _replaceSelectedSymbols = __webpack_require__(14);

var _replaceSelectedSymbols2 = _interopRequireDefault(_replaceSelectedSymbols);

var _replaceSelectedOverrides = __webpack_require__(15);

var _replaceSelectedOverrides2 = _interopRequireDefault(_replaceSelectedOverrides);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function inspectSelection(layers, lookup, documentSymbols, documentLayerStyles, documentTextStyles) {
  layers.forEach(function (layer) {
    if (layer.sharedStyleId != null) {
      (0, _replaceSelectedSharedStyles2['default'])(layer, layer.sharedStyleId, documentLayerStyles, lookup.layer, documentTextStyles, lookup.text);
    } else {
      if (layer.layers !== undefined) {
        inspectSelection(layer.layers, lookup, documentSymbols, documentLayerStyles, documentTextStyles);
      }
      if (layer.layers === undefined) {
        if (layer.type === 'SymbolInstance') {
          (0, _replaceSelectedSymbols2['default'])(layer, lookup.symbol, lookup.documentsymbol);
        }
        if (layer.overrides !== undefined) {
          layer.overrides.forEach(function (overrides) {
            if (overrides.property === 'symbolID') {
              (0, _replaceSelectedOverrides2['default'])(overrides.value, overrides, documentSymbols, lookup.symbol, 'symbolId');
            }
            if (overrides.property === 'layerStyle') {
              (0, _replaceSelectedOverrides2['default'])(overrides.value, overrides, documentLayerStyles, lookup.layer, 'id');
            }
            if (overrides.property === 'textStyle') {
              (0, _replaceSelectedOverrides2['default'])(overrides.value, overrides, documentTextStyles, lookup.text, 'id');
            }
          });
        } else if (layer.sharedStyleId !== null) {
          (0, _replaceSelectedSharedStyles2['default'])(layer, layer.sharedStyleId, documentLayerStyles, lookup.layer, documentTextStyles, lookup.text);
        }
      }
    }
  });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (layer, sharedStyleId, documentLayerStyles, libraryLayerStyles, documentTextStyles, libraryTextStyles) {
  documentLayerStyles.forEach(function (style) {
    if (style.id === sharedStyleId) {
      var styleToImport = libraryLayerStyles[style.name];

      if (styleToImport) {
        var importedStyle = styleToImport["import"]();
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
        var importedStyle = styleToImport["import"]();
        var importedStyleId = importedStyle.id;
        layer.sharedStyleId = importedStyleId;
        layer.style.syncWithSharedStyle(importedStyle);
      }
    }
  });
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (selectedSymbols, librarySymbols, documentSymbols) {
  var symbolMasterName = documentSymbols[selectedSymbols.symbolId];

  if (symbolMasterName) {
    var symbolToImport = librarySymbols[symbolMasterName.name];
    if (symbolToImport) {
      var imported = symbolToImport["import"]();
      selectedSymbols.symbolId = imported.symbolId;
      selectedSymbols.name = imported.name;
    }
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (overrideValue, overrides, documentStyles, libraryStyles, key) {
  documentStyles.forEach(function (style) {
    if (style[key] === overrideValue) {
      var styleToImport = libraryStyles[style.name];
      if (styleToImport) {
        var imported = styleToImport["import"]();
        var importedId = imported[key];
        overrides.value = importedId;
      }
    }
  });
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getOptionSelected;
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = createAlertWindow;
function createAlertWindow(context) {
  var alertWindow = COSAlertWindow['new']();

  alertWindow.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed('icon.png').path()));
  alertWindow.setMessageText('Camilo');
  alertWindow.setInformativeText("Select a theme library to switch magically document's layerStyles, textStyles and symbols 🎉");

  return alertWindow;
}

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')
