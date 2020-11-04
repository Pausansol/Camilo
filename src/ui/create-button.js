export default function createButton(label,frame) {
	var button = NSButton.alloc().initWithFrame(frame)
	button.setTitle(label)
	button.setBezelStyle(NSRoundedBezelStyle)
	button.setAction('callAction:')
	
	return button
}