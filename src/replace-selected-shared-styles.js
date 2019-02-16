export default function (
  layer,
  sharedStyleId,
  documentLayerStyles,
  libraryLayerStyles,
  documentTextStyles, 
  libraryTextStyles,
  ) {

  documentLayerStyles.forEach(function(style){
    if(style.id == sharedStyleId){
      const styleToImport = libraryLayerStyles[style.name]
      
      if(styleToImport){
        const importedStyle = styleToImport.import()
        const importedStyleId = importedStyle.id
        layer.sharedStyleId = importedStyleId
      }
    }
  })
  documentTextStyles.forEach(function(style){
    if(style.id == sharedStyleId){
      const styleToImport = libraryTextStyles[style.name]
      
      if(styleToImport){
        const importedStyle = styleToImport.import()
        const importedStyleId = importedStyle.id
        layer.sharedStyleId = importedStyleId
      }
    }
  })
}