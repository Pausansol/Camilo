var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

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

/***/ "./src/create-color-with-swatch.js":
/*!*****************************************!*\
  !*** ./src/create-color-with-swatch.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (newSwatch) {
  var newColor = MSColor.blackColor();
  newColor.setSwatch(newSwatch.localSwatch());
  return newColor;
});

/***/ }),

/***/ "./src/get-matching-swatch.js":
/*!************************************!*\
  !*** ./src/get-matching-swatch.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (swatchID, doc, librarySwatches) {
  var currentSwatch = doc.swatchWithID(String(swatchID));

  if (currentSwatch === null) {
    return;
  } else {
    var newSwatch = librarySwatches.find(function (swatch) {
      return String(swatch.name()) === String(currentSwatch.name());
    });
    return newSwatch;
  }
});

/***/ }),

/***/ "./src/import-swatch-from-library.js":
/*!*******************************************!*\
  !*** ./src/import-swatch-from-library.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (matchingSwatch, nativeLibrary) {
  var newSwatch = MSForeignSwatch.alloc().initWithOriginalObject_inLibrary(matchingSwatch, nativeLibrary);
  var addNewSwatch = context.document.documentData().addForeignSwatch(newSwatch);
  return newSwatch;
});

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

/***/ "./src/main-view.js":
/*!**************************!*\
  !*** ./src/main-view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch/settings */ "sketch/settings");
/* harmony import */ var sketch_settings__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_settings__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _analytics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./analytics */ "./src/analytics.js");
/* harmony import */ var _switch_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./switch-library */ "./src/switch-library.js");
/* harmony import */ var _switch_selection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./switch-selection */ "./src/switch-selection.js");
/* harmony import */ var _ui_create_floating_panel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui/create-floating-panel */ "./src/ui/create-floating-panel.js");
/* harmony import */ var _ui_create_scroll_view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui/create-scroll-view */ "./src/ui/create-scroll-view.js");
/* harmony import */ var _ui_create_view__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ui/create-view */ "./src/ui/create-view.js");
/* harmony import */ var _ui_create_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ui/create-button */ "./src/ui/create-button.js");
/* harmony import */ var _ui_create_image__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ui/create-image */ "./src/ui/create-image.js");
/* harmony import */ var _ui_create_help_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ui/create-help-button */ "./src/ui/create-help-button.js");
/* harmony import */ var _ui_create_text__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ui/create-text */ "./src/ui/create-text.js");
/* harmony import */ var _ui_create_divider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ui/create-divider */ "./src/ui/create-divider.js");
/* harmony import */ var _ui_create_library_preview__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ui/create-library-preview */ "./src/ui/create-library-preview.js");
/* harmony import */ var _ui_create_radio_buttons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ui/create-radio-buttons */ "./src/ui/create-radio-buttons.js");
/* harmony import */ var _replace_selected_swatches__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./replace-selected-swatches */ "./src/replace-selected-swatches.js");
















