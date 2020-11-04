import sketch from 'sketch'
import settings from 'sketch/settings'
import googleAnalytics from './analytics'
import switchLibrary from './switch-library'
import switchSelection from './switch-selection'
import createFloatingPanel from './ui/create-floating-panel'
import createScrollView from './ui/create-scroll-view'
import createView from './ui/create-view'
import createButton from './ui/create-button'
import createImage from './ui/create-image'
import createHelpButton from './ui/create-help-button'
import createText from './ui/create-text'
import createDivider from './ui/create-divider'
import createLibraryPreview from './ui/create-library-preview'
import createRadioButtons from './ui/create-radio-buttons'

const theme = sketch.UI.getTheme()
const libraries = sketch.getLibraries().filter(l => l.valid && l.enabled)
const pluginName = __command.pluginBundle().name()
const doc = sketch.getSelectedDocument()

//Settings
const lastSelected = settings.sessionVariable('Selected')

// Panel dimens
const panelHeader = 20
const panelFooter = 38
const panelHeight = panelHeader + 410 + panelFooter
const panelWidth = 378
const panelGutter = 15
const panelItems = []

// List
const itemHeight = 72
const itemWidth = 338
const leftColWidth = 60
const rightColPad = 8
const rightColWidth = itemWidth - leftColWidth - rightColPad
const rightColX = rightColPad + leftColWidth

// Fonts
const sectionFont = NSFont.boldSystemFontOfSize(15)
const titleFont = NSFont.boldSystemFontOfSize(12)
const subtitleFont = NSFont.systemFontOfSize(10)

//Colors
const darkTextGrey = NSColor.colorWithCalibratedRed_green_blue_alpha(0,0,0,0.4)
const lightTextGrey = NSColor.colorWithCalibratedRed_green_blue_alpha(1,1,1,0.4)
const blackText = NSColor.colorWithCalibratedRed_green_blue_alpha(0,0,0,1)
const whiteText = NSColor.colorWithCalibratedRed_green_blue_alpha(1,1,1,1)

export default function() {

  let fiber = sketch.Async.createFiber()
  let panel = createFloatingPanel(theme,pluginName,NSMakeRect(0,0,panelWidth,panelHeight))
  let panelClose = panel.standardWindowButton(NSWindowCloseButton)
  
  panelClose.setCOSJSTargetFunction(function() {
    panel.close()
    fiber.cleanup()
  })

  let panelContent = createView(NSMakeRect(0,0,panelWidth,panelHeight - panelHeader))
  let swapType = createRadioButtons(
    ['Apply to selection', 'Apply to document'],
    lastSelected
  )
  
  let themesTitle = createText(theme,blackText,whiteText,sectionFont,'Libraries',NSMakeRect(20,40,100,18))
  let optionsTitle = createText(theme,blackText,whiteText,sectionFont,'Options',NSMakeRect(20,334,100,18))
  let scrollViewMask = createImage(theme,NSMakeRect(20,75,338,239),'scrollViewMask.png','scrollViewMaskDark.png')
  let libraryList = createScrollView(theme,NSMakeRect(20,75,338,239))
  
  let addComponentsToPanel = [themesTitle,optionsTitle,swapType,libraryList,scrollViewMask].forEach(i => panelContent.addSubview(i))
  let itemContent = createView(NSMakeRect(0,0,itemWidth,itemHeight * libraries.length))
  let count = 0
  
  libraries.forEach(function(library,i){
    let lib = library
    let nativeLibrary = lib.sketchObject
    let nativeLibraryLayers = library.sketchObject.document().documentData().pages()
    let listItem = createView(NSMakeRect(0,itemHeight*count,itemWidth,itemHeight))
    let imageMask = createImage(theme,NSMakeRect(20,15,40,40),'mask.png','maskDark.png')
    let imageArea = createLibraryPreview(theme,nativeLibraryLayers,NSMakeRect(20,15,40,40))
    let artboardSubtitle = createText(theme,darkTextGrey,lightTextGrey,subtitleFont,String(library.libraryType),NSMakeRect(rightColX,38,rightColWidth-88,14))
    let artboardTitle = createText(theme,blackText,whiteText,titleFont,String(library.name),NSMakeRect(rightColX,20,rightColWidth-88,18))
    let divider = createDivider(theme,NSMakeRect(20,itemHeight - 1,itemWidth - 40,0.5))

    let button = NSButton.alloc().initWithFrame(NSMakeRect(237,18,88,36)) 
    button.setTitle('Swap')
    button.setBezelStyle(NSRoundedBezelStyle)
    button.setAction('callAction:')

    button.setCOSJSTargetFunction(function() {

      if (swapType.selectedCell().tag() === 0) {
        settings.setSessionVariable('Selected', 0)
        switchSelection(doc, lib)
        googleAnalytics(context, 'Replace selected with', lib.name, 'Library')
        const selectedLayers = doc.selectedLayers.layers
        if (selectedLayers.length < 1) {
          sketch.UI.message(`Select a layer`)
        } else {
          sketch.UI.message(`🎉 🎈 🙌🏼  Applied theme from ${lib.name}  🙌🏼 🎉 🎈`)
        }
      }

      if (swapType.selectedCell().tag() === 1) {
        settings.setSessionVariable('Selected', 1)
        switchLibrary(doc, lib)
        googleAnalytics(context, 'Replace document with', lib.name, 'Library')
        sketch.UI.message(`🎉 🎈 🙌🏼  Applied theme from ${lib.name}  🙌🏼 🎉 🎈`)     
      }
    })
    
    let addComponentsToList = [imageArea,imageMask,artboardSubtitle,artboardTitle,button,divider].forEach(i => listItem.addSubview(i))
    
    itemContent.addSubview(listItem)

    count++
  })

  libraryList.setDocumentView(itemContent)
  panel.contentView().addSubview(panelContent)
  googleAnalytics(context, 'Open Camilo', 'Alert', 'UI')
}