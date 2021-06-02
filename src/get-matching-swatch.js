export default function(swatchID, doc, librarySwatches) {
	let currentSwatch = doc.swatchWithID(String(swatchID))
	if(currentSwatch === null){
		return
	} else {
		let newSwatch = librarySwatches.find(swatch => String(swatch.name()) === String(currentSwatch.name()));
		return newSwatch	
	}
}