/* harmony default export */ __webpack_exports__["default"] = (function (context, panelStyles, theme, libraries) {
  //Settings
  var lastSelected = sketch_settings__WEBPACK_IMPORTED_MODULE_1___default.a.sessionVariable('Selected');
  var panelContent = Object(_ui_create_view__WEBPACK_IMPORTED_MODULE_7__["default"])(NSMakeRect(0, 0, panelStyles.panelWidth, panelStyles.panelHeight - panelStyles.panelHeader));
  var swapType = Object(_ui_create_radio_buttons__WEBPACK_IMPORTED_MODULE_14__["default"])(['Apply to selection', 'Apply to document'], lastSelected);
  var themesTitle = Object(_ui_create_text__WEBPACK_IMPORTED_MODULE_11__["default"])(theme, panelStyles.blackText, panelStyles.whiteText, panelStyles.sectionFont, 'Libraries', NSMakeRect(20, 40, 100, 18));
  var optionsTitle = Object(_ui_create_text__WEBPACK_IMPORTED_MODULE_11__["default"])(theme, panelStyles.blackText, panelStyles.whiteText, panelStyles.sectionFont, 'Options', NSMakeRect(20, 334, 100, 18));
  var scrollViewMask = Object(_ui_create_image__WEBPACK_IMPORTED_MODULE_9__["default"])(theme, NSMakeRect(20, 75, 338, 239), 'scrollViewMask.png', 'scrollViewMaskDark.png');
  var libraryList = Object(_ui_create_scroll_view__WEBPACK_IMPORTED_MODULE_6__["default"])(theme, NSMakeRect(20, 75, 338, 239));
  var addComponentsToPanel = [themesTitle, optionsTitle, swapType, libraryList, scrollViewMask].forEach(function (i) {
    return panelContent.addSubview(i);
  });
  var itemContent = Object(_ui_create_view__WEBPACK_IMPORTED_MODULE_7__["default"])(NSMakeRect(0, 0, panelStyles.itemWidth, panelStyles.itemHeight * libraries.length));
  var count = 0;
  libraries.forEach(function (library, i) {
    var lib = library;
    var nativeLibrary = lib.sketchObject;
    var nativeLibraryLayers = library.sketchObject.document().documentData().pages();
    var listItem = Object(_ui_create_view__WEBPACK_IMPORTED_MODULE_7__["default"])(NSMakeRect(0, panelStyles.itemHeight * count, panelStyles.itemWidth, panelStyles.itemHeight));
    var imageMask = Object(_ui_create_image__WEBPACK_IMPORTED_MODULE_9__["default"])(theme, NSMakeRect(20, 15, 40, 40), 'mask.png', 'maskDark.png');
    var imageArea = Object(_ui_create_library_preview__WEBPACK_IMPORTED_MODULE_13__["default"])(theme, nativeLibraryLayers, NSMakeRect(20, 15, 40, 40));
    var artboardSubtitle = Object(_ui_create_text__WEBPACK_IMPORTED_MODULE_11__["default"])(theme, panelStyles.darkTextGrey, panelStyles.lightTextGrey, panelStyles.subtitleFont, String(library.libraryType), NSMakeRect(panelStyles.rightColX, 38, panelStyles.rightColWidth - 88, 14));
    var artboardTitle = Object(_ui_create_text__WEBPACK_IMPORTED_MODULE_11__["default"])(theme, panelStyles.blackText, panelStyles.whiteText, panelStyles.titleFont, String(library.name), NSMakeRect(panelStyles.rightColX, 20, panelStyles.rightColWidth - 88, 18));
    var divider = Object(_ui_create_divider__WEBPACK_IMPORTED_MODULE_12__["default"])(theme, NSMakeRect(20, panelStyles.itemHeight - 1, panelStyles.itemWidth - 40, 0.5));
    var librariesController = AppController.sharedInstance().librariesController();
    var button = NSButton.alloc().initWithFrame(NSMakeRect(237, 18, 88, 36));
    button.setTitle('Swap');
    button.setBezelStyle(NSRoundedBezelStyle);
    button.setAction('callAction:');
    button.setCOSJSTargetFunction(function () {
      var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
      var nativeLibSwatches = nativeLibrary.document().documentData().allSwatches();

      if (swapType.selectedCell().tag() === 0) {
        sketch_settings__WEBPACK_IMPORTED_MODULE_1___default.a.setSessionVariable('Selected', 0);
        var selectedLayers = doc.selectedLayers;

        if (selectedLayers.length < 1) {
          sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Select a layer");
        } else {
          Object(_switch_selection__WEBPACK_IMPORTED_MODULE_4__["default"])(doc, lib);
          Object(_replace_selected_swatches__WEBPACK_IMPORTED_MODULE_15__["default"])(selectedLayers, nativeLibSwatches, nativeLibrary, librariesController);
          Object(_analytics__WEBPACK_IMPORTED_MODULE_2__["default"])(context, 'Replace selected with', lib.name, 'Library');
          sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("\uD83C\uDF89 \uD83C\uDF88 \uD83D\uDE4C\uD83C\uDFFC  Applied theme from ".concat(lib.name, "  \uD83D\uDE4C\uD83C\uDFFC \uD83C\uDF89 \uD83C\uDF88"));
        }
      }

      if (swapType.selectedCell().tag() === 1) {
        sketch_settings__WEBPACK_IMPORTED_MODULE_1___default.a.setSessionVariable('Selected', 1);
        var selectedPages = doc.pages;
        Object(_switch_library__WEBPACK_IMPORTED_MODULE_3__["default"])(doc, lib);
        Object(_replace_selected_swatches__WEBPACK_IMPORTED_MODULE_15__["default"])(selectedPages, nativeLibSwatches, nativeLibrary, librariesController);
        Object(_analytics__WEBPACK_IMPORTED_MODULE_2__["default"])(context, 'Replace document with', lib.name, 'Library');
        sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("\uD83C\uDF89 \uD83C\uDF88 \uD83D\uDE4C\uD83C\uDFFC  Applied theme from ".concat(lib.name, "  \uD83D\uDE4C\uD83C\uDFFC \uD83C\uDF89 \uD83C\uDF88"));
      }
    });
    var addComponentsToList = [imageArea, imageMask, artboardSubtitle, artboardTitle, button, divider].forEach(function (i) {
      return listItem.addSubview(i);
    });
    itemContent.addSubview(listItem);
    count++;
  });
  libraryList.setDocumentView(itemContent);
  return panelContent;
});

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

