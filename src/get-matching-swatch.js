export default function(swatchID, doc, librarySwatches) {
	let currentSwatch = doc.swatchWithID(String(swatchID))
	if(currentSwatch === null){
		return
	} else {
		let newSwatch = librarySwatches[currentSwatch.name()]
		if(newSwatch) {
			return newSwatch
		} 
	}
}
