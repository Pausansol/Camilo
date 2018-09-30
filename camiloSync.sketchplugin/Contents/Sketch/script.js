var pluginName = "Symbol Swapper",
	pluginIdentifier = "com.sonburn.sketchplugins.symbol-swapper",
	debugMode = false;

var panelWidth = 350,
	panelHeight = 530,
	panelTitle = 44,
	gutterWidth = 15,
	uiButtons = [],
	swapButton;
var element = 'O2';
	var assetstosync = function(sel){
		element = sel; 
		
		
	}
var swapSelected = function(context) {
	
	var localSymbols = context.document.documentData().localSymbols(),
		foreignSymbols = context.document.documentData().foreignSymbols();
	var pedo = context.document.documentData().allSymbols();
	var predicate = NSPredicate.predicateWithFormat("className == %@ || className == %@","MSSymbolMaster","MSSymbolInstance"),
		selection = pedo.filteredArrayUsingPredicate(predicate);

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

							if (librarySettings.renameInstances == 1) {
								instances[i].setName(symbolMaster.name());
							}

							count++;
						}

						if (librarySettings.deleteMasters == 1) {
							selection.removeFromParent();
						}
					} else {
						selection.changeInstanceToSymbol(symbolMaster);

						if (librarySettings.renameInstances == 1) {
							selection.setName(symbolMaster.name());
						}

						count++;
					}
				}
			}

			if (librarySettings.includeSiblings == 1 && Object.keys(instanceMap).length > 0) {
				var allInstances = getInstances(context);

				for (var i = 0; i < allInstances.length; i++) {
					if (!MSLayerPaster.updateOverridesOnInstance_withIDMap_) {
						allInstances[i].updateOverridesWithObjectIDMap(instanceMap);
					} else {
						MSLayerPaster.updateOverridesOnInstance_withIDMap_(allInstances[i],instanceMap);
					}
				}
			}

			context.document.reloadInspector();

			var libraryName = (selectedLibrary == 0) ? "current document" : selectedLibrary.name() + " library";

			
		}
	} else {
		displayDialog(pluginName,"Please select at least one symbol master or instance.");
	}
}



function createAlertWindow(context,name,text) {
	var alertWindow = COSAlertWindow.new();

	var iconPath = context.plugin.urlForResourceNamed("icon.png").path(),
		icon = NSImage.alloc().initByReferencingFile(iconPath);

	alertWindow.setIcon(icon);
	alertWindow.setMessageText(name);
	(text) ? alertWindow.setInformativeText(text) : null;

	return alertWindow;
}

function createContentView(frame,background) {
	var view = NSView.alloc().initWithFrame(frame);

	view.setFlipped(1);

	if (background) {
		view.setWantsLayer(1);
		view.layer().setBackgroundColor(CGColorCreateGenericRGB(248/255,248/255,248/255,1.0));
	}

	return view;
}



function createListDivider(frame) {
	var divider = NSView.alloc().initWithFrame(frame);

	divider.setWantsLayer(1);
	divider.layer().setBackgroundColor(CGColorCreateGenericRGB(204/255,204/255,204/255,1.0));

	return divider;
}


function displayDialog(title,body) {
	if (MSApplicationMetadata.metadata().appVersion >= 50) {
		const UI = require("sketch/ui");

		UI.alert(title,body);
	} else {
		NSApplication.sharedApplication().displayDialog_withTitle(body,title);
	}
}