/***/ "./src/replace-selected-swatches.js":
/*!******************************************!*\
  !*** ./src/replace-selected-swatches.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! util */ "util");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _replace_selected_swatches__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./replace-selected-swatches */ "./src/replace-selected-swatches.js");
/* harmony import */ var _get_matching_swatch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./get-matching-swatch */ "./src/get-matching-swatch.js");
/* harmony import */ var _import_swatch_from_library__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./import-swatch-from-library */ "./src/import-swatch-from-library.js");
/* harmony import */ var _create_color_with_swatch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./create-color-with-swatch */ "./src/create-color-with-swatch.js");
/* harmony import */ var _replace_selected_symbol_swatches__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./replace-selected-symbol-swatches */ "./src/replace-selected-symbol-swatches.js");







/* harmony default export */ __webpack_exports__["default"] = (function (docLayers, nativeLibSwatches, nativeLibrary, librariesController) {
  docLayers.forEach(function (layer) {
    var nativeLayer = layer.sketchObject;

    switch (String(nativeLayer.class())) {
      case "MSTextLayer":
        if (String(nativeLayer.style().textStyle().encodedAttributes().MSAttributedStringColorAttribute.swatchID()) != 'null') {
          var matchingSwatch = Object(_get_matching_swatch__WEBPACK_IMPORTED_MODULE_3__["default"])(nativeLayer.style().textStyle().encodedAttributes().MSAttributedStringColorAttribute.swatchID(), context.document.documentData(), nativeLibSwatches);
          var newSwatch = Object(_import_swatch_from_library__WEBPACK_IMPORTED_MODULE_4__["default"])(matchingSwatch, nativeLibrary);
          var newColor = Object(_create_color_with_swatch__WEBPACK_IMPORTED_MODULE_5__["default"])(newSwatch);
          nativeLayer.setTextColor(newColor);
        }

        if (nativeLayer.style().fills().length > 0) {
          nativeLayer.style().fills().forEach(function (fill) {
            if (String(fill.color().swatchID()) != 'null') {
              var _matchingSwatch = Object(_get_matching_swatch__WEBPACK_IMPORTED_MODULE_3__["default"])(fill.color().swatchID(), context.document.documentData(), nativeLibSwatches);

              var _newSwatch = Object(_import_swatch_from_library__WEBPACK_IMPORTED_MODULE_4__["default"])(_matchingSwatch, nativeLibrary);

              fill.color().setSwatch(_newSwatch.localSwatch());
            }
          });
        }

        if (nativeLayer.style().borders().length > 0) {
          nativeLayer.style().borders().forEach(function (border) {
            if (String(border.color().swatchID()) != 'null') {
              var _matchingSwatch2 = Object(_get_matching_swatch__WEBPACK_IMPORTED_MODULE_3__["default"])(border.color().swatchID(), context.document.documentData(), nativeLibSwatches);

              var _newSwatch2 = Object(_import_swatch_from_library__WEBPACK_IMPORTED_MODULE_4__["default"])(_matchingSwatch2, nativeLibrary);

              border.color().setSwatch(_newSwatch2.localSwatch());
            }
          });
        }

        break;

      case "MSSymbolInstance":
        var symbolMaster = nativeLayer.symbolMaster();
        var overrides = Object(util__WEBPACK_IMPORTED_MODULE_0__["toArray"])(MSAvailableOverride.flattenAvailableOverrides(nativeLayer.availableOverrides()));

        if (overrides.length > 0) {
          overrides.forEach(function (override) {
            Object(_replace_selected_symbol_swatches__WEBPACK_IMPORTED_MODULE_6__["default"])(override, nativeLayer, symbolMaster, nativeLibSwatches, nativeLibrary, librariesController);
          });
        }

        break;

      default:
        if (nativeLayer.style().fills().length > 0) {
          nativeLayer.style().fills().forEach(function (fill) {
            if (String(fill.color().swatchID()) != 'null') {
              var _matchingSwatch3 = Object(_get_matching_swatch__WEBPACK_IMPORTED_MODULE_3__["default"])(fill.color().swatchID(), context.document.documentData(), nativeLibSwatches);

              var _newSwatch3 = Object(_import_swatch_from_library__WEBPACK_IMPORTED_MODULE_4__["default"])(_matchingSwatch3, nativeLibrary);

              fill.color().setSwatch(_newSwatch3.localSwatch());
            }
          });
        }

        if (nativeLayer.style().borders().length > 0) {
          nativeLayer.style().borders().forEach(function (border) {
            if (String(border.color().swatchID()) != 'null') {
              var _matchingSwatch4 = Object(_get_matching_swatch__WEBPACK_IMPORTED_MODULE_3__["default"])(border.color().swatchID(), context.document.documentData(), nativeLibSwatches);

              var _newSwatch4 = Object(_import_swatch_from_library__WEBPACK_IMPORTED_MODULE_4__["default"])(_matchingSwatch4, nativeLibrary);

              border.color().setSwatch(_newSwatch4.localSwatch());
            }
          });
        }

        break;
    } // Iterate through layers array


    if (typeof nativeLayer.layers === 'function') {
      Object(_replace_selected_swatches__WEBPACK_IMPORTED_MODULE_2__["default"])(layer.layers, nativeLibSwatches, nativeLibrary);
    }
  });
});

