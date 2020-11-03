export default function setMask(theme,frame) {
 
  var image = NSButton.alloc().initWithFrame(frame);
  image.setBordered(0);
  image.setWantsLayer(1);
  image.layer().setBackgroundColor(NSColor.colorWithCalibratedRed_green_blue_alpha(2,2,2,0));
  if (theme === 'dark') {
  let mask = NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed('maskDark.png').path())
	 image.setImage(mask);
  image.setImageScaling(0)
	} else {
  let mask = NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed('mask.png').path())
	 image.setImage(mask);
  image.setImageScaling(0)
	}

  return image
}
