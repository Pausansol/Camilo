export default function createView(frame) {
	var view = NSView.alloc().initWithFrame(frame);
	

	view.setFlipped(1);

	return view;
}