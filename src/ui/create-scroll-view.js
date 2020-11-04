export default function createScrollView(theme,frame) {
	var view = NSScrollView.alloc().initWithFrame(frame)
	if (theme === 'dark') {
  view.setBackgroundColor(NSColor.colorWithCalibratedRed_green_blue_alpha(0.17,0.17,0.17,1))
	} else {
  view.setBackgroundColor(NSColor.colorWithCalibratedRed_green_blue_alpha(0.95,0.95,0.95,1))
	}
	
	view.setHasVerticalScroller(1)
	
	return view
}
