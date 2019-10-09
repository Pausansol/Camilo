export function createLookup(styles) {
  return styles.reduce((prev, s) => ({ ...prev, [s.name]: s }), {})
}

export default (document, library) => ({
  layer: createLookup(
    library.getImportableLayerStyleReferencesForDocument(document)
  ),
  text: createLookup(
    library.getImportableTextStyleReferencesForDocument(document)
  ),
})
