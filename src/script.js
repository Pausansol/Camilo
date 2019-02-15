import sketch from 'sketch'
import googleAnalytics from './analytics'
import syncLibrary from './sync-library'

function createRadioButtons(options,selected,format,x,y) {
  var rows = options.length,
    columns = 1,
    buttonMatrixWidth = 300,
    buttonCellWidth = buttonMatrixWidth,
    x = (x) ? x : 0,
    y = (y) ? y : 0;

  if (format && format != 0) {
    rows = options.length / 2;
    columns = 2;
    buttonMatrixWidth = 300;
    buttonCellWidth = buttonMatrixWidth / columns;
  }

  var buttonCell = NSButtonCell.alloc().init();

  buttonCell.setButtonType(NSRadioButton);

  var buttonMatrix = NSMatrix.alloc().initWithFrame_mode_prototype_numberOfRows_numberOfColumns(
    NSMakeRect(x,y,buttonMatrixWidth,rows*24),
    NSRadioModeMatrix,
    buttonCell,
    rows,
    columns
  );

  buttonMatrix.setCellSize(NSMakeSize(buttonCellWidth,24));

  var i = 0

  for (i = 0; i < options.length; i++) {
    buttonMatrix.cells().objectAtIndex(i).setTitle(options[i]);
    buttonMatrix.cells().objectAtIndex(i).setTag(i);
  }

  buttonMatrix.selectCellAtRow_column(selected,0);

  return buttonMatrix;
}

function getOptionSelected(libraries) {
  
  const options = []
  const optionSelected = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 0, 240, 28))
  
  libraries.forEach(function (lib) {
    options.push(lib.name)
  })
  
  optionSelected.i18nObjectValues = options
  optionSelected.setEditable(false)
  optionSelected.addItemsWithObjectValues(options)
  optionSelected.selectItemAtIndex(0)
  
  return optionSelected
}

// Replace layerStyles and textLayerStyles in the document with selected theme library
export default function(context) {
  const libraries = sketch.getLibraries().filter(l => l.valid && l.enabled)
  const alert = COSAlertWindow.new()
  alert.setMessageText('Camilo')
  alert.setInformativeText("Select a theme library to switch 🎉 with")
  alert.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed('icon.png').path()))
  alert.addAccessoryView(getOptionSelected(libraries))
  alert.addButtonWithTitle('Switch')
  alert.addButtonWithTitle('Cancel')
  var swapType = createRadioButtons(["Apply to document", "Apply to selection"],0);
  alert.addAccessoryView(swapType);
  googleAnalytics(context, "Open Camilo", "Alert", "UI")

  swapType.cells().objectAtIndex(0).setAction("callAction:");
  swapType.cells().objectAtIndex(0).setCOSJSTargetFunction(function(sender) {
    if (context.selection.length == 1) {
      var symbolName = (context.selection[0].class() == "MSSymbolMaster") ? context.selection[0].name() : context.selection[0].symbolMaster().name();

      if (symbolArray.containsObject(symbolName)) {
        selectSymbol = symbolArray.indexOfObject(symbolName);
      }

      symbolMaster.selectItemAtIndex(selectSymbol);
    }

    symbolMaster.setEnabled(0);
  });

  swapType.cells().objectAtIndex(1).setAction("callAction:");
  swapType.cells().objectAtIndex(1).setCOSJSTargetFunction(function(sender) {
    if (context.selection.length == 1) {
      var symbolID = (context.selection[0].class() == "MSSymbolMaster") ? context.selection[0].symbolID() : context.selection[0].symbolMaster().symbolID();

      if (symbolArray.containsObject(symbolID)) {
        selectSymbol = symbolArray.indexOfObject(symbolID);
      }

      symbolMaster.selectItemAtIndex(selectSymbol);
    }

    symbolMaster.setEnabled(0);
  });

  
  // Depending selected control, current document will sync with predefined brand 
  if (alert.runModal() == NSAlertFirstButtonReturn) {
    const chosenLibraryName = String(alert.viewAtIndex(0).stringValue())
    const lib = libraries.find(l => l.name === chosenLibraryName)
    const doc = sketch.getSelectedDocument()
    googleAnalytics(context, 'Camilo replacement with', lib.name, 'Library')
    syncLibrary(doc, lib)
    sketch.UI.message(
    `🎉 🎈 🙌🏼  Applied theme from ${lib.name}  🙌🏼 🎉 🎈`
    )
  }
}