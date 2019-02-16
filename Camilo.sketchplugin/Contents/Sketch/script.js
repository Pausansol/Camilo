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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(console) {/* globals log */

if (true) {
  var sketchUtils = __webpack_require__(15)
  var sketchDebugger = __webpack_require__(17)
  var actions = __webpack_require__(19)

  function getStack() {
    return sketchUtils.prepareStackTrace(new Error().stack)
  }
}

console._skpmPrefix = 'console> '

function logEverywhere(type, args) {
  var values = Array.prototype.slice.call(args)

  // log to the System logs
  values.forEach(function(v) {
    try {
      log(console._skpmPrefix + indentString() + v)
    } catch (e) {
      log(v)
    }
  })

  if (true) {
    if (!sketchDebugger.isDebuggerPresent()) {
      return
    }

    var payload = {
      ts: Date.now(),
      type: type,
      plugin: String(context.scriptPath),
      values: values.map(sketchUtils.prepareValue),
      stack: getStack(),
    }

    sketchDebugger.sendToDebugger(actions.ADD_LOG, payload)
  }
}

var indentLevel = 0
function indentString() {
  var indent = ''
  for (var i = 0; i < indentLevel; i++) {
    indent += '  '
  }
  if (indentLevel > 0) {
    indent += '| '
  }
  return indent
}

var oldGroup = console.group

console.group = function() {
  // log to the JS context
  oldGroup && oldGroup.apply(this, arguments)
  indentLevel += 1
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP, {
      plugin: String(context.scriptPath),
      collapsed: false,
    })
  }
}

var oldGroupCollapsed = console.groupCollapsed

console.groupCollapsed = function() {
  // log to the JS context
  oldGroupCollapsed && oldGroupCollapsed.apply(this, arguments)
  indentLevel += 1
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP, {
      plugin: String(context.scriptPath),
      collapsed: true
    })
  }
}

var oldGroupEnd = console.groupEnd

console.groupEnd = function() {
  // log to the JS context
  oldGroupEnd && oldGroupEnd.apply(this, arguments)
  indentLevel -= 1
  if (indentLevel < 0) {
    indentLevel = 0
  }
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP_END, {
      plugin: context.scriptPath,
    })
  }
}

var counts = {}
var oldCount = console.count

console.count = function(label) {
  label = typeof label !== 'undefined' ? label : 'Global'
  counts[label] = (counts[label] || 0) + 1

  // log to the JS context
  oldCount && oldCount.apply(this, arguments)
  return logEverywhere('log', [label + ': ' + counts[label]])
}

var timers = {}
var oldTime = console.time

console.time = function(label) {
  // log to the JS context
  oldTime && oldTime.apply(this, arguments)

  label = typeof label !== 'undefined' ? label : 'default'
  if (timers[label]) {
    return logEverywhere('warn', ['Timer "' + label + '" already exists'])
  }

  timers[label] = Date.now()
  return
}

var oldTimeEnd = console.timeEnd

console.timeEnd = function(label) {
  // log to the JS context
  oldTimeEnd && oldTimeEnd.apply(this, arguments)

  label = typeof label !== 'undefined' ? label : 'default'
  if (!timers[label]) {
    return logEverywhere('warn', ['Timer "' + label + '" does not exist'])
  }

  var duration = Date.now() - timers[label]
  delete timers[label]
  return logEverywhere('log', [label + ': ' + (duration / 1000) + 'ms'])
}

var oldLog = console.log

console.log = function() {
  // log to the JS context
  oldLog && oldLog.apply(this, arguments)
  return logEverywhere('log', arguments)
}

var oldWarn = console.warn

console.warn = function() {
  // log to the JS context
  oldWarn && oldWarn.apply(this, arguments)
  return logEverywhere('warn', arguments)
}

var oldError = console.error

console.error = function() {
  // log to the JS context
  oldError && oldError.apply(this, arguments)
  return logEverywhere('error', arguments)
}

var oldAssert = console.assert

console.assert = function(condition, text) {
  // log to the JS context
  oldAssert && oldAssert.apply(this, arguments)
  if (!condition) {
    return logEverywhere('assert', [text])
  }
  return undefined
}

var oldInfo = console.info

console.info = function() {
  // log to the JS context
  oldInfo && oldInfo.apply(this, arguments)
  return logEverywhere('info', arguments)
}

var oldClear = console.clear

console.clear = function() {
  oldClear && oldClear()
  if (true) {
    return sketchDebugger.sendToDebugger(actions.CLEAR_LOGS)
  }
}

console._skpmEnabled = true

module.exports = console

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */

