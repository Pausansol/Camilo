var assetstosync = function(sel){
	element = sel; 
}

//Replace all symbols in the document wich match their names with selected theme library

var replaceSymbols = function(context) {
	
	var localSymbols = context.document.documentData().localSymbols(),
		foreignSymbols = context.document.documentData().foreignSymbols(),
		docSymbols = context.document.documentData().allSymbols(),
		predicate = NSPredicate.predicateWithFormat("className == %@ || className == %@","MSSymbolMaster","MSSymbolInstance"),
		selection = docSymbols.filteredArrayUsingPredicate(predicate);

	if (selection.length) {
		var librarySettings = getLibrary(context);

		if (librarySettings) {
			var selectedLibrary = (librarySettings.selectedLibrary != 0) ? libraries[librarySettings.selectedLibrary - 1] : 0,
				selectedMaster = librarySettings.selectedMaster,
				selectionLoop = selection.objectEnumerator(),
				selection,
				symbolMaster,
				instanceMap = {},
				count = 0;

			while (selection = selectionLoop.nextObject()) {
				var proceed = false;

				if (selectedMaster) {
					if (selectedLibrary != 0) {
						symbolMaster = importForeignSymbol(selectedMaster,selectedLibrary).symbolMaster();
					} else {
						symbolMaster = selectedMaster;
					}

					instanceMap[selection.symbolID().toString()] = symbolMaster.symbolID().toString();

					proceed = true;
				} else {
					var symbolName = (selection.class() == "MSSymbolMaster") ? selection.name() : selection.symbolMaster().name();

					if (symbolArray.containsObject(symbolName)) {
						var symbolIndex = symbolArray.indexOfObject(symbolName);

						if (selectedLibrary != 0) {
							symbolMaster = importForeignSymbol(librarySymbols[symbolIndex],selectedLibrary).symbolMaster();
						} else {
							symbolMaster = librarySymbols[symbolIndex];
						}

						instanceMap[selection.symbolID().toString()] = symbolMaster.symbolID().toString();

						proceed = true;
					}
				}

				if (proceed) {
					if (selection.class() == "MSSymbolMaster") {
						var instances = selection.allInstances();

						for (var i = 0; i < instances.length; i++) {
							instances[i].changeInstanceToSymbol(symbolMaster);
							instances[i].setName(symbolMaster.name());
							count++;
						}
						
						selection.removeFromParent();
						selection.setName(symbolMaster.name());
						count++;
					}
				}
			}

			
			var allInstances = getInstances(context);

			for (var i = 0; i < allInstances.length; i++) {
				if (!MSLayerPaster.updateOverridesOnInstance_withIDMap_) {
						allInstances[i].updateOverridesWithObjectIDMap(instanceMap);
				} else {
						MSLayerPaster.updateOverridesOnInstance_withIDMap_(allInstances[i],instanceMap);
				}
			}
			

			context.document.reloadInspector();

			var libraryName = (selectedLibrary == 0) ? "current document" : selectedLibrary.name() + " library";

			
		}
	} else {
		displayDialog("Please select at least one symbol master or instance.");
	}
}


function getInstances(context) {
	var instanceArray = NSArray.array(),
		predicate = NSPredicate.predicateWithFormat("className == %@","MSSymbolInstance"),
		pageLoop = context.document.pages().objectEnumerator(),
		page;

	while (page = pageLoop.nextObject()) {
		var pageInstances = page.children().filteredArrayUsingPredicate(predicate);

		instanceArray = instanceArray.arrayByAddingObjectsFromArray(pageInstances);
	}

	return instanceArray;
}

function getLibrary(context) {
   
	
	var lastLibrary = context.command.valueForKey_onLayer("lastLibrary",context.document.documentData()),
		library = 0,
		selectLibrary = 0,
		selectSymbol = 0;

	if (lastLibrary && lastLibrary != 0) {
		var predicate = NSPredicate.predicateWithFormat("name == %@",lastLibrary),
			libraryMatch = libraries.filteredArrayUsingPredicate(predicate).firstObject();

		if (libraryMatch) {
			library = libraryMatch;
			selectLibrary = libraryNames.indexOf(lastLibrary.trim());
		}
	}

	librarySymbols = getLibrarySymbols(library);
	symbolArray = (librarySymbols && librarySymbols.length) ? librarySymbols.valueForKey("name") : NSMutableArray.arrayWithArray(["No Symbols"]);

	var selectedLibraryIndex = [];
	
	var idx = libraryNames.indexOf(element);
	while (idx != -1) {
	  selectedLibraryIndex.push(idx);
	  idx = libraryNames.indexOf(element, idx + 1);
	}
	
	var selectedLibrary = (selectedLibraryIndex == 0) ? 0 : libraries[selectedLibraryIndex - 1];
	librarySymbols = getLibrarySymbols(selectedLibrary);

	if (librarySymbols && librarySymbols.length) {
		symbolArray = librarySymbols.valueForKey("name");
	} else {
		symbolArray = NSMutableArray.arrayWithArray(["No Symbols"]);
				
	}
	
	if (context.selection.length == 1) {
		var symbolName = (context.selection[0].class() == "MSSymbolMaster") ? context.selection[0].name() : context.selection[0].symbolMaster().name();

		if (symbolArray.containsObject(symbolName)) {
			selectSymbol = symbolArray.indexOfObject(symbolName);
		}
	}
		return {
			selectedLibrary : selectedLibraryIndex,
		}
	
}

