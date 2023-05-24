export default function (matchingSwatch, nativeLibrary) {
	if (matchingSwatch && nativeLibrary) {
		let newSwatch = MSForeignSwatch.alloc().initWithOriginalObject_inLibrary(matchingSwatch, nativeLibrary)
		return newSwatch
	}
}