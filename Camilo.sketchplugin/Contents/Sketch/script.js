var PLUGIN_NAME = 'Camilo';
var PLUGIN_LOGO = 'icon.png';

var SYMBOL_MASTER = 'MSSymbolMaster';
var SYMBOL_INSTANCE = 'MSSymbolInstance';

var createLookup = function (styles) {
	var lookup = {};
	styles.sharedStyles().forEach(function (style) {
		var name = style.name();
		lookup[name] = style;
	});
	return lookup;
};
  
var writeStyleUpdate = function (styles, currentStyle, newStyle) {
	if (styles.updateValueOfSharedObject_byCopyingInstance) {
		styles.updateValueOfSharedObject_byCopyingInstance_(currentStyle, newStyle);
		styles.synchroniseInstancesOfSharedObject_withInstance_(currentStyle, newStyle);
	} else {
		currentStyle.updateToMatch(newStyle);
		currentStyle.resetReferencingInstances();
	}
};
  
var syncLibraryStyles = function (libraryStyles, documentStyles, lookup) {
	libraryStyles.sharedStyles().forEach(function (librarySharedStyle) {
		var name = librarySharedStyle.name();
		var currentStyle = lookup[name];
		var libraryStyle = librarySharedStyle.style();
		if (currentStyle) {
			writeStyleUpdate(documentStyles, currentStyle, libraryStyle);
		}
	});
};
  
function googleAnalytics(context, category, action, label, value) {
	var trackingID = "UA-128191866-1";
	var	uuidKey = "google.analytics.uuid";
	var url = "https://www.google-analytics.com/collect?v=1";
	var	uuid = NSUserDefaults.standardUserDefaults().objectForKey(uuidKey);

	if (!uuid) {
		uuid = NSUUID.UUID().UUIDString();
		NSUserDefaults.standardUserDefaults().setObject_forKey(uuid,uuidKey);
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

function getInstances(context) {
	var instanceArray = NSArray.array();
	var	predicate = NSPredicate.predicateWithFormat("className == %@", SYMBOL_INSTANCE);
	var	pageLoop = context.document.pages().objectEnumerator();
	var	page;

	while (page = pageLoop.nextObject()) {
		var pageInstances = page.children().filteredArrayUsingPredicate(predicate);
		instanceArray = instanceArray.arrayByAddingObjectsFromArray(pageInstances);
	}

	return instanceArray;
}

function getSymbolArray(librarySymbols) {
	return (librarySymbols && librarySymbols.length) ?
		librarySymbols.valueForKey("name") : 
		NSMutableArray.arrayWithArray(["No Symbols"]);
}

function getLibrarySymbols(library) {
	var librarySymbolSort = NSSortDescriptor.sortDescriptorWithKey_ascending("name", 1);
	var	librarySymbols;

	if (library == 0) {
		librarySymbols = MSDocument.currentDocument().documentData().localSymbols();
	} else {
		var libraryPath = library.locationOnDisk().path();
		var	libraryFile = openFile(libraryPath);

		librarySymbols = (libraryFile) ? libraryFile.documentData().allSymbols() : nil;
		libraryFile.close();
	}

	return librarySymbols.sortedArrayUsingDescriptors([librarySymbolSort]);
}

function getLibrary(context, chosenLibrary, libraries, libraryNames) {
	var lastLibrary = context.command.valueForKey_onLayer("lastLibrary", context.document.documentData());
	var	library = 0;

	if (lastLibrary && lastLibrary != 0) {
		var predicate = NSPredicate.predicateWithFormat("name == %@", lastLibrary);
		var	libraryMatch = libraries.filteredArrayUsingPredicate(predicate).firstObject();

		if (libraryMatch) {
			library = libraryMatch;
		}
	}

	librarySymbols = getLibrarySymbols(library);
	symbolArray = getSymbolArray(librarySymbols);

	var selectedLibraryIndex = [];
	var idx = libraryNames.indexOf(chosenLibrary);
	while (idx != -1) {
	  selectedLibraryIndex.push(idx);
	  idx = libraryNames.indexOf(chosenLibrary, idx + 1);
	}
	
	var selectedLibrary = (selectedLibraryIndex == 0) ? 0 : libraries[selectedLibraryIndex - 1];
	librarySymbols = getLibrarySymbols(selectedLibrary);
	symbolArray = getSymbolArray(librarySymbols);

	return {
		selectedLibrary : selectedLibraryIndex,
		librarySymbols,
		symbolArray
	}
}

function importForeignSymbol(symbol,library) {
	var intoDocument = MSDocument.currentDocument().documentData();
	var	libraryController = AppController.sharedInstance().librariesController();
	var	foreignSymbol;

	if (MSApplicationMetadata.metadata().appVersion >= 50) {
		var objectReference = MSShareableObjectReference.referenceForShareableObject_inLibrary(symbol, library);
		foreignSymbol = libraryController.importShareableObjectReference_intoDocument(objectReference, intoDocument);
	} else {
		foreignSymbol = libraryController.importForeignSymbol_fromLibrary_intoDocument_(symbol, library, intoDocument);
	}

	return foreignSymbol;
}

function openFile(path) {
	var file = MSDocument.new();
	return (file.readFromURL_ofType_error(path, 'com.bohemiancoding.sketch.drawing', nil)) ? file : nil;
}

function getOptionSelected() {
	var options = [];
	var optionSelected = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 0, 200, 25));

	AppController.sharedInstance().librariesController().libraries().forEach(function (lib) {
    	options.push(lib.name());
  	});
  	optionSelected.i18nObjectValues = options;
	optionSelected.setEditable(false);
	optionSelected.addItemsWithObjectValues(options);
	optionSelected.selectItemAtIndex(0);
	return optionSelected;
}

