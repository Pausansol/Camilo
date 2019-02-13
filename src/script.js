import sketch from 'sketch'
import googleAnalytics from './analytics'
import syncLibrary from './sync-library'

// Replace layerStyles and textLayerStyles in the document with selected theme library
export function getOptionSelected(libraries) {
  
  const options = [];
  var optionSelected = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 0, 200, 25));
  
  libraries.forEach(function (lib) {
    options.push(lib.name);
  });
  
  optionSelected.i18nObjectValues = options;
  optionSelected.setEditable(false);
  optionSelected.addItemsWithObjectValues(options);
  optionSelected.selectItemAtIndex(0);
  return optionSelected;
}

export default function(context) {
  var PLUGIN_LOGO = 'icon.png';
  const libraries = sketch.getLibraries().filter(l => l.valid && l.enabled)
  var alert = COSAlertWindow.new();
  alert.setMessageText('Camilo');
  alert.setInformativeText("Select a theme library to replace magically document's layer styles and symbols 🎉")
  alert.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed(PLUGIN_LOGO).path()));
  alert.addAccessoryView(getOptionSelected(libraries));
  alert.addButtonWithTitle('Sync');
  alert.addButtonWithTitle('Cancel');
  googleAnalytics(context, "Open Camilo", "Alert", "UI");
  
  // Depending selected control, current document will sync with predefined brand 
  if (alert.runModal() == NSAlertFirstButtonReturn) {
    var chosenLibrary = alert.viewAtIndex(0).stringValue();
    libraries.forEach(function (lib) {
      if (lib.name == chosenLibrary) {
        const doc = sketch.getSelectedDocument()
        googleAnalytics(context, 'Camilo replacement with', lib.name, 'Library')
        syncLibrary(doc, lib)
        sketch.UI.message(
        `🎉 🎈 🙌🏼  Applied theme from ${lib.name}  🙌🏼 🎉 🎈`
        )
      }
    })
  }
}
