export default function(libraryStyles, lookup, library) {
  const map = {}
  libraryStyles.forEach(librarySharedStyle => {
    const currentSharedStyle = lookup[librarySharedStyle.name]
    if (currentSharedStyle) {
      const imported = currentSharedStyle.import()
      // if the shared style is coming from a library:
      if (librarySharedStyle.getLibrary()) {
        map[librarySharedStyle.id] = imported.id
        librarySharedStyle.getAllInstancesLayers().forEach(l => {
          // eslint-disable-next-line no-param-reassign
          l.sharedStyleId = imported.id
          l.style.syncWithSharedStyle(imported)
        })
      } else {
        // if the shared style is local:
        librarySharedStyle.style = imported.style
        librarySharedStyle
          .getAllInstances()
          .forEach(s => s.syncWithSharedStyle(librarySharedStyle))
      }
    }
  })
  return map
}