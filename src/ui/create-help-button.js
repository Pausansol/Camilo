export default function createHelpButton(label,frame) {
	
	var button = NSButton.alloc().initWithFrame(frame)
	
	button.setTitle(label)
	button.setBezelStyle(NSHelpButtonBezelStyle)
	button.setAction('callAction:')
	
	return button
}