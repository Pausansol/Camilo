export default function overridesFromPagesTree(
  layers,
  lookup,
  documentSymbols,
  documentLayerStyles,
  documentTextStyles
  ) {

  layers.forEach(function (layers) {
    if(layers.layers != undefined){
      overridesFromPagesTree(
        layers.layers,
        lookup,
        documentSymbols,
        documentLayerStyles,
        documentTextStyles,
    )}
    if(layers.layers == undefined){
      if(layers.type == 'SymbolInstance'){
        // replaceSelectedSymbols(layers, librarysymbols)
        console.log('found symbol')
      }
      if(layers.overrides != undefined){
        layers.overrides.forEach(function (overrides) {
          if(overrides.property == 'symbolID'){
            // replaceLayerOverrides(overrides.value, overrides, documentSymbols, lookup.symbol, 'symbolId')
            console.log('found symbol override')
          }
          if(overrides.property == 'layerStyle'){
            // replaceLayerOverrides(overrides.value, overrides, documentLayerStyles, lookup.layer, 'id')
            console.log('found layerStyle override')
          }
          if(overrides.property == 'textStyle'){
            // replaceLayerOverrides(overrides.value, overrides, documentTextStyles, lookup.text, 'id')
            console.log('found textStyle override')
          }
        });
      } else {
        if(layers.sharedStyleId != null){
          // replaceLayerSharedStyles(layers, layers.sharedStyleId, documentlayerstyles, librarylayerstyles, documenttextstyles, librarytextstyles)
          console.log('found layer with style')
        }
      }
    }
  });
}