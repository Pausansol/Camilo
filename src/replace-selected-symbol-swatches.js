import { toArray } from 'util'
import sketch from 'sketch'
import getMatchingSwatch from './get-matching-swatch'
import importSwatchFromLibrary from './import-swatch-from-library'
import createColorWithSwatch from './create-color-with-swatch'
import replaceSelectedSymbolSwatches from './replace-selected-symbol-swatches'

export default function(override,nativeLayer, symbolMaster, nativeLibSwatches, nativeLibrary,librariesController){  

  if(String(override.currentValue().class()) == 'MSColor' || String(override.currentValue().class()) == 'MSImmutableColor'){
    if(override.hasOverride() === 0){
      let currentSwatchID = override.currentValue().swatchID()
      // If there is a swatch with same ID in current document
      let match = context.document.documentData().swatchWithID(String(currentSwatchID))
      if(match == null){    
        let nativeLibFromSymbol = librariesController.libraryForShareableObject(symbolMaster)
        let overrideValue = override.overridePoint()
        let matchingSwatch = getMatchingSwatch(override.currentValue().swatchID(), nativeLibFromSymbol.document().documentData(), nativeLibSwatches)
        
        if (matchingSwatch === undefined){
          let pe = nativeLibFromSymbol.document().documentData().allSymbols()
          pe.forEach(function(p){
            if(librariesController.libraryForShareableObject(p) != null){
              let le = librariesController.libraryForShareableObject(p)
              let overrides = toArray(MSAvailableOverride.flattenAvailableOverrides(p.availableOverrides()))
              
              overrides.forEach(function(m){
                if(String(m.currentValue().class()) == 'MSColor' || String(m.currentValue().class()) == 'MSImmutableColor'){
                  let matchingSwatch = getMatchingSwatch(m.currentValue().swatchID(), le.document().documentData(), nativeLibSwatches)
                  if (matchingSwatch === undefined){
                    replaceSelectedSymbolSwatches(override,nativeLayer,p,nativeLibSwatches, le, librariesController)
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
        let matchingSwatch = getMatchingSwatch(override.currentValue().swatchID(), context.document.documentData(), nativeLibSwatches)
        let newSwatch = importSwatchFromLibrary(matchingSwatch, nativeLibrary)
        let newColor = createColorWithSwatch(newSwatch)
        nativeLayer.setValue_forOverridePoint(newColor, overrideValue)
      }
    } else {      
      let overrideValue = override.overridePoint()
      let matchingSwatch = getMatchingSwatch(override.currentValue().swatchID(), context.document.documentData(), nativeLibSwatches)
      let newSwatch = importSwatchFromLibrary(matchingSwatch, nativeLibrary)
      let newColor = createColorWithSwatch(newSwatch)
      nativeLayer.setValue_forOverridePoint(newColor, overrideValue)
    }
  }
}