function proceed(selection, symbolMaster) {
	if (selection.class() == SYMBOL_MASTER) {
		selection.allInstances().forEach(function (instance) {
			instance.changeInstanceToSymbol(symbolMaster);
			instance.setName(symbolMaster.name());
		});
		selection.removeFromParent();
		selection.setName(symbolMaster.name());
	}
}

function getSymbolMaster(symbol, library) {
	var symbolMaster;
	if (library != 0) {
		symbolMaster = importForeignSymbol(symbol, library).symbolMaster();
	} else {
		symbolMaster = symbol;
	}
	return symbolMaster;
}

// Replace all symbols in the document wich match their names with selected theme library

var replaceSymbols = function(context, chosenLibrary) {
	var docSymbols = context.document.documentData().allSymbols();
	var	predicate = NSPredicate.predicateWithFormat("className == %@ || className == %@", SYMBOL_MASTER, SYMBOL_INSTANCE);
	var	selection = docSymbols.filteredArrayUsingPredicate(predicate);

	if (selection.length) {
		var librarySort = NSSortDescriptor.sortDescriptorWithKey_ascending("name", 1);
		var	libraries = AppController.sharedInstance().librariesController().libraries().sortedArrayUsingDescriptors([librarySort]);
		var	libraryLoop = libraries.objectEnumerator();
		var	libraryNames = ["Current Document"];
		var	library;

		while (library = libraryLoop.nextObject()) {
			libraryNames.push(String(library.name()));
		}

		var librarySettings = getLibrary(context, chosenLibrary, libraries, libraryNames);

		if (librarySettings) {
			var selectedLibrary = (librarySettings.selectedLibrary != 0) ? libraries[librarySettings.selectedLibrary - 1] : 0;
			var librarySymbols = librarySettings.librarySymbols;
			var symbolArray = librarySettings.symbolArray;
			var	selectedMaster = librarySettings.selectedMaster;
			var	selectionLoop = selection.objectEnumerator();
			var	selection;
			var	symbolMaster;
			var	instanceMap = {};

			while (selection = selectionLoop.nextObject()) {
				if (selectedMaster) {
					symbolMaster = getSymbolMaster(selectedMaster, selectedLibrary);
					instanceMap[selection.symbolID().toString()] = symbolMaster.symbolID().toString();
					proceed(selection, symbolMaster);
				} else {
					var symbolName = (selection.class() == SYMBOL_MASTER) ? 
						selection.name() : 
						selection.symbolMaster().name();

					if (symbolArray.containsObject(symbolName)) {
						var symbolIndex = symbolArray.indexOfObject(symbolName);
						symbolMaster = getSymbolMaster(librarySymbols[symbolIndex], selectedLibrary);
						instanceMap[selection.symbolID().toString()] = symbolMaster.symbolID().toString();
						proceed(selection, symbolMaster);
					}
				}
			}

			getInstances(context).forEach(function (instance) {
				if (!MSLayerPaster.updateOverridesOnInstance_withIDMap_) {
					instance.updateOverridesWithObjectIDMap(instanceMap);
				} else {
					MSLayerPaster.updateOverridesOnInstance_withIDMap_(instance, instanceMap);
				}
			});
			context.document.reloadInspector();			
		}
	} else {
		displayDialog("Please select at least one symbol master or instance.");
		googleAnalytics(context, 'legacy displayDialog shown', 'legacy', 'legacy');
	}
}

// Replace layerStyles and textLayerStyles in the document with selected theme library

var replaceStyles = function (context) {
	var doc = context.document.documentData();
	var lookups = {
    	layer: createLookup(doc.layerStyles()),
    	text: createLookup(doc.layerTextStyles())
  	};
	var alert = COSAlertWindow.new();
	  
  	alert.setMessageText(PLUGIN_NAME);
  	alert.setInformativeText("Select a theme library to replace magically document's layer styles and symbols 🎉")
  	// add new logo
  	alert.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed(PLUGIN_LOGO).path()));
  	alert.addAccessoryView(getOptionSelected());
  	alert.addButtonWithTitle('Sync');
	alert.addButtonWithTitle('Cancel');
	googleAnalytics(context, "Open Camilo", "Alert", "UI");

	// Depending selected control, current document will sync with predefined brand 
	if (alert.runModal() == NSAlertFirstButtonReturn) {
		var chosenLibrary = alert.viewAtIndex(0).stringValue();
		AppController.sharedInstance().librariesController().libraries().forEach(function (lib) {
			if (lib.name() == chosenLibrary) {
				syncLibraryStyles(lib.document().layerStyles(), doc.layerStyles(), lookups.layer);
				syncLibraryStyles(lib.document().layerTextStyles(), doc.layerTextStyles(), lookups.text);
				context.document.showMessage('🎉 🎈 🙌🏼  Applied theme from ' + chosenLibrary + '  🙌🏼 🎉 🎈');
				replaceSymbols(context, String(chosenLibrary));
				googleAnalytics(context, "Camilo replacement with", chosenLibrary, "Library");
			}
		});
	}
};
