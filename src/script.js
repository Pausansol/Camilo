import sketch from 'sketch'
import googleAnalytics from './analytics'
import createRadioButtons from './create-radio-buttons'
import syncLibrary from './sync-library'
import getOptionSelected from './get-option-selected'
import createAlertWindow from './create-alert-window'

export default function(context) {
  const libraries = sketch.getLibraries().filter(l => l.valid && l.enabled)
  
  //Create the alertWindow UI
  const alertWindow = createAlertWindow(context);
  alertWindow.addAccessoryView(getOptionSelected(libraries))
  alertWindow.addButtonWithTitle('Switch')
  alertWindow.addButtonWithTitle('Cancel')
  
  //Create the radioButtons
  const swapType = createRadioButtons(["Apply to document", "Apply to selection"],0)
  const alertWindow.addAccessoryView(swapType)
  
  //Get the info from radioButtons
  swapType.cells().objectAtIndex(0).setAction("callAction:")
  swapType.cells().objectAtIndex(0).setCOSJSTargetFunction(function(sender) {
    //Apply to document
  })

  swapType.cells().objectAtIndex(1).setAction("callAction:")
  swapType.cells().objectAtIndex(1).setCOSJSTargetFunction(function(sender) {
    //Apply to selection
  })
  
  googleAnalytics(context, "Open Camilo", "Alert", "UI")

  // Depending selected control, current document will sync with predefined brand 
  if (alertWindow.runModal() == NSAlertFirstButtonReturn) {
    const chosenLibraryName = String(alertWindow.viewAtIndex(0).stringValue())
    const lib = libraries.find(l => l.name === chosenLibraryName)
    const doc = sketch.getSelectedDocument()
    syncLibrary(doc, lib)
    googleAnalytics(context, 'Camilo replacement with', lib.name, 'Library')
    sketch.UI.message(
    `🎉 🎈 🙌🏼  Applied theme from ${lib.name}  🙌🏼 🎉 🎈`
    )
  }
}