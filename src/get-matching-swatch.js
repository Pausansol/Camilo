export default function(swatchID, doc, librarySwatches) {
	let currentSwatch = doc.swatchWithID(String(swatchID))
	if(currentSwatch === null){
		return
	} else {
		let newSwatch = librarySwatches.find(swatch => swatch.name() === currentSwatch.name());
		return newSwatch	
	}
}