export default function(libraryStyles, lookup) {
  const map = {}
  libraryStyles.forEach(librarySharedStyle => {
    const currentSharedStyle = lookup[librarySharedStyle.name]
    if (currentSharedStyle) {
      const imported = currentSharedStyle.import()
      // if the shared style is coming from a library, then we just want to:
      // - import the matching style
      // - update all the instances to point to the imported style
      // - map the current style to the imported one
      if (librarySharedStyle.getLibrary()) {
        map[librarySharedStyle.id] = imported.id
        librarySharedStyle.getAllInstancesLayers().forEach(l => {
          // eslint-disable-next-line no-param-reassign
          l.sharedStyleId = imported.id
          l.style.syncWithSharedStyle(imported)
        })
      } else {
        // if the shared style is local, then we just want to:
        // - import the matching style to update the local one
        // - update all the instances to point to the imported style
        // eslint-disable-next-line no-param-reassign
        librarySharedStyle.style = imported.style
        librarySharedStyle
          .getAllInstances()
          .forEach(s => s.syncWithSharedStyle(librarySharedStyle))
      }
    }
  })
  return map
}
