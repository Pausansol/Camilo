import mapSymbolsAndStyles from './map-symbols-and-styles'
import inspectSelection from './inspect-selection'

export default function(document, library) {
  const selection = document.selectedLayers.layers
  const lookup = mapSymbolsAndStyles(document, library)
  const docSymbols = document.getSymbols()

  inspectSelection(
    selection,
    lookup,
    docSymbols,
    document.sharedLayerStyles,
    document.sharedTextStyles
  )

  // reload the inspector to make sure we show the latest changes
  document.sketchObject.reloadInspector()
}