/***/ }),

/***/ "./src/replace-selected-symbol-swatches.js":
/*!*************************************************!*\
  !*** ./src/replace-selected-symbol-swatches.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! util */ "util");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _get_matching_swatch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get-matching-swatch */ "./src/get-matching-swatch.js");
/* harmony import */ var _import_swatch_from_library__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./import-swatch-from-library */ "./src/import-swatch-from-library.js");
/* harmony import */ var _create_color_with_swatch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./create-color-with-swatch */ "./src/create-color-with-swatch.js");
/* harmony import */ var _replace_selected_symbol_swatches__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./replace-selected-symbol-swatches */ "./src/replace-selected-symbol-swatches.js");






/* harmony default export */ __webpack_exports__["default"] = (function (override, nativeLayer, symbolMaster, nativeLibSwatches, nativeLibrary, librariesController) {
  if (String(override.currentValue().class()) == 'MSColor' || String(override.currentValue().class()) == 'MSImmutableColor') {
    if (override.hasOverride() === 0) {
      var currentSwatchID = override.currentValue().swatchID(); // If there is a swatch with same ID in current document

      var match = context.document.documentData().swatchWithID(String(currentSwatchID));

      if (match == null) {
        var nativeLibFromSymbol = librariesController.libraryForShareableObject(symbolMaster);
        var overrideValue = override.overridePoint();
        var matchingSwatch = Object(_get_matching_swatch__WEBPACK_IMPORTED_MODULE_2__["default"])(override.currentValue().swatchID(), nativeLibFromSymbol.document().documentData(), nativeLibSwatches);

        if (matchingSwatch === undefined) {
          var pe = nativeLibFromSymbol.document().documentData().allSymbols();
          pe.forEach(function (p) {
            if (librariesController.libraryForShareableObject(p) != null) {
              var le = librariesController.libraryForShareableObject(p);
              var overrides = Object(util__WEBPACK_IMPORTED_MODULE_0__["toArray"])(MSAvailableOverride.flattenAvailableOverrides(p.availableOverrides()));
              overrides.forEach(function (m) {
                if (String(m.currentValue().class()) == 'MSColor' || String(m.currentValue().class()) == 'MSImmutableColor') {
                  var _matchingSwatch = Object(_get_matching_swatch__WEBPACK_IMPORTED_MODULE_2__["default"])(m.currentValue().swatchID(), le.document().documentData(), nativeLibSwatches);

                  if (_matchingSwatch === undefined) {
                    Object(_replace_selected_symbol_swatches__WEBPACK_IMPORTED_MODULE_5__["default"])(override, nativeLayer, p, nativeLibSwatches, le, librariesController);
                  } else {
                    var newSwatch = Object(_import_swatch_from_library__WEBPACK_IMPORTED_MODULE_3__["default"])(_matchingSwatch, le);
                    var newColor = Object(_create_color_with_swatch__WEBPACK_IMPORTED_MODULE_4__["default"])(newSwatch);
                    nativeLayer.setValue_forOverridePoint(newColor, overrideValue);
                  }
                }
              });
            }
          });
        } else {
          var newSwatch = Object(_import_swatch_from_library__WEBPACK_IMPORTED_MODULE_3__["default"])(matchingSwatch, nativeLibrary);
          var newColor = Object(_create_color_with_swatch__WEBPACK_IMPORTED_MODULE_4__["default"])(newSwatch);
          nativeLayer.setValue_forOverridePoint(newColor, overrideValue);
        }
      } else {
        var _overrideValue = override.overridePoint();

        var _matchingSwatch2 = Object(_get_matching_swatch__WEBPACK_IMPORTED_MODULE_2__["default"])(override.currentValue().swatchID(), context.document.documentData(), nativeLibSwatches);

        var _newSwatch = Object(_import_swatch_from_library__WEBPACK_IMPORTED_MODULE_3__["default"])(_matchingSwatch2, nativeLibrary);

        var _newColor = Object(_create_color_with_swatch__WEBPACK_IMPORTED_MODULE_4__["default"])(_newSwatch);

        nativeLayer.setValue_forOverridePoint(_newColor, _overrideValue);
      }
    } else {
      var _overrideValue2 = override.overridePoint();

      var _matchingSwatch3 = Object(_get_matching_swatch__WEBPACK_IMPORTED_MODULE_2__["default"])(override.currentValue().swatchID(), context.document.documentData(), nativeLibSwatches);

      var _newSwatch2 = Object(_import_swatch_from_library__WEBPACK_IMPORTED_MODULE_3__["default"])(_matchingSwatch3, nativeLibrary);

      var _newColor2 = Object(_create_color_with_swatch__WEBPACK_IMPORTED_MODULE_4__["default"])(_newSwatch2);

      nativeLayer.setValue_forOverridePoint(_newColor2, _overrideValue2);
    }
  }
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
/* harmony default export */ __webpack_exports__["default"] = (function (libraryStyles, lookup, library) {
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

/***/ "./src/replace-swatches.js":
/*!*********************************!*\
  !*** ./src/replace-swatches.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (docData, librarySwatches, docSwatches) {
  docSwatches.forEach(function (swatch) {
    var importableSwatch = librarySwatches.find(function (sw) {
      return sw.name == swatch.name();
    });

    if (!importableSwatch) {
      return;
    } else {
      var newSwatch = importableSwatch.import();
      docData.replaceInstancesOfColor_withColor_ignoreAlphaWhenMatching_replaceAlphaOfOriginalColor(swatch.makeReferencingColor(), newSwatch.referencingColor, false, false);
    }
  });
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
/* harmony import */ var _ui_create_floating_panel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui/create-floating-panel */ "./src/ui/create-floating-panel.js");
/* harmony import */ var _ui_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui/styles */ "./src/ui/styles.js");
/* harmony import */ var _main_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./main-view */ "./src/main-view.js");





var theme = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.getTheme();
var librariesArray = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getLibraries().filter(function (l) {
  return l.valid && l.enabled;
});
var libraries = librariesArray.sort(function (a, b) {
  return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
});

var pluginName = __command.pluginBundle().name();

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var panelStyles = Object(_ui_styles__WEBPACK_IMPORTED_MODULE_3__["default"])();
  var panelContent = Object(_main_view__WEBPACK_IMPORTED_MODULE_4__["default"])(context, panelStyles, theme, libraries);
  var fiber = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Async.createFiber();
  var panel = Object(_ui_create_floating_panel__WEBPACK_IMPORTED_MODULE_2__["default"])(theme, pluginName, NSMakeRect(0, 0, panelStyles.panelWidth, panelStyles.panelHeight));
  var panelClose = panel.standardWindowButton(NSWindowCloseButton);
  panelClose.setCOSJSTargetFunction(function () {
    panel.close();
    fiber.cleanup();
  });
  panel.contentView().addSubview(panelContent);
  Object(_analytics__WEBPACK_IMPORTED_MODULE_1__["default"])(context, 'Open Camilo', 'Alert', 'UI');
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
/* harmony import */ var _replace_swatches__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./replace-swatches */ "./src/replace-swatches.js");





