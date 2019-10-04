export default function createSelect(items, selectedItemIndex, frame) {
  var comboBox = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 0, 300, 28)),
    selectedItemIndex = selectedItemIndex > -1 ? selectedItemIndex : 0

  comboBox.addItemsWithObjectValues(items)
  comboBox.selectItemAtIndex(selectedItemIndex)
  comboBox.setNumberOfVisibleItems(16)
  comboBox.setCompletes(1)

  return comboBox
}
