export default function createRadioButtons(options, selected, format, x, y) {
  var rows = options.length,
    columns = 1,
    buttonMatrixWidth = 300,
    buttonCellWidth = buttonMatrixWidth,
    x = x ? x : 0,
    y = y ? y : 0

  if (format && format != 0) {
    rows = options.length / 2
    columns = 2
    buttonMatrixWidth = 300
    buttonCellWidth = buttonMatrixWidth / columns
  }

  var buttonCell = NSButtonCell.alloc().init()

  buttonCell.setButtonType(NSRadioButton)

  var buttonMatrix = NSMatrix.alloc().initWithFrame_mode_prototype_numberOfRows_numberOfColumns(
    NSMakeRect(x, y, buttonMatrixWidth, rows * 24),
    NSRadioModeMatrix,
    buttonCell,
    rows,
    columns
  )

  buttonMatrix.setCellSize(NSMakeSize(buttonCellWidth, 24))

  var i = 0

  for (i = 0; i < options.length; i++) {
    buttonMatrix
      .cells()
      .objectAtIndex(i)
      .setTitle(options[i])
    buttonMatrix
      .cells()
      .objectAtIndex(i)
      .setTag(i)
  }

  buttonMatrix.selectCellAtRow_column(selected, 0)

  return buttonMatrix
}
