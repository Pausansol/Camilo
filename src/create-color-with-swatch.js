export default function (newSwatch) {
	let newColor = MSColor.blackColor()
	newColor.setSwatch(newSwatch.localSwatch())
	return newColor
}