/* harmony default export */ __webpack_exports__["default"] = (function (document, library) {
  var lookup = Object(_map_shared_styles__WEBPACK_IMPORTED_MODULE_0__["default"])(document, library);
  var librarySwatches = library.getImportableSwatchReferencesForDocument(document); // replace the symbols

  var _replaceSymbols = Object(_replace_symbols__WEBPACK_IMPORTED_MODULE_1__["default"])(document, library),
      symbolsMap = _replaceSymbols.symbolsMap,
      docSymbolInstances = _replaceSymbols.docSymbolInstances; // replace the styles


  var layerStylesMap = Object(_replace_shared_styles__WEBPACK_IMPORTED_MODULE_3__["default"])(document.getSharedLayerStyles(), lookup.layer, library); // replace the textStyles

  var textStylesMap = Object(_replace_shared_styles__WEBPACK_IMPORTED_MODULE_3__["default"])(document.getSharedTextStyles(), lookup.text, library); // replace the overrides

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

/***/ "./src/ui/create-button.js":
/*!*********************************!*\
  !*** ./src/ui/create-button.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createButton; });
function createButton(label, frame) {
  var button = NSButton.alloc().initWithFrame(frame);
  button.setTitle(label);
  button.setBezelStyle(NSRoundedBezelStyle);
  button.setAction('callAction:');
  return button;
}

/***/ }),

