export default function getOptionSelected(libraries) {
  
  const options = []
  const optionSelected = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 0, 240, 28))
  
  libraries.forEach(function (lib) {
    options.push(lib.name)
  })
  
  optionSelected.i18nObjectValues = options
  optionSelected.setEditable(false)
  optionSelected.addItemsWithObjectValues(options)
  optionSelected.selectItemAtIndex(0)
  
  return optionSelected
}