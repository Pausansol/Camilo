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
  var alert = COSAlertWindow['new']();
  alert.setMessageText('Camilo');
  alert.setInformativeText("Select a theme library to switch 🎉 with");
  alert.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed('icon.png').path()));
  alert.addAccessoryView(getOptionSelected(libraries));
  alert.addButtonWithTitle('Switch');
  alert.addButtonWithTitle('Cancel');
  var swapType = createRadioButtons(["Apply to document", "Apply to selection"], 0);
  alert.addAccessoryView(swapType);
  (0, _analytics2['default'])(context, "Open Camilo", "Alert", "UI");

  swapType.cells().objectAtIndex(0).setAction("callAction:");
  swapType.cells().objectAtIndex(0).setCOSJSTargetFunction(function (sender) {
    if (context.selection.length == 1) {
      var symbolName = context.selection[0]['class']() == "MSSymbolMaster" ? context.selection[0].name() : context.selection[0].symbolMaster().name();

      if (symbolArray.containsObject(symbolName)) {
        selectSymbol = symbolArray.indexOfObject(symbolName);
      }

      symbolMaster.selectItemAtIndex(selectSymbol);
    }

    symbolMaster.setEnabled(0);
  });

  swapType.cells().objectAtIndex(1).setAction("callAction:");
  swapType.cells().objectAtIndex(1).setCOSJSTargetFunction(function (sender) {
    if (context.selection.length == 1) {
      var symbolID = context.selection[0]['class']() == "MSSymbolMaster" ? context.selection[0].symbolID() : context.selection[0].symbolMaster().symbolID();

      if (symbolArray.containsObject(symbolID)) {
        selectSymbol = symbolArray.indexOfObject(symbolID);
      }

      symbolMaster.selectItemAtIndex(selectSymbol);
    }

    symbolMaster.setEnabled(0);
  });

  // Depending selected control, current document will sync with predefined brand 
  if (alert.runModal() == NSAlertFirstButtonReturn) {
    var chosenLibraryName = String(alert.viewAtIndex(0).stringValue());
    var lib = libraries.find(function (l) {
      return l.name === chosenLibraryName;
    });
    var doc = _sketch2['default'].getSelectedDocument();
    (0, _analytics2['default'])(context, 'Camilo replacement with', lib.name, 'Library');
    (0, _syncLibrary2['default'])(doc, lib);
    _sketch2['default'].UI.message('\uD83C\uDF89 \uD83C\uDF88 \uD83D\uDE4C\uD83C\uDFFC  Applied theme from ' + String(lib.name) + '  \uD83D\uDE4C\uD83C\uDFFC \uD83C\uDF89 \uD83C\uDF88');
  }
};

var _sketch = __webpack_require__(1);

var _sketch2 = _interopRequireDefault(_sketch);

var _analytics = __webpack_require__(2);

var _analytics2 = _interopRequireDefault(_analytics);

var _syncLibrary = __webpack_require__(3);

var _syncLibrary2 = _interopRequireDefault(_syncLibrary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function createRadioButtons(options, selected, format, x, y) {
  var rows = options.length,
      columns = 1,
      buttonMatrixWidth = 300,
      buttonCellWidth = buttonMatrixWidth,
      x = x ? x : 0,
      y = y ? y : 0;

  if (format && format != 0) {
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

  for (i = 0; i < options.length; i++) {
    buttonMatrix.cells().objectAtIndex(i).setTitle(options[i]);
    buttonMatrix.cells().objectAtIndex(i).setTag(i);
  }

  buttonMatrix.selectCellAtRow_column(selected, 0);

  return buttonMatrix;
}

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

// Replace layerStyles and textLayerStyles in the document with selected theme library

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = googleAnalytics;
function googleAnalytics(context, category, action, label, value) {
  var trackingID = "UA-128191866-1";
  var uuidKey = "google.analytics.uuid";
  var url = "https://www.google-analytics.com/collect?v=1";
  var uuid = NSUserDefaults.standardUserDefaults().objectForKey(uuidKey);

  if (!uuid) {
    uuid = NSUUID.UUID().UUIDString();
    NSUserDefaults.standardUserDefaults().setObject_forKey(uuid, uuidKey);
  }

  // Tracking ID
  url += "&tid=" + trackingID;
  // Source
  url += "&ds=sketch" + MSApplicationMetadata.metadata().appVersion;
  // Client ID
  url += "&cid=" + uuid;
  // pageview, screenview, event, transaction, item, social, exception, timing
  url += "&t=event";
  // App Name
  url += "&an=" + encodeURI(context.plugin.name());
  // App Version
  url += "&av=" + context.plugin.version();
  // Event category
  url += "&ec=" + encodeURI(category);
  // Event action
  url += "&ea=" + encodeURI(action);
  // Event label
  if (label) {
    url += "&el=" + encodeURI(label);
  }
  // Event value
  if (value) {
    url += "&ev=" + encodeURI(value);
  }

  var session = NSURLSession.sharedSession(),
      task = session.dataTaskWithURL(NSURL.URLWithString(NSString.stringWithString(url)));
  task.resume();
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (document, library) {
  var lookups = (0, _mapSharedStyles2['default'])(document, library);

  // replace the symbols

  var _replaceSymbols = (0, _replaceSymbols3['default'])(document, library),
      symbolsMap = _replaceSymbols.symbolsMap,
      docSymbolInstances = _replaceSymbols.docSymbolInstances;

  // replace the styles


  var layerStylesMap = (0, _replaceSharedStyles2['default'])(document.getSharedLayerStyles(), lookups.layer, library);
  var textStylesMap = (0, _replaceSharedStyles2['default'])(document.getSharedTextStyles(), lookups.text, library);

  (0, _replaceOverrides2['default'])(docSymbolInstances, {
    symbolsMap: symbolsMap,
    layerStylesMap: layerStylesMap,
    textStylesMap: textStylesMap
  });

  // reload the inspector to make sure we show the latest changes
  document.sketchObject.reloadInspector();
};

var _mapSharedStyles = __webpack_require__(4);

var _mapSharedStyles2 = _interopRequireDefault(_mapSharedStyles);

var _replaceSymbols2 = __webpack_require__(5);

var _replaceSymbols3 = _interopRequireDefault(_replaceSymbols2);

var _replaceOverrides = __webpack_require__(6);

var _replaceOverrides2 = _interopRequireDefault(_replaceOverrides);

var _replaceSharedStyles = __webpack_require__(7);

var _replaceSharedStyles2 = _interopRequireDefault(_replaceSharedStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/***/ }),
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
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

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')
