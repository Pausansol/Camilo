export default function(matchingSwatch, nativeLibrary) {
	let newSwatch = MSForeignSwatch.alloc().initWithOriginalObject_inLibrary(matchingSwatch, nativeLibrary)
	let addNewSwatch = context.document.documentData().addForeignSwatch(newSwatch)
	return newSwatch
}