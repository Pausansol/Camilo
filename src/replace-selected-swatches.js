import sketch from 'sketch'
import replaceSelectedSwatches from './replace-selected-swatches'
import getMatchingSwatch from './get-matching-swatch'
import importSwatchFromLibrary from './import-swatch-from-library'
import createColorWithSwatch from './create-color-with-swatch'
import replaceSelectedSymbolSwatches from './replace-selected-symbol-swatches'

export default function(docLayers, nativeLibSwatches, nativeLibrary) {
	docLayers.forEach((layer) => {
		let nativeLayer = layer.sketchObject
		switch(String(nativeLayer.class())) {
			case "MSTextLayer":
				if(String(nativeLayer.style().textStyle().encodedAttributes().MSAttributedStringColorAttribute.swatchID()) != 'null'){
					let matchingSwatch = getMatchingSwatch(nativeLayer.style().textStyle().encodedAttributes().MSAttributedStringColorAttribute.swatchID(), context.document.documentData(), nativeLibSwatches)
					let newSwatch = importSwatchFromLibrary(matchingSwatch, nativeLibrary)
					let newColor = createColorWithSwatch(newSwatch)
					nativeLayer.setTextColor(newColor);
				}
				if(nativeLayer.style().fills().length>0) {
					nativeLayer.style().fills().forEach(function(fill){
						if(String(fill.color().swatchID()) != 'null'){
							let matchingSwatch = getMatchingSwatch(fill.color().swatchID(), context.document.documentData(), nativeLibSwatches)
							let newSwatch = importSwatchFromLibrary(matchingSwatch, nativeLibrary)
							fill.color().setSwatch(newSwatch.localSwatch())
						}
					})
				}
				if(nativeLayer.style().borders().length>0) {
					nativeLayer.style().borders().forEach(function(border){
						if(String(border.color().swatchID()) != 'null'){
							let matchingSwatch = getMatchingSwatch(border.color().swatchID(), context.document.documentData(), nativeLibSwatches)
							let newSwatch = importSwatchFromLibrary(matchingSwatch, nativeLibrary)
							border.color().setSwatch(newSwatch.localSwatch())
						}
					})
				}
			break;
			
			case "MSSymbolInstance":
				// let jsLayer = sketch.fromNative(nativeLayer)
        let jsSymbolMaster = layer.master
        if(jsSymbolMaster.overrides.length>0){
          jsSymbolMaster.overrides.forEach(function(jsOverride){
          	replaceSelectedSymbolSwatches(jsOverride,nativeLayer, layer, jsSymbolMaster, nativeLibSwatches, nativeLibrary)
        	})
        }
				break;

			default:
				if(nativeLayer.style().fills().length>0) {
					nativeLayer.style().fills().forEach(function(fill){
						if(String(fill.color().swatchID()) != 'null'){
							let matchingSwatch = getMatchingSwatch(fill.color().swatchID(), context.document.documentData(), nativeLibSwatches)
							let newSwatch = importSwatchFromLibrary(matchingSwatch, nativeLibrary)
							fill.color().setSwatch(newSwatch.localSwatch())
						}
					})
				}
				if(nativeLayer.style().borders().length>0) {
					nativeLayer.style().borders().forEach(function(border){
						if(String(border.color().swatchID()) != 'null'){
							let matchingSwatch = getMatchingSwatch(border.color().swatchID(), context.document.documentData(), nativeLibSwatches)
							let newSwatch = importSwatchFromLibrary(matchingSwatch, nativeLibrary)
							border.color().setSwatch(newSwatch.localSwatch())
						}
					})
				}
			break;
		}
		// Iterate through layers array
		if(typeof nativeLayer.layers === 'function') {
    	replaceSelectedSwatches(layer.layers, nativeLibSwatches, nativeLibrary)
  	}
	})
}