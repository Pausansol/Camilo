export default function styles() {
	let styles = {

		// Panel dimens
		panelHeader: 20,
		panelHeight: 483,
		panelWidth: 378,
		panelGutter: 15,

		// List
		itemHeight: 72,
		itemWidth: 338,
		leftColWidth: 60,
		rightColPad: 8,
		rightColWidth: 270, //itemWidth - leftColWidth - rightColPad
		rightColX: 68, //rightColPad + leftColWidth

		// Fonts
		sectionFont: NSFont.boldSystemFontOfSize(15),
		titleFont: NSFont.boldSystemFontOfSize(12),
		subtitleFont: NSFont.systemFontOfSize(10),

		//Colors
		darkTextGrey: NSColor.colorWithCalibratedRed_green_blue_alpha(0,0,0,0.4),
		lightTextGrey: NSColor.colorWithCalibratedRed_green_blue_alpha(1,1,1,0.4),
		blackText: NSColor.colorWithCalibratedRed_green_blue_alpha(0,0,0,1),
		whiteText: NSColor.colorWithCalibratedRed_green_blue_alpha(1,1,1,1),
	}

	return styles
}