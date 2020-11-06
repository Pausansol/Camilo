export default function(swatchID, doc, librarySwatches) {
	let currentSwatch = doc.swatchWithID(String(swatchID))
	let newSwatch = librarySwatches[currentSwatch.name()]
		if(newSwatch) {
			return newSwatch
		}
}