function getLibrarySymbols(library) {
	var librarySymbolSort = NSSortDescriptor.sortDescriptorWithKey_ascending("name",1),
		librarySymbols;
		

	if (library == 0) {
		librarySymbols = MSDocument.currentDocument().documentData().localSymbols();
	} else {
		var libraryPath = library.locationOnDisk().path(),
			libraryFile = openFile(libraryPath);

		librarySymbols = (libraryFile) ? libraryFile.documentData().allSymbols() : nil;

		libraryFile.close();
	}

	return librarySymbols.sortedArrayUsingDescriptors([librarySymbolSort]);
}

function getForeignSymbolByName(name,library) {
	var librarySymbols = getLibrarySymbols(library),
		librarySymbolLoop = librarySymbols.objectEnumerator(),
		librarySymbol,
		foreignSymbol;

	while (librarySymbol = librarySymbolLoop.nextObject()) {
		if (!foreignSymbol && librarySymbol.name().trim() == name.trim()) {
			foreignSymbol = librarySymbol;
		}
	}

	return foreignSymbol;
}

function importForeignSymbol(symbol,library) {
	var intoDocument = MSDocument.currentDocument().documentData(),
		libraryController = AppController.sharedInstance().librariesController(),
		foreignSymbol;

	if (MSApplicationMetadata.metadata().appVersion >= 50) {
		var objectReference = MSShareableObjectReference.referenceForShareableObject_inLibrary(symbol,library);

		foreignSymbol = libraryController.importShareableObjectReference_intoDocument(objectReference,intoDocument);
	} else {
		foreignSymbol = libraryController.importForeignSymbol_fromLibrary_intoDocument_(symbol,library,intoDocument);
	}

	return foreignSymbol;
}

function openFile(path) {
	var file = MSDocument.new();

	return (file.readFromURL_ofType_error(path,'com.bohemiancoding.sketch.drawing',nil)) ? file : nil;
}



//Replace layerStyles and textLayerStyles in the document with selected theme library

var replaceStyles = function (context) {
	var doc = context.document.documentData();
	var lookups = {
    	layer: createLookup(doc.layerStyles()),
    	text: createLookup(doc.layerTextStyles())
  	};

  	var options = [];
  	AppController.sharedInstance().librariesController().libraries().forEach(function (lib) {
    	options.push(lib.name());
  	});
  
  	var alert = COSAlertWindow.new();
  	alert.setMessageText('Camilo');
  	alert.setInformativeText("Select a theme library to replace magically document's layer styles and symbols 🎉")
  	// add new logo
  	alert.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon.png").path()));
  	 var optionselected = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 0, 200, 25));
  	optionselected.i18nObjectValues = options;
 	optionselected.setEditable(false);
 	optionselected.addItemsWithObjectValues(options);
  	optionselected.selectItemAtIndex(0);
  	alert.addAccessoryView(optionselected);

  	alert.addButtonWithTitle('Sync');
	alert.addButtonWithTitle('Cancel');

	

	// Depending selected control, current document will sync with predefined brand 
	if (alert.runModal() == NSAlertFirstButtonReturn) {
   		var chosenLibrary = alert.viewAtIndex(0).stringValue();
		AppController.sharedInstance().librariesController().libraries().forEach(function (lib) {
      	if (lib.name() == chosenLibrary) {
  		
        	syncLibraryStyles(lib.document().layerStyles(), doc.layerStyles(), lookups.layer);
        	syncLibraryStyles(lib.document().layerTextStyles(), doc.layerTextStyles(), lookups.text);
        	context.document.showMessage('🎉 🎈 🙌🏼  Applied theme from ' + chosenLibrary + ' library  🙌🏼 🎉 🎈');
			assetstosync('' + chosenLibrary);
		 	replaceSymbols(context);
		}
    });
  }
};

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

var writeStyleCreate = function (styles, name, newStyle) {
  if (styles.addSharedObjectWithName_firstInstance) {
    styles.addSharedObjectWithName_firstInstance(name, newStyle);
  } else {
    var s = MSSharedStyle.alloc().initWithName_firstInstance(name, newStyle);
    styles.addSharedObject(s);
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

var librariesController = function () {
  return AppController.sharedInstance().librariesController();
};


var librarySort = NSSortDescriptor.sortDescriptorWithKey_ascending("name",1),
	libraries = AppController.sharedInstance().librariesController().libraries().sortedArrayUsingDescriptors([librarySort]),
	libraryLoop = libraries.objectEnumerator(),
	library,
	libraryNames = ["Current Document"],
	librarySymbols,
	librarySelects = [],
	symbolArray;

while (library = libraryLoop.nextObject()) {
	libraryNames.push(String(library.name()));
}


