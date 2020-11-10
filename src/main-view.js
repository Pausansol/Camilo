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


export default function(panelStyles, theme, doc, libraries) {

  //Settings
  let lastSelected = settings.sessionVariable('Selected')

  let panelContent = createView(NSMakeRect(0,0,panelStyles.panelWidth,panelStyles.panelHeight - panelStyles.panelHeader))
  let swapType = createRadioButtons(
    ['Apply to selection', 'Apply to document'],
    lastSelected
  )
  
  let themesTitle = createText(theme,panelStyles.blackText,panelStyles.whiteText,panelStyles.sectionFont,'Libraries',NSMakeRect(20,40,100,18))
  let optionsTitle = createText(theme,panelStyles.blackText,panelStyles.whiteText,panelStyles.sectionFont,'Options',NSMakeRect(20,334,100,18))
  let scrollViewMask = createImage(theme,NSMakeRect(20,75,338,239),'scrollViewMask.png','scrollViewMaskDark.png')
  let libraryList = createScrollView(theme,NSMakeRect(20,75,338,239))
  
  let addComponentsToPanel = [themesTitle,optionsTitle,swapType,libraryList,scrollViewMask].forEach(i => panelContent.addSubview(i))
  let itemContent = createView(NSMakeRect(0,0,panelStyles.itemWidth,panelStyles.itemHeight * libraries.length))
  let count = 0
  
  libraries.forEach(function(library,i){
    let lib = library
    let nativeLibrary = lib.sketchObject
    let nativeLibraryLayers = library.sketchObject.document().documentData().pages()
    let listItem = createView(NSMakeRect(0,panelStyles.itemHeight*count,panelStyles.itemWidth,panelStyles.itemHeight))
    let imageMask = createImage(theme,NSMakeRect(20,15,40,40),'mask.png','maskDark.png')
    let imageArea = createLibraryPreview(theme,nativeLibraryLayers,NSMakeRect(20,15,40,40))
    let artboardSubtitle = createText(theme,panelStyles.darkTextGrey,panelStyles.lightTextGrey,panelStyles.subtitleFont,String(library.libraryType),NSMakeRect(panelStyles.rightColX,38,panelStyles.rightColWidth-88,14))
    let artboardTitle = createText(theme,panelStyles.blackText,panelStyles.whiteText,panelStyles.titleFont,String(library.name),NSMakeRect(panelStyles.rightColX,20,panelStyles.rightColWidth-88,18))
    let divider = createDivider(theme,NSMakeRect(20,panelStyles.itemHeight - 1,panelStyles.itemWidth - 40,0.5))

    let button = NSButton.alloc().initWithFrame(NSMakeRect(237,18,88,36)) 
    button.setTitle('Swap')
    button.setBezelStyle(NSRoundedBezelStyle)
    button.setAction('callAction:')

    button.setCOSJSTargetFunction(function() {
      let doc = sketch.getSelectedDocument()

      if (swapType.selectedCell().tag() === 0) {
        settings.setSessionVariable('Selected', 0)
      const selectedLayers = doc.selectedLayers.layers
        if (selectedLayers.length < 1) {
          sketch.UI.message(`Select a layer`)
        } else {         
          switchSelection(doc, lib)          
          googleAnalytics(context, 'Replace selected with', lib.name, 'Library')
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

  return panelContent
}