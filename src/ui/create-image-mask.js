export default function createImageMask(theme,frame,path,pathDark) {
 
  var image = NSButton.alloc().initWithFrame(frame);
  image.setBordered(0);
  image.setWantsLayer(1);
  image.layer().setBackgroundColor(NSColor.colorWithCalibratedRed_green_blue_alpha(2,2,2,0));
  if (theme === 'dark') {
  let mask = NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed(String(pathDark)).path())
	 image.setImage(mask);
  image.setImageScaling(0)
	} else {
  let mask = NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed(String(path)).path())
	 image.setImage(mask);
  image.setImageScaling(0)
	}

  return image
}
