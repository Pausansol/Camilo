export default function createRadioButtons(options, selected, format, x = 20, y = 390) {
  let rows = options.length;
    let columns = 1;
    let buttonMatrixWidth = 300;
    let buttonCellWidth = buttonMatrixWidth;

  if (format && format !== 0) {
    rows = options.length / 2
    columns = 2
    buttonMatrixWidth = 300
    buttonCellWidth = buttonMatrixWidth / columns
  }

  const buttonCell = NSButtonCell.alloc().init()

  buttonCell.setButtonType(NSRadioButton)

  const buttonMatrix = NSMatrix.alloc().initWithFrame_mode_prototype_numberOfRows_numberOfColumns(
    NSMakeRect(x, y, buttonMatrixWidth, rows * 24),
    NSRadioModeMatrix,
    buttonCell,
    rows,
    columns
  )

  buttonMatrix.setCellSize(NSMakeSize(buttonCellWidth, 24))

  let i = 0

  for (i = 0; i < options.length; i +=1 ) {
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