module.exports = function prepareStackTrace(stackTrace) {
  var stack = stackTrace.split('\n')
  stack = stack.map(function (s) {
    return s.replace(/\sg/, '')
  })

  stack = stack.map(function (entry) {
    // entry is something like `functionName@path/to/my/file:line:column`
    // or `path/to/my/file:line:column`
    // or `path/to/my/file`
    // or `path/to/@my/file:line:column`
    var parts = entry.split('@')
    var fn = parts.shift()
    var filePath = parts.join('@') // the path can contain @

    if (fn.indexOf('/Users/') === 0) {
      // actually we didn't have a fn so just put it back in the filePath
      filePath = fn + (filePath ? ('@' + filePath) : '')
      fn = null
    }

    if (!filePath) {
      // we should always have a filePath, so if we don't have one here, it means that the function what actually anonymous and that it is the filePath instead
      filePath = entry
      fn = null
    }

    var filePathParts = filePath.split(':')
    filePath = filePathParts[0]

    // the file is the last part of the filePath
    var file = filePath.split('/')
    file = file[file.length - 1]

    return {
      fn: fn,
      file: file,
      filePath: filePath,
      line: filePathParts[1],
      column: filePathParts[2],
    }
  })

  return stack
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function toArray(object) {
  if (Array.isArray(object)) {
    return object
  }
  var arr = []
  for (var j = 0; j < (object || []).length; j += 1) {
    arr.push(object[j])
  }
  return arr
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (context) {
  var libraries = _sketch2['default'].getLibraries().filter(function (l) {
    return l.valid && l.enabled;
  });

  // create the alertWindow UI
  var alertWindow = (0, _createAlertWindow2['default'])(context);
  alertWindow.addAccessoryView((0, _getOptionSelected2['default'])(libraries));
  alertWindow.addButtonWithTitle('Switch');
  alertWindow.addButtonWithTitle('Cancel');

  // create the radioButtons
  var swapType = (0, _createRadioButtons2['default'])(["Apply to document", "Apply to selection"], 0);
  alertWindow.addAccessoryView(swapType);

  (0, _analytics2['default'])(context, "Open Camilo", "Alert", "UI");

  if (alertWindow.runModal() == NSAlertFirstButtonReturn) {
    var chosenLibraryName = String(alertWindow.viewAtIndex(0).stringValue());
    var lib = libraries.find(function (l) {
      return l.name === chosenLibraryName;
    });
    var doc = _sketch2['default'].getSelectedDocument();

    // get the info from radioButtons
    // - if 0 selected it will apply to document
    // - if 1 selected it will apply to selection
    if (swapType.selectedCell().tag() == 0) {
      (0, _switchLibrary2['default'])(doc, lib);
      (0, _analytics2['default'])(context, 'Replace document with', lib.name, 'Library');
    }

    if (swapType.selectedCell().tag() == 1) {
      (0, _switchSelection2['default'])(doc, lib);
      (0, _analytics2['default'])(context, 'Replace selected with', lib.name, 'Library');
    }

    _sketch2['default'].UI.message('\uD83C\uDF89 \uD83C\uDF88 \uD83D\uDE4C\uD83C\uDFFC  Applied theme from ' + String(lib.name) + '  \uD83D\uDE4C\uD83C\uDFFC \uD83C\uDF89 \uD83C\uDF88');
  }
};

var _sketch = __webpack_require__(4);

var _sketch2 = _interopRequireDefault(_sketch);

var _analytics = __webpack_require__(5);

var _analytics2 = _interopRequireDefault(_analytics);

var _createRadioButtons = __webpack_require__(6);

var _createRadioButtons2 = _interopRequireDefault(_createRadioButtons);

var _switchLibrary = __webpack_require__(7);

var _switchLibrary2 = _interopRequireDefault(_switchLibrary);

var _switchSelection = __webpack_require__(12);

var _switchSelection2 = _interopRequireDefault(_switchSelection);

var _getOptionSelected = __webpack_require__(20);

var _getOptionSelected2 = _interopRequireDefault(_getOptionSelected);

var _createAlertWindow = __webpack_require__(21);

var _createAlertWindow2 = _interopRequireDefault(_createAlertWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createRadioButtons;
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

/***/ }),
/* 7 */
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

var _mapSharedStyles = __webpack_require__(8);

var _mapSharedStyles2 = _interopRequireDefault(_mapSharedStyles);

var _replaceSymbols2 = __webpack_require__(9);

var _replaceSymbols3 = _interopRequireDefault(_replaceSymbols2);

var _replaceOverrides = __webpack_require__(10);

var _replaceOverrides2 = _interopRequireDefault(_replaceOverrides);

var _replaceSharedStyles = __webpack_require__(11);

var _replaceSharedStyles2 = _interopRequireDefault(_replaceSharedStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/***/ }),
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (document, library) {

  var selection = document.selectedLayers.layers;
  var lookup = (0, _mapSymbolsAndStyles2['default'])(document, library);
  var docSymbols = document.getSymbols();

  (0, _overridesFromPagesTree2['default'])(selection, lookup, docSymbols, document.getSharedLayerStyles(), document.getSharedTextStyles());

  // reload the inspector to make sure we show the latest changes
  document.sketchObject.reloadInspector();
};

