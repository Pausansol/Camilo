export default function createText(theme,color,colorDark,font,string,frame) {
	
	var field = NSTextField.alloc().initWithFrame(frame)

	field.setStringValue(string)
	field.setFont(font)
	field.setBezeled(0)
	field.setEditable(0)
	field.setDrawsBackground(false)
	field.setLineBreakMode(NSLineBreakByTruncatingTail);

	//Themes colors
	if (theme === 'dark') {
  field.setTextColor(colorDark)
	} else {
  field.setTextColor(color)
	}

	return field
}