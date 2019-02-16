export default function createAlertWindow(context) {
  const alertWindow = COSAlertWindow.new()
  
  alertWindow.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed('icon.png').path()))
  alertWindow.setMessageText('Camilo')
  alertWindow.setInformativeText("Select a theme library to switch 🎉 with")

  return alertWindow
}