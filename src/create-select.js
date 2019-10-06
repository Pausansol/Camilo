export default function createSelect(items, selectedItemIndexParam, frame) {
  const comboBox = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 0, 300, 28))
  const selectedItemIndex = selectedItemIndexParam > -1 ? selectedItemIndexParam : 0

  comboBox.addItemsWithObjectValues(items)
  comboBox.selectItemAtIndex(selectedItemIndex)
  comboBox.setNumberOfVisibleItems(16)
  comboBox.setCompletes(1)

  return comboBox
}
