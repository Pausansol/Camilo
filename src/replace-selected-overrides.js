export default function(
  overrideValue,
  overrides,
  documentStyles,
  libraryStyles,
  key
) {
  documentStyles.forEach((style) => {
    if (style[key] === overrideValue) {
      const styleToImport = libraryStyles[style.name]
      if (styleToImport) {
        const imported = styleToImport.import()
        const importedId = imported[key]
        overrides.value = importedId
      }
    }
  })
}