function getCachedSettings(context,location,settings) {
	try {
		for (i in settings) {
			var value = context.command.valueForKey_onLayer_forPluginIdentifier(i,location,pluginIdentifier);
			if (value) settings[i] = value;
		}

		return settings;
	} catch(err) {
		log(strProblemFetchingSettings);
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

	var defaultSettings = {};
	defaultSettings.includeSiblings = 1;
	defaultSettings.renameInstances = 1;
	defaultSettings.deleteMasters = 1;

	defaultSettings = getCachedSettings(context,context.document.documentData(),defaultSettings);

	
	var selectedLibraryIndex = [];
	
	var idx = libraryNames.indexOf(element);
	while (idx != -1) {
	  selectedLibraryIndex.push(idx);
	  idx = libraryNames.indexOf(element, idx + 1);
	}
	
			var selectedLibrary = (selectedLibraryIndex == 0) ? 0 : libraries[selectedLibraryIndex - 1];
			console.log('deiohaihdaioehdeaodhoaed ' + selectedLibrary)
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

	
		var includeSiblings = 1;
		var renameInstances = 1;
		var deleteMasters = 1;
		var selectedLibraryindex = 8;

		

		return {
			selectedLibrary : selectedLibraryIndex,
			selectedMaster : 0,
			includeSiblings : 1,
			renameInstances : 1,
			deleteMasters : 1,
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




var syncStylesWith = function (context) {
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
  alert.setInformativeText("Select a brand and their styles will be magically synchronized 🎉")
  // add new logo
  alert.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon.png").path()));
  alert.addButtonWithTitle('Sync');
  alert.addButtonWithTitle('Cancel');

 
 
	// Configure checkboxes

    //var userDefaults = initDefaults(kPluginDomain, presets)
	var anchorSegControl = NSSegmentedControl.alloc().initWithFrame(NSMakeRect(0,0,240,60))
	anchorSegControl.setSegmentCount(3)
	

	var iconTop = NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("vivoSegmented@2x.png").path())
	var iconMiddle = NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("o2Segmented@2x.png").path())
	var iconBottom = NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("MovistarSegmented@2x.png").path())
	
	iconTop.setTemplate(true)
	iconMiddle.setTemplate(true)
	iconBottom.setTemplate(true)

	anchorSegControl.setImage_forSegment(iconTop, 0)
	anchorSegControl.setImage_forSegment(iconMiddle, 1)
	anchorSegControl.setImage_forSegment(iconBottom, 2)

	anchorSegControl.setWidth_forSegment(60, 0)
	anchorSegControl.setWidth_forSegment(60, 1)
	anchorSegControl.setWidth_forSegment(60, 2)
  
  	anchorSegControl.setSelected_forSegment(true, 0)
  
	

	//anchorSegControl.setSelected_forSegment(true, userDefaults.lastSelectedAnchorIndex)

	alert.addAccessoryView(anchorSegControl)
  
  
  

  if (alert.runModal() == NSAlertFirstButtonReturn) {
   var selectedSegment = anchorSegControl.selectedSegment()
	if (selectedSegment == 0) {
		// middle
		var chosenLibrary = 'Vivo';
		
	
	}
	if (selectedSegment == 1) {
		// middle
		var chosenLibrary = 'O2';
		
	
	}
	if (selectedSegment == 2) {
		// middle
		var chosenLibrary = 'Movistar';
		
	
	}
	
	
	
    AppController.sharedInstance().librariesController().libraries().forEach(function (lib) {
      if (lib.name() == chosenLibrary) {
  		
        syncLibraryStyles(lib.document().layerStyles(), doc.layerStyles(), lookups.layer);
        syncLibraryStyles(lib.document().layerTextStyles(), doc.layerTextStyles(), lookups.text);
        context.document.showMessage('🎉 🎈 🙌🏼  Synced styles from ' + chosenLibrary + '  🙌🏼 🎉 🎈');
  		console.log('wnedniowendoiwendoiwenhdoiwe '+ chosenLibrary)
		assetstosync(chosenLibrary);
		 swapSelected(context);
		
		 
      }
    });
  }
};


var syncStyles = function (context) {
  var doc = context.document.documentData();

  var lookups = {
    layer: createLookup(doc.layerStyles()),
    text: createLookup(doc.layerTextStyles())
  };

  var validLibraries = 0;

  var librarySymbols = doc.foreignSymbols();
  var seenLibraries = {};
  librarySymbols.forEach(function (symbol) {
    var libraryID = symbol.libraryID();
    if (!seenLibraries[libraryID]) {
      seenLibraries[libraryID] = true;
      var library = null;
      if (librariesController().libraryForSymbol) {
        library = librariesController().libraryForSymbol_(symbol.symbolMaster());
      } else {
        library = librariesController().libraryForShareableObject_(symbol.symbolMaster());
      }
      if (library && library.document()) {
        validLibraries++;
        syncLibraryStyles(library.document().layerStyles(), doc.layerStyles(), lookups.layer);
        syncLibraryStyles(library.document().layerTextStyles(), doc.layerTextStyles(), lookups.text);
      }
    }
  });

  context.document.reloadInspector();

  var objects = (validLibraries === 1) ? 'library' : 'libraries';
  context.document.showMessage('Synced styles from ' + validLibraries + ' ' + objects);
};

var getUserDefaults = function () {
  return NSUserDefaults.alloc().initWithSuiteName('com.zeroheight.library-styles-sync');
};

var setColor = function () {
  var panel = MSModalInputSheet.alloc().init();
  var result = panel.runPanelWithNibName_ofType_initialString_label_('MSModalInputSheet',
    0, '', 'Enter colors JSON URL');
  var userDefaults = getUserDefaults();
  userDefaults.setObject_forKey(String(result), 'color_url');
  userDefaults.synchronize();
};

