import mapSharedStyles from './map-shared-styles'
import replaceSymbols from './replace-symbols'
import replaceOverrides from './replace-overrides'
import replaceSharedStyles from './replace-shared-styles'

export default function(document, library) {
  const lookup = mapSharedStyles(document, library)

  // replace the symbols
  const { symbolsMap, docSymbolInstances } = replaceSymbols(document, library)

  // replace the styles
  const layerStylesMap = replaceSharedStyles(
    document.getSharedLayerStyles(),
    lookup.layer,
    library
  )
  // replace the textStyles
  const textStylesMap = replaceSharedStyles(
    document.getSharedTextStyles(),
    lookup.text,
    library
  )
  // replace the overrides
  replaceOverrides(docSymbolInstances, {
    symbolsMap,
    layerStylesMap,
    textStylesMap,
  })

  // replace the swatches
  

  // reload the inspector to make sure we show the latest changes
  document.sketchObject.reloadInspector()
}
