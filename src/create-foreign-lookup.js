import { createLookup } from './map-shared-styles'

// this loops through all the overrides to find shared style belonging to libraries
// that haven't been imported to the document yet. This can happens when the default
// value of an override is a shared style from another library
export default (document, symbolInstances) => {
  const map = {
    text: {},
    layer: {},
  }
  const styleLookup = {
    text: {},
    layer: {},
  }
  const importableLookup = {
    text: {},
    layer: {},
  }

  function findMatchingSharedStyle(library, override, key, Key) {
    let importableLibrarySharedStyles = importableLookup[key][library.id]
    if (!importableLibrarySharedStyles) {
      importableLibrarySharedStyles = library[
        `getImportable${Key}StyleReferencesForDocument`
      ](document)
      importableLookup[key][library.id] = importableLibrarySharedStyles
    }

    let importableOriginalSharedStyle = importableLibrarySharedStyles.find(
      ({ id }) => id === override.value
    )
    if (!importableOriginalSharedStyle) {
      // if we can't import it from the library, it might be coming from a library of the library 🤯
      let librarySharedStyles = styleLookup[key][library.id]
      if (!librarySharedStyles) {
        librarySharedStyles = library.getDocument()[`getShared${Key}Styles`]()
        styleLookup[key][library.id] = librarySharedStyles
      }
      const originalSharedStyle = librarySharedStyles.find(
        ({ id }) => id === override.value
      )

      if (!originalSharedStyle) {
        // we can't do anything here :(
        return
      }

      const transitiveLibrary = originalSharedStyle.getLibrary()

      if (!transitiveLibrary || !transitiveLibrary.valid) {
        return
      }

      importableLibrarySharedStyles =
        importableLookup[key][transitiveLibrary.id]
      if (!importableLibrarySharedStyles) {
        importableLibrarySharedStyles = transitiveLibrary[
          `getImportable${Key}StyleReferencesForDocument`
        ](document)
        importableLookup[key][
          transitiveLibrary.id
        ] = importableLibrarySharedStyles
      }

      importableOriginalSharedStyle = importableLibrarySharedStyles.find(
        ({ name }) => name === originalSharedStyle.name
      )
    }

    if (!importableOriginalSharedStyle) {
      // I give up
      return
    }

    const imported = importableOriginalSharedStyle.import()

    map[key][override.value] = {
      id: override.value,
      name: imported.name,
    }
  }

  symbolInstances.forEach(symbolInstance => {
    const { master } = symbolInstance
    const library = master.getLibrary()
    if (!library || !library.valid) {
      return
    }
    symbolInstance.overrides.forEach(override => {
      if (!override.isDefault) {
        return
      }
      if (override.property === 'layerStyle' && !map.layer[override.value]) {
        findMatchingSharedStyle(library, override, 'layer', 'Layer')
      }
      if (override.property === 'textStyle' && !map.text[override.value]) {
        findMatchingSharedStyle(library, override, 'text', 'Text')
      }
    })
  })
  return {
    text: createLookup(Object.values(map.text)),
    layer: createLookup(Object.values(map.layer)),
  }
}