/***/ "./src/ui/create-divider.js":
/*!**********************************!*\
  !*** ./src/ui/create-divider.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createDivider; });
function createDivider(theme, frame) {
  var divider = NSView.alloc().initWithFrame(frame);
  divider.setWantsLayer(1);

  if (theme === 'dark') {
    divider.setBackgroundColor(NSColor.colorWithCalibratedRed_green_blue_alpha(0.22, 0.22, 0.22, 1));
  } else {
    divider.layer().setBackgroundColor(CGColorCreateGenericRGB(204 / 255, 204 / 255, 204 / 255, 1.0));
  }

  return divider;
}

/***/ }),

/***/ "./src/ui/create-floating-panel.js":
/*!*****************************************!*\
  !*** ./src/ui/create-floating-panel.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createFloatingPanel; });
function createFloatingPanel(theme, title, frame) {
  var panel = NSPanel.alloc().init();
  panel.setTitle(title);
  panel.setFrame_display(frame, true);
  panel.setStyleMask(NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask | NSFullSizeContentViewWindowMask);

  if (theme === 'dark') {
    panel.setBackgroundColor(NSColor.colorWithCalibratedRed_green_blue_alpha(0.2, 0.2, 0.2, 1));
  } else {
    panel.setBackgroundColor(NSColor.colorWithCalibratedRed_green_blue_alpha(1, 1, 1, 1));
  }

  panel.setLevel(NSFloatingWindowLevel);
  panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true);
  panel.standardWindowButton(NSWindowZoomButton).setHidden(true);
  panel.makeKeyAndOrderFront(null);
  panel.center();
  return panel;
}

/***/ }),