var _mapSymbolsAndStyles = __webpack_require__(13);

var _mapSymbolsAndStyles2 = _interopRequireDefault(_mapSymbolsAndStyles);

var _overridesFromPagesTree = __webpack_require__(14);

var _overridesFromPagesTree2 = _interopRequireDefault(_overridesFromPagesTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/***/ }),
/* 13 */
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
    text: createLookup(library.getImportableTextStyleReferencesForDocument(document)),
    symbol: createLookup(library.getImportableSymbolReferencesForDocument(document))
  };
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = overridesFromPagesTree;
function overridesFromPagesTree(layers, lookup, documentSymbols, documentLayerStyles, documentTextStyles) {

  // iterate layers tree to find:
  // 1 - symbols
  // 2 - symbol overrides
  //     2.1 - symbolID
  //     2.2 - layerStyle
  //     2.3 - textStyle
  // 3 - shared styles

  layers.forEach(function (layers) {
    if (layers.layers != undefined) {
      overridesFromPagesTree(layers.layers, lookup, documentSymbols, documentLayerStyles, documentTextStyles);
    }
    if (layers.layers == undefined) {
      if (layers.type == 'SymbolInstance') {
        // replaceSelectedSymbols(layers, librarysymbols)
        console.log('found symbol');
      }
      if (layers.overrides != undefined) {
        layers.overrides.forEach(function (overrides) {
          if (overrides.property == 'symbolID') {
            // replaceLayerOverrides(overrides.value, overrides, documentSymbols, lookup.symbol, 'symbolId')
            console.log('found symbol override');
          }
          if (overrides.property == 'layerStyle') {
            // replaceLayerOverrides(overrides.value, overrides, documentLayerStyles, lookup.layer, 'id')
            console.log('found layerStyle override');
          }
          if (overrides.property == 'textStyle') {
            // replaceLayerOverrides(overrides.value, overrides, documentTextStyles, lookup.text, 'id')
            console.log('found textStyle override');
          }
        });
      } else {
        if (layers.sharedStyleId != null) {
          // replaceLayerSharedStyles(layers, layers.sharedStyleId, documentlayerstyles, librarylayerstyles, documenttextstyles, librarytextstyles)
          console.log('found layer with style');
        }
      }
    }
  });
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var prepareValue = __webpack_require__(16)

module.exports.toArray = __webpack_require__(2)
module.exports.prepareStackTrace = __webpack_require__(1)
module.exports.prepareValue = prepareValue
module.exports.prepareObject = prepareValue.prepareObject
module.exports.prepareArray = prepareValue.prepareArray


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */
var prepareStackTrace = __webpack_require__(1)
var toArray = __webpack_require__(2)

function prepareArray(array, options) {
  return array.map(function(i) {
    return prepareValue(i, options)
  })
}

function prepareObject(object, options) {
  const deep = {}
  Object.keys(object).forEach(function(key) {
    deep[key] = prepareValue(object[key], options)
  })
  return deep
}

function getName(x) {
  return {
    type: 'String',
    primitive: 'String',
    value: String(x.name()),
  }
}

function getSelector(x) {
  return {
    type: 'String',
    primitive: 'String',
    value: String(x.selector()),
  }
}

function introspectMochaObject(value, options) {
  options = options || {}
  var mocha = value.class().mocha()
  var introspection = {
    properties: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['properties' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getName),
    },
    classMethods: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['classMethods' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getSelector),
    },
    instanceMethods: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['instanceMethods' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getSelector),
    },
    protocols: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['protocols' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getName),
    },
  }
  if (mocha.treeAsDictionary && options.withTree) {
    introspection.treeAsDictionary = {
      type: 'Object',
      primitive: 'Object',
      value: prepareObject(mocha.treeAsDictionary())
    }
  }
  return introspection
}

