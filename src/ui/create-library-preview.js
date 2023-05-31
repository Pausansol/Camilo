import createImage from './create-image'

export function getLibraryPreview(source) {
	var artboardGroups = NSMutableArray.array();
	source.forEach(function (page) {
		var predicate = NSPredicate.predicateWithFormat('className == %@ && name == %@', 'MSArtboardGroup', 'Library Preview');
		page.children().filteredArrayUsingPredicate(predicate).forEach(instance => artboardGroups.addObject(instance));
	});
	if (artboardGroups.length > 0) {
		return artboardGroups[0];
	}
}

export default function createLibraryPreview(theme, source, frame) {
	let libraryPreviewImage = createImage(theme, frame, 'library.png', 'library.png');
	return libraryPreviewImage;
}

