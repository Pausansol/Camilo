export default function createImage(theme,frame,imagePath,imagePathDark) {
 
  var image = NSImageView.alloc().initWithFrame(frame);
  
  if (theme === 'dark') {
  let mask = NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed(String(imagePathDark)).path())
    image.setImage(mask);
    image.setImageScaling(0)
	} else {
  let mask = NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed(String(imagePath)).path())
    image.setImage(mask);
    image.setImageScaling(0)
	}
  return image
}
