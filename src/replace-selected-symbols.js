export default function(selectedSymbols, librarySymbols, documentSymbols) {
  const symbolMasterName = documentSymbols[selectedSymbols.symbolId]

  if (symbolMasterName) {
    const symbolToImport = librarySymbols[symbolMasterName.name]
    if (symbolToImport) {
      const imported = symbolToImport.import()
      selectedSymbols.symbolId = imported.symbolId
      selectedSymbols.name = imported.name
    }
  }
}
