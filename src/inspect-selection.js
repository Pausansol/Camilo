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

  layers.forEach(function(layers){
    if(layers.layers != undefined){
      inspectSelection(
        layers.layers,
        lookup,
        documentSymbols,
        documentLayerStyles,
        documentTextStyles,
    )}
    if(layers.layers == undefined){
      if(layers.type == 'SymbolInstance'){
        replaceSelectedSymbols(layers, lookup.symbol)
      }
      if(layers.overrides != undefined){
        layers.overrides.forEach(function(overrides){
          if(overrides.property == 'symbolID'){
            replaceSelectedOverrides(overrides.value, overrides, documentSymbols, lookup.symbol, 'symbolId')
          }
          if(overrides.property == 'layerStyle'){
            replaceSelectedOverrides(overrides.value, overrides, documentLayerStyles, lookup.layer, 'id')
          }
          if(overrides.property == 'textStyle'){
            replaceSelectedOverrides(overrides.value, overrides, documentTextStyles, lookup.text, 'id')
          }
        });
      } else {
        if(layers.sharedStyleId != null){
          replaceSelectedSharedStyles(layers, layers.sharedStyleId, documentLayerStyles, lookup.layer, documentTextStyles, lookup.text)
        }
      }
    }
  });
}