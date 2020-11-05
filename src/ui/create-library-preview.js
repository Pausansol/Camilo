import createImage from './create-image'

export function getLibraryPreview(source) {
	var artboardGroups = NSMutableArray.array();
	source.forEach(function(page){
		var predicate = NSPredicate.predicateWithFormat('className == %@ && name == %@', 'MSArtboardGroup' , 'Library Preview');
		page.children().filteredArrayUsingPredicate(predicate).forEach(instance => artboardGroups.addObject(instance));
	});
	if(artboardGroups.length>0){
		return artboardGroups[0];
	}
}

export default function createLibraryPreview(theme,source,frame) {
	let image = NSImageView.alloc().initWithFrame(frame)
	let libraryPreviewLayer = getLibraryPreview(source)
	
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

		let libraryPreviewImage = createImage(theme,frame,'library.png','library.png');
		return libraryPreviewImage;
	}
}

