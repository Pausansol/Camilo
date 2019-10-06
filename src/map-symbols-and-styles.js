export function createIdLookup(styles) {
  return styles.reduce((prev, s) => {
    // eslint-disable-next-line no-param-reassign
    prev[s.symbolId] = s
    return prev
  }, {})
}

export function createLookup(styles) {
  return styles.reduce((prev, s) => {
    // eslint-disable-next-line no-param-reassign
    prev[s.name] = s
    return prev
  }, {})
}

export default (document, library) => ({
  layer: createLookup(
    library.getImportableLayerStyleReferencesForDocument(document)
  ),
  text: createLookup(
    library.getImportableTextStyleReferencesForDocument(document)
  ),
  symbol: createLookup(
    library.getImportableSymbolReferencesForDocument(document)
  ),
  documentsymbol: createIdLookup(document.getSymbols()),
})
