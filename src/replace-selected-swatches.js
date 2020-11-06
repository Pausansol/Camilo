import sketch from 'sketch'
import replaceSelectedSwatches from './replace-selected-swatches'
import getMatchingSwatch from './get-matching-swatch'
import importSwatchFromLibrary from './import-swatch-from-library'
import createColorWithSwatch from './create-color-with-swatch'

export default function(docLayers, nativeDocSwatches, nativeLibrary) {
	docLayers.forEach((layer) => {
		let nativeLayer = layer.sketchObject
		switch(String(nativeLayer.class())) {
			case "MSTextLayer":
				if(String(nativeLayer.style().textStyle().encodedAttributes().MSAttributedStringColorAttribute.swatchID()) != 'null'){
					let matchingSwatch = getMatchingSwatch(nativeLayer.style().textStyle().encodedAttributes().MSAttributedStringColorAttribute.swatchID(), context.document.documentData(), nativeDocSwatches.libraryColorVariables)
					let newSwatch = importSwatchFromLibrary(matchingSwatch, nativeLibrary)
					let newColor = createColorWithSwatch(newSwatch)
					nativeLayer.setTextColor(newColor);
				}
				if(nativeLayer.style().fills().length>0) {
					nativeLayer.style().fills().forEach(function(fill){
						if(String(fill.color().swatchID()) != 'null'){
							let matchingSwatch = getMatchingSwatch(fill.color().swatchID(), context.document.documentData(), nativeDocSwatches.libraryColorVariables)
							let newSwatch = importSwatchFromLibrary(matchingSwatch, nativeLibrary)
							fill.color().setSwatch(newSwatch.localSwatch())
						}
					})
				}
				if(nativeLayer.style().borders().length>0) {
					nativeLayer.style().borders().forEach(function(border){
						if(String(border.color().swatchID()) != 'null'){
							let matchingSwatch = getMatchingSwatch(border.color().swatchID(), context.document.documentData(), nativeDocSwatches.libraryColorVariables)
							let newSwatch = importSwatchFromLibrary(matchingSwatch, nativeLibrary)
							border.color().setSwatch(newSwatch.localSwatch())
						}
					})
				}
			break;
			
			case "MSSymbolInstance":
				let jsLayer = sketch.fromNative(nativeLayer)
				let jsSymbolMaster = jsLayer.master
				if(jsSymbolMaster.overrides.length>0){
					jsSymbolMaster.overrides.forEach(function(jsOverride){
						let override = jsOverride.sketchObject

						if(String(override.currentValue().class()) == 'MSColor' || String(override.currentValue().class()) == 'MSImmutableColor'){
							let jsOverride = sketch.fromNative(override)
							if(jsOverride.isDefault){
								let currentSwatchID = override.currentValue().swatchID()
								let match = context.document.documentData().swatchWithID(String(currentSwatchID))
								if(match == null){
									
									let jsLib = jsSymbolMaster.getLibrary()
									let nativeLibFromSymbol = jsLib.sketchObject
									let overrideValue = override.overridePoint()
									let matchingSwatch = getMatchingSwatch(override.currentValue().swatchID(), nativeLibFromSymbol.document().documentData(), nativeDocSwatches.libraryColorVariables)
									let newSwatch = importSwatchFromLibrary(matchingSwatch, nativeLibrary)
									let newColor = createColorWithSwatch(newSwatch)
									nativeLayer.setValue_forOverridePoint(newColor, overrideValue)
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
					})
				}
				break;

			default:
				if(nativeLayer.style().fills().length>0) {
					nativeLayer.style().fills().forEach(function(fill){
						if(String(fill.color().swatchID()) != 'null'){
							let matchingSwatch = getMatchingSwatch(fill.color().swatchID(), context.document.documentData(), nativeDocSwatches.libraryColorVariables)
							let newSwatch = importSwatchFromLibrary(matchingSwatch, nativeLibrary)
							fill.color().setSwatch(newSwatch.localSwatch())
						}
					})
				}
				if(nativeLayer.style().borders().length>0) {
					nativeLayer.style().borders().forEach(function(border){
						if(String(border.color().swatchID()) != 'null'){
							let matchingSwatch = getMatchingSwatch(border.color().swatchID(), context.document.documentData(), nativeDocSwatches.libraryColorVariables)
							let newSwatch = importSwatchFromLibrary(matchingSwatch, nativeLibrary)
							border.color().setSwatch(newSwatch.localSwatch())
						}
					})
				}
			break;
		}
		// Iterate through layers array
		if(typeof nativeLayer.layers === 'function') {
    	replaceSelectedSwatches(nativeLayer.layers(), nativeDocSwatches, nativeLibrary)
  	}
	})
}