export default function(
  layer,
  sharedStyleId,
  documentLayerStyles,
  libraryLayerStyles,
  documentTextStyles,
  libraryTextStyles
) {
  documentLayerStyles.forEach((style) => {
    if (style.id === sharedStyleId) {
      const styleToImport = libraryLayerStyles[style.name]

      if (styleToImport) {
        const importedStyle = styleToImport.import()
        const importedStyleId = importedStyle.id
        layer.sharedStyleId = importedStyleId
        layer.style.syncWithSharedStyle(importedStyle)
      }
    }
  })
  documentTextStyles.forEach((style) => {
    if (style.id === sharedStyleId) {
      const styleToImport = libraryTextStyles[style.name]

      if (styleToImport) {
        const importedStyle = styleToImport.import()
        const importedStyleId = importedStyle.id
        layer.sharedStyleId = importedStyleId
        layer.style.syncWithSharedStyle(importedStyle)
      }
    }
  })
}