var setTypo = function () {
  var panel = MSModalInputSheet.alloc().init();
  var result = panel.runPanelWithNibName_ofType_initialString_label_('MSModalInputSheet',
    0, '', 'Enter typography JSON URL');
  var userDefaults = getUserDefaults();
  userDefaults.setObject_forKey(String(result), 'typo_url');
  userDefaults.synchronize();
};

var syncJSON = function (context) {
  var userDefaults = getUserDefaults();
  var colorUrl = userDefaults.objectForKey('color_url');
  var typoUrl = userDefaults.objectForKey('typo_url');

  if (!colorUrl || !typoUrl) {
    return showAlert('No URLs found', 'Enter a color and typography URLs using other actions');
  }

  var colors = {};
  var typography = {};

  try {
    var url = NSURL.URLWithString_(colorUrl);
    var content = NSString.stringWithContentsOfURL_encoding_error(url, NSASCIIStringEncoding, nil);
    colors = JSON.parse(content);
    url = NSURL.URLWithString_(typoUrl);
    content = NSString.stringWithContentsOfURL_encoding_error(url, NSASCIIStringEncoding, nil);
    typography = JSON.parse(content);
  } catch (e) {
    return showAlert('Invalid URLs', 'Something went wrong fetching or extracting content');
  }

  var doc = context.document.documentData();
  var currentStyles = createLookup(doc.layerTextStyles());
  var result = {created: 0};

  createStyles(typography, colors, doc.layerTextStyles(), currentStyles, '', result);

  context.document.reloadInspector();
  context.document.showMessage('Synced ' + result.created + ' styles from JSON');
};

var createStyles = function (typography, colors, sharedStyles, currentStyles, path, result) {
  var properties = {};
  var styleColors = [];

  for (var key in typography) {
    if (typography.hasOwnProperty(key)) {
      var value = typography[key];
      if (typeof value === 'object' && !value[0]) {
        createStyles(value, colors, sharedStyles, currentStyles, path + '/' + key, result);
      } else {
        if (key === 'color') {
          styleColors.push(value);
        } else if (key === 'colors') {
          styleColors = value;
        } else {
          properties[key] = value;
        }
      }
    }
  }

  if (Object.keys(properties).length === 0) {
    return;
  }

  if (styleColors.length === 0) {
    properties['color'] = colors.primary;
    createStyle(path.substr(1), properties, sharedStyles, currentStyles);
    result.created++;
  } else {
    for (var i = 0; i < styleColors.length; ++i) {
      var colorString = styleColors[i];
      properties['color'] = colors[colorString];
      var capitalColorString = colorString.charAt(0).toUpperCase() + colorString.slice(1);
      createStyle(path.substr(1) + '/' + capitalColorString, properties,
        sharedStyles, currentStyles);
      result.created++;
    }
  }
};

var createStyle = function (name, properties, sharedStyles, currentStyles) {
  var sharedStyle = MSSharedStyle.alloc().init();
  var color = properties.color || '#000';
  var nscolor = MSImmutableColor.colorWithSVGString_(color).NSColorWithColorSpace_(nil);
  var fontSize = parseInt(properties['font-size']);
  fontSize = isNaN(fontSize) ? 12 : fontSize;
  var lineHeight = parseInt(properties['line-height']);
  lineHeight = isNaN(lineHeight) ? null : lineHeight;
  var fontWeight = parseInt(properties['font-weight']);
  var weight = 'Regular';
  switch (fontWeight) {
    case 400:
      weight = 'Medium';
      break;
    case 700:
      weight = 'Bold';
      break;
  }
  var fontName = 'SFUIText-' + weight;
  var attributes = {
    'NSColor': nscolor,
    'NSFont': NSFont.fontWithName_size_(fontName, fontSize)
  };
  if (lineHeight) {
    var para = NSMutableParagraphStyle.alloc().init();
    para.maximumLineHeight = lineHeight;
    para.minimumLineHeight = lineHeight;
    attributes['NSParagraphStyle'] = para;
  }
  var newStyle = MSStyle.alloc().init();
  var tstyle = MSTextStyle.styleWithAttributes_(attributes);
  newStyle.setValue_forKey_(tstyle, 'textStyle');

  var currentStyle = currentStyles[name];
  if (currentStyle) {
    writeStyleUpdate(sharedStyles, currentStyle, newStyle);
  } else {
    writeStyleCreate(sharedStyles, name, newStyle);
  }
};

var showAlert = function (title, message) {
  var app = NSApplication.sharedApplication();
  app.displayDialog_withTitle('Enter a color and typography URLs using other actions',
      'No URLs found');
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
    } else {
      writeStyleCreate(documentStyles, name, libraryStyle);
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


