import sketch from 'sketch'
import getMatchingSwatch from './get-matching-swatch'
import importSwatchFromLibrary from './import-swatch-from-library'
import createColorWithSwatch from './create-color-with-swatch'
import replaceSelectedSymbolSwatches from './replace-selected-symbol-swatches'

export default function(jsOverride,nativeLayer, jsLayer, jsSymbolMaster,nativeDocSwatches, nativeLibrary){
  
  let override = jsOverride.sketchObject

  if(String(override.currentValue().class()) == 'MSColor' || String(override.currentValue().class()) == 'MSImmutableColor'){
    let jsOverride = sketch.fromNative(override)
    if(jsOverride.isDefault){
      let currentSwatchID = override.currentValue().swatchID()
      // If there is a swatch with same ID in current document
      let match = context.document.documentData().swatchWithID(String(currentSwatchID))
      if(match == null){    
      
        let jsLib = jsSymbolMaster.getLibrary()
        let nativeLibFromSymbol = jsLib.sketchObject
        let overrideValue = override.overridePoint()
        let matchingSwatch = getMatchingSwatch(override.currentValue().swatchID(), nativeLibFromSymbol.document().documentData(), nativeDocSwatches.libraryColorVariables)
        
        if (matchingSwatch === undefined){
          let pe = nativeLibFromSymbol.document().documentData().allSymbols()
          pe.forEach(function(p){
            if(sketch.fromNative(p).getLibrary() != null){
              let l = sketch.fromNative(p).getLibrary()
              let le = l.sketchObject
              let we = sketch.fromNative(p)
              
              we.overrides.forEach(function(m){
                if(String(m.sketchObject.currentValue().class()) == 'MSColor' || String(m.sketchObject.currentValue().class()) == 'MSImmutableColor'){
                  let matchingSwatch = getMatchingSwatch(m.sketchObject.currentValue().swatchID(), le.document().documentData(), nativeDocSwatches.libraryColorVariables)
                  if (matchingSwatch === undefined){
                    replaceSelectedSymbolSwatches(jsOverride,nativeLayer, jsLayer, we,nativeDocSwatches, le)
                  } else {
                    let newSwatch = importSwatchFromLibrary(matchingSwatch, le)
                    let newColor = createColorWithSwatch(newSwatch)
                    nativeLayer.setValue_forOverridePoint(newColor, overrideValue)
                  }
                }
              })
            }
          })

        }else{ 
        let newSwatch = importSwatchFromLibrary(matchingSwatch, nativeLibrary)
        let newColor = createColorWithSwatch(newSwatch)
        nativeLayer.setValue_forOverridePoint(newColor, overrideValue)
        }
      } else {
        let overrideValue = override.overridePoint()
        let matchingSwatch = getMatchingSwatch(override.currentValue().swatchID(), context.document.documentData(), nativeDocSwatches.libraryColorVariables)
        let newSwatch = importSwatchFromLibrary(matchingSwatch, nativeLibrary)
        let newColor = createColorWithSwatch(newSwatch)
        nativeLayer.setValue_forOverridePoint(newColor, overrideValue)
      }
    } else {      
      let overrideValue = override.overridePoint()
      let matchingSwatch = getMatchingSwatch(override.currentValue().swatchID(), context.document.documentData(), nativeDocSwatches.libraryColorVariables)
      let newSwatch = importSwatchFromLibrary(matchingSwatch, nativeLibrary)
      let newColor = createColorWithSwatch(newSwatch)
      nativeLayer.setValue_forOverridePoint(newColor, overrideValue)
    }
  }
}