export default function createFloatingPanel(theme,title,frame) {
	var panel = NSPanel.alloc().init();

	panel.setTitle(title);
	panel.setFrame_display(frame,true);
	panel.setStyleMask(NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask | NSFullSizeContentViewWindowMask);
	if (theme === 'dark') {
  panel.setBackgroundColor(NSColor.colorWithCalibratedRed_green_blue_alpha(0.2,0.2,0.2,1));
	} else {
  panel.setBackgroundColor(NSColor.colorWithCalibratedRed_green_blue_alpha(1,1,1,1));
	}
	panel.setLevel(NSFloatingWindowLevel);
	panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true);
	panel.standardWindowButton(NSWindowZoomButton).setHidden(true);
	panel.makeKeyAndOrderFront(null);
	panel.center();

	return panel;
}