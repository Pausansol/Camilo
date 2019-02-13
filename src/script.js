import sketch from 'sketch'
import googleAnalytics from './analytics'
import syncLibrary from './sync-library'


function getOptionSelected(libraries) {
  
  const options = []
  var optionSelected = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 0, 200, 25))
  
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
  let alert = COSAlertWindow.new()
  alert.setMessageText('Camilo')
  alert.setInformativeText("Select a theme library to replace magically document's layer styles and symbols 🎉")
  alert.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed('icon.png').path()))
  alert.addAccessoryView(getOptionSelected(libraries))
  alert.addButtonWithTitle('Sync')
  alert.addButtonWithTitle('Cancel')
  googleAnalytics(context, "Open Camilo", "Alert", "UI")
  
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