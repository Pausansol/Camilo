import mapSharedStyles from './map-shared-styles'
import replaceSymbols from './replace-symbols'
import replaceOverrides from './replace-overrides'
import replaceSharedStyles from './replace-shared-styles'
import createForeignLookup from './create-foreign-lookup'

export default function(document, library) {
  const lookups = mapSharedStyles(document)

  // replace the symbols
  const { symbolsMap, docSymbolInstances } = replaceSymbols(document, library)

  const foreignLookup = createForeignLookup(document, docSymbolInstances)

  // replace the styles
  const layerStylesMap = replaceSharedStyles(
    library.getImportableLayerStyleReferencesForDocument(document),
    lookups.layer,
    foreignLookup.layer
  )
  const textStylesMap = replaceSharedStyles(
    library.getImportableTextStyleReferencesForDocument(document),
    lookups.text,
    foreignLookup.text
  )

  replaceOverrides(docSymbolInstances, {
    symbolsMap,
    layerStylesMap,
    textStylesMap,
  })

  // reload the inspector to make sure we show the latest changes
  document.sketchObject.reloadInspector()
}