/***/ "./src/ui/create-help-button.js":
/*!**************************************!*\
  !*** ./src/ui/create-help-button.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createHelpButton; });
function createHelpButton(label, frame) {
  var button = NSButton.alloc().initWithFrame(frame);
  button.setTitle(label);
  button.setBezelStyle(NSHelpButtonBezelStyle);
  button.setAction('callAction:');
  return button;
}

/***/ }),

/***/ "./src/ui/create-image.js":
/*!********************************!*\
  !*** ./src/ui/create-image.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createImage; });
function createImage(theme, frame, imagePath, imagePathDark) {
  var image = NSImageView.alloc().initWithFrame(frame);

  if (theme === 'dark') {
    var mask = NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed(String(imagePathDark)).path());
    image.setImage(mask);
    image.setImageScaling(0);
  } else {
    var _mask = NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed(String(imagePath)).path());

    image.setImage(_mask);
    image.setImageScaling(0);
  }

  return image;
}

/***/ }),

/***/ "./src/ui/create-library-preview.js":
/*!******************************************!*\
  !*** ./src/ui/create-library-preview.js ***!
  \******************************************/
/*! exports provided: getLibraryPreview, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLibraryPreview", function() { return getLibraryPreview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createLibraryPreview; });
/* harmony import */ var _create_image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-image */ "./src/ui/create-image.js");

function getLibraryPreview(source) {
  var artboardGroups = NSMutableArray.array();
  source.forEach(function (page) {
    var predicate = NSPredicate.predicateWithFormat('className == %@ && name == %@', 'MSArtboardGroup', 'Library Preview');
    page.children().filteredArrayUsingPredicate(predicate).forEach(function (instance) {
      return artboardGroups.addObject(instance);
    });
  });

  if (artboardGroups.length > 0) {
    return artboardGroups[0];
  }
}
function createLibraryPreview(theme, source, frame) {
  var image = NSImageView.alloc().initWithFrame(frame);
  var libraryPreviewLayer = getLibraryPreview(source);

  if (libraryPreviewLayer != undefined || null) {
    var exportRequest = MSExportRequest.exportRequestsFromExportableLayer_inRect_useIDForName_(libraryPreviewLayer, libraryPreviewLayer.absoluteInfluenceRect(), false).firstObject();
    exportRequest.format = 'png';
    var colorSpace = NSColorSpace.sRGBColorSpace();
    var exporter = MSExporter.exporterForRequest_colorSpace_(exportRequest, colorSpace);
    var imageRep = exporter.bitmapImageRep();
    var libraryPreviewImage = NSImage.alloc().init().autorelease();
    libraryPreviewImage.addRepresentation(imageRep);
    image.setImage(libraryPreviewImage);
    image.setImageScaling(3);
    return image;
  } else {
    var _libraryPreviewImage = Object(_create_image__WEBPACK_IMPORTED_MODULE_0__["default"])(theme, frame, 'library.png', 'library.png');

    return _libraryPreviewImage;
  }
}

