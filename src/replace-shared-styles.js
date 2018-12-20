export default function(libraryStyles, lookup) {
  const map = {}
  libraryStyles.forEach(librarySharedStyle => {
    const currentSharedStyle = lookup[librarySharedStyle.name]
    if (currentSharedStyle) {
      const imported = librarySharedStyle.import()
      // if the shared style is coming from a library, then we just want to:
      // - import the matching style
      // - update all the instances to point to the imported style
      if (currentSharedStyle.getLibrary()) {
        map[currentSharedStyle.id] = imported.id
        currentSharedStyle.getAllInstancesLayers().forEach(l => {
          // eslint-disable-next-line no-param-reassign
          l.sharedStyleId = imported.id
          l.style.syncWithSharedStyle(imported)
        })
      } else {
        currentSharedStyle.style = imported.style
        currentSharedStyle
          .getAllInstances()
          .forEach(s => s.syncWithSharedStyle(currentSharedStyle))
      }
    }
  })
  return map
}
