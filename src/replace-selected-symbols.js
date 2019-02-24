export default function (
  selectedSymbols, 
  librarySymbols) {
  
    
      const symbolToImport = librarySymbols[selectedSymbols.name]
      if(symbolToImport){
        console.log(symbolToImport)
        const imported = symbolToImport.import()
        selectedSymbols.symbolId = imported.symbolId
        selectedSymbols.name = imported.name
      }
}