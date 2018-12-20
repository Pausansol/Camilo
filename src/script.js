import sketch from 'sketch'
import googleAnalytics from './analytics'
import syncLibrary from './sync-library'

// Replace layerStyles and textLayerStyles in the document with selected theme library
export default function() {
  const libraries = sketch.getLibraries().filter(l => l.valid && l.enabled)
  const [, selectionIndex, ok] = sketch.UI.getSelectionFromUser(
    "Select a theme library to replace magically document's layer styles and symbols 🎉",
    libraries.map(l => l.name)
  )
  googleAnalytics('Open Camilo', 'Alert', 'UI')

  // Depending selected control, current document will sync with predefined brand
  if (ok) {
    const doc = sketch.getSelectedDocument()
    const chosenLibrary = libraries[selectionIndex]

    googleAnalytics('Camilo replacement with', chosenLibrary.name, 'Library')

    syncLibrary(doc, chosenLibrary)

    sketch.UI.message(
      `🎉 🎈 🙌🏼  Applied theme from ${chosenLibrary.name}  🙌🏼 🎉 🎈`
    )
  }
}
