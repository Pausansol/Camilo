import setScrollViewMask from './set-scroll-view-mask'

export default function createImage(theme,libraryPreviewLayer,frame) {
	let image = NSImageView.alloc().initWithFrame(frame);
	
	if(libraryPreviewLayer != undefined || null){
		let exportRequest = MSExportRequest.exportRequestsFromExportableLayer_inRect_useIDForName_(
		libraryPreviewLayer,
		libraryPreviewLayer.absoluteInfluenceRect(),
		false
		).firstObject();
		
		exportRequest.format = 'png';

		let colorSpace = NSColorSpace.sRGBColorSpace();
		let exporter = MSExporter.exporterForRequest_colorSpace_(exportRequest,colorSpace);
		let imageRep = exporter.bitmapImageRep();
		
		let libraryPreviewImage = NSImage.alloc().init().autorelease();
		libraryPreviewImage.addRepresentation(imageRep);
		image.setImage(libraryPreviewImage);
		image.setImageScaling(3)
		
		return image;

	} else {

		let libraryPreviewImage = setScrollViewMask(theme,frame,'library.png','library.png');
		return libraryPreviewImage;
	}
}

