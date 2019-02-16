import mapSymbolsAndStyles from './map-symbols-and-styles'
import overridesFromPagesTree from './overrides-from-pages-tree'

export default function(document, library) {
  
  var selection = document.selectedLayers.layers
  const lookup = mapSymbolsAndStyles(document, library)
  const docSymbols = document.getSymbols()

  overridesFromPagesTree(
    selection,
    lookup,
    docSymbols,
    document.getSharedLayerStyles(),
    document.getSharedTextStyles()
  )
  
  // reload the inspector to make sure we show the latest changes
  document.sketchObject.reloadInspector()
}