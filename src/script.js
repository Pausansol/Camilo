import sketch from 'sketch'
import googleAnalytics from './analytics'
import createFloatingPanel from './ui/create-floating-panel'
import styles from './ui/styles'
import main from './main'

const theme = sketch.UI.getTheme()
const libraries = sketch.getLibraries().filter(l => l.valid && l.enabled)
const pluginName = __command.pluginBundle().name()
const doc = sketch.getSelectedDocument()

export default function() {

  let panelStyles = styles()
  let panelContent = main(panelStyles,theme,doc,libraries)

  let fiber = sketch.Async.createFiber()
  let panel = createFloatingPanel(theme,pluginName,NSMakeRect(0,0,panelStyles.panelWidth,panelStyles.panelHeight))
  let panelClose = panel.standardWindowButton(NSWindowCloseButton)
  
  panelClose.setCOSJSTargetFunction(function() {
    panel.close()
    fiber.cleanup()
  })

  panel.contentView().addSubview(panelContent)
  googleAnalytics(context, 'Open Camilo', 'Alert', 'UI')
}