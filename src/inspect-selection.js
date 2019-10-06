import replaceSelectedSharedStyles from './replace-selected-shared-styles'
import replaceSelectedSymbols from './replace-selected-symbols'
import replaceSelectedOverrides from './replace-selected-overrides'

export default function inspectSelection(
  layers,
  lookup,
  documentSymbols,
  documentLayerStyles,
  documentTextStyles
) {
  layers.forEach((layer) => {
  if (layer.sharedStyleId != null) {
      replaceSelectedSharedStyles(
        layer,
        layer.sharedStyleId,
        documentLayerStyles,
        lookup.layer,
        documentTextStyles,
        lookup.text
      )
    } else {
      if (layer.layers !== undefined) {
        inspectSelection(
          layer.layers,
          lookup,
          documentSymbols,
          documentLayerStyles,
          documentTextStyles
        )
      }
      if (layer.layers === undefined) {
        if (layer.type === 'SymbolInstance') {
          replaceSelectedSymbols(layer, lookup.symbol, lookup.documentsymbol)
        }
        if (layer.overrides !== undefined) {
          layer.overrides.forEach((overrides) => {
            if (overrides.property === 'symbolID') {
              replaceSelectedOverrides(
                overrides.value,
                overrides,
                documentSymbols,
                lookup.symbol,
                'symbolId'
              )
            }
            if (overrides.property === 'layerStyle') {
              replaceSelectedOverrides(
                overrides.value,
                overrides,
                documentLayerStyles,
                lookup.layer,
                'id'
              )
            }
            if (overrides.property === 'textStyle') {
              replaceSelectedOverrides(
                overrides.value,
                overrides,
                documentTextStyles,
                lookup.text,
                'id'
              )
            }
          })
        } else if (layer.sharedStyleId !== null) {
            replaceSelectedSharedStyles(
              layer,
              layer.sharedStyleId,
              documentLayerStyles,
              lookup.layer,
              documentTextStyles,
              lookup.text
            )
          }
      }
    }
  })
}
