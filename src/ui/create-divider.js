export default function createDivider(theme,frame) {
	var divider = NSView.alloc().initWithFrame(frame);

	divider.setWantsLayer(1);
	if (theme === 'dark') {
  divider.setBackgroundColor(NSColor.colorWithCalibratedRed_green_blue_alpha(0.22,0.22,0.22,1));
	} else {
  divider.layer().setBackgroundColor(CGColorCreateGenericRGB(204/255,204/255,204/255,1.0));
	}
	

	return divider;
}