/***/ }),

/***/ "./src/ui/create-radio-buttons.js":
/*!****************************************!*\
  !*** ./src/ui/create-radio-buttons.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createRadioButtons; });
function createRadioButtons(options, selected, format) {
  var x = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;
  var y = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 375;
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

/***/ "./src/ui/create-scroll-view.js":
/*!**************************************!*\
  !*** ./src/ui/create-scroll-view.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createScrollView; });
function createScrollView(theme, frame) {
  var view = NSScrollView.alloc().initWithFrame(frame);

  if (theme === 'dark') {
    view.setBackgroundColor(NSColor.colorWithCalibratedRed_green_blue_alpha(0.17, 0.17, 0.17, 1));
  } else {
    view.setBackgroundColor(NSColor.colorWithCalibratedRed_green_blue_alpha(0.95, 0.95, 0.95, 1));
  }

  view.setHasVerticalScroller(1);
  return view;
}

/***/ }),

/***/ "./src/ui/create-text.js":
/*!*******************************!*\
  !*** ./src/ui/create-text.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createText; });
function createText(theme, color, colorDark, font, string, frame) {
  var field = NSTextField.alloc().initWithFrame(frame);
  field.setStringValue(string);
  field.setFont(font);
  field.setBezeled(0);
  field.setEditable(0);
  field.setDrawsBackground(false);
  field.setLineBreakMode(NSLineBreakByTruncatingTail); //Themes colors

  if (theme === 'dark') {
    field.setTextColor(colorDark);
  } else {
    field.setTextColor(color);
  }

  return field;
}

/***/ }),

/***/ "./src/ui/create-view.js":
/*!*******************************!*\
  !*** ./src/ui/create-view.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createView; });
function createView(frame) {
  var view = NSView.alloc().initWithFrame(frame);
  view.setFlipped(1);
  return view;
}

/***/ }),

/***/ "./src/ui/styles.js":
/*!**************************!*\
  !*** ./src/ui/styles.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return styles; });
function styles() {
  var styles = {
    // Panel dimens
    panelHeader: 20,
    panelHeight: 468,
    panelWidth: 378,
    panelGutter: 15,
    // List
    itemHeight: 72,
    itemWidth: 338,
    leftColWidth: 60,
    rightColPad: 8,
    rightColWidth: 270,
    //itemWidth - leftColWidth - rightColPad
    rightColX: 68,
    //rightColPad + leftColWidth
    // Fonts
    sectionFont: NSFont.boldSystemFontOfSize(15),
    titleFont: NSFont.boldSystemFontOfSize(12),
    subtitleFont: NSFont.systemFontOfSize(10),
    //Colors
    darkTextGrey: NSColor.colorWithCalibratedRed_green_blue_alpha(0, 0, 0, 0.4),
    lightTextGrey: NSColor.colorWithCalibratedRed_green_blue_alpha(1, 1, 1, 0.4),
    blackText: NSColor.colorWithCalibratedRed_green_blue_alpha(0, 0, 0, 1),
    whiteText: NSColor.colorWithCalibratedRed_green_blue_alpha(1, 1, 1, 1)
  };
  return styles;
}

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

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=script.js.map