function prepareValue(value, options) {
  var type = 'String'
  var primitive = 'String'
  const typeOf = typeof value
  if (value instanceof Error) {
    type = 'Error'
    primitive = 'Error'
    value = {
      message: value.message,
      name: value.name,
      stack: prepareStackTrace(value.stack),
    }
  } else if (Array.isArray(value)) {
    type = 'Array'
    primitive = 'Array'
    value = prepareArray(value, options)
  } else if (value === null || value === undefined || Number.isNaN(value)) {
    type = 'Empty'
    primitive = 'Empty'
    value = String(value)
  } else if (typeOf === 'object') {
    if (value.isKindOfClass && typeof value.class === 'function') {
      type = String(value.class())
      // TODO: Here could come some meta data saved as value
      if (
        type === 'NSDictionary' ||
        type === '__NSDictionaryM' ||
        type === '__NSSingleEntryDictionaryI' ||
        type === '__NSDictionaryI' ||
        type === '__NSCFDictionary'
      ) {
        primitive = 'Object'
        value = prepareObject(Object(value), options)
      } else if (
        type === 'NSArray' ||
        type === 'NSMutableArray' ||
        type === '__NSArrayM' ||
        type === '__NSSingleObjectArrayI' ||
        type === '__NSArray0'
      ) {
        primitive = 'Array'
        value = prepareArray(toArray(value), options)
      } else if (
        type === 'NSString' ||
        type === '__NSCFString' ||
        type === 'NSTaggedPointerString' ||
        type === '__NSCFConstantString'
      ) {
        primitive = 'String'
        value = String(value)
      } else if (type === '__NSCFNumber' || type === 'NSNumber') {
        primitive = 'Number'
        value = 0 + value
      } else if (type === 'MOStruct') {
        type = String(value.name())
        primitive = 'Object'
        value = value.memberNames().reduce(function(prev, k) {
          prev[k] = prepareValue(value[k], options)
          return prev
        }, {})
      } else if (value.class().mocha) {
        primitive = 'Mocha'
        value = (options || {}).skipMocha ? type : introspectMochaObject(value, options)
      } else {
        primitive = 'Unknown'
        value = type
      }
    } else {
      type = 'Object'
      primitive = 'Object'
      value = prepareObject(value, options)
    }
  } else if (typeOf === 'function') {
    type = 'Function'
    primitive = 'Function'
    value = String(value)
  } else if (value === true || value === false) {
    type = 'Boolean'
    primitive = 'Boolean'
  } else if (typeOf === 'number') {
    primitive = 'Number'
    type = 'Number'
  }

  return {
    value,
    type,
    primitive,
  }
}

module.exports = prepareValue
module.exports.prepareObject = prepareObject
module.exports.prepareArray = prepareArray


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */
var remoteWebview = __webpack_require__(18)

module.exports.identifier = 'skpm.debugger'

module.exports.isDebuggerPresent = remoteWebview.isWebviewPresent.bind(
  this,
  module.exports.identifier
)

module.exports.sendToDebugger = function sendToDebugger(name, payload) {
  return remoteWebview.sendToWebview(
    module.exports.identifier,
    'sketchBridge(' +
      JSON.stringify({
        name: name,
        payload: payload,
      }) +
      ');'
  )
}


/***/ }),
/* 18 */
/***/ (function(module, exports) {

/* globals NSThread */

var threadDictionary = NSThread.mainThread().threadDictionary()

module.exports.isWebviewPresent = function isWebviewPresent (identifier) {
  return !!threadDictionary[identifier]
}

module.exports.sendToWebview = function sendToWebview (identifier, evalString) {
  if (!module.exports.isWebviewPresent(identifier)) {
    throw new Error('Webview ' + identifier + ' not found')
  }

  var webview = threadDictionary[identifier]
    .contentView()
    .subviews()
  webview = webview[webview.length - 1]

  return webview.stringByEvaluatingJavaScriptFromString(evalString)
}


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports.SET_TREE = 'elements/SET_TREE'
module.exports.SET_PAGE_METADATA = 'elements/SET_PAGE_METADATA'
module.exports.SET_LAYER_METADATA = 'elements/SET_LAYER_METADATA'
module.exports.ADD_LOG = 'logs/ADD_LOG'
module.exports.CLEAR_LOGS = 'logs/CLEAR_LOGS'
module.exports.GROUP = 'logs/GROUP'
module.exports.GROUP_END = 'logs/GROUP_END'
module.exports.TIMER_START = 'logs/TIMER_START'
module.exports.TIMER_END = 'logs/TIMER_END'
module.exports.ADD_REQUEST = 'network/ADD_REQUEST'
module.exports.SET_RESPONSE = 'network/SET_RESPONSE'
module.exports.ADD_ACTION = 'actions/ADD_ACTION'
module.exports.SET_SCRIPT_RESULT = 'playground/SET_SCRIPT_RESULT'


/***/ }),
/* 20 */
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
/* 21 */
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
  alertWindow.setInformativeText("Select a theme library to switch 🎉 with");

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
