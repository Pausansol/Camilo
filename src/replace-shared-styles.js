export default function(libraryStyles, lookup, foreignLookup) {
  const map = {}
  libraryStyles.forEach(librarySharedStyle => {
    const currentSharedStyle = lookup[librarySharedStyle.name]
    if (currentSharedStyle) {
      const imported = librarySharedStyle.import()
      // if the shared style is coming from a library, then we just want to:
      // - import the matching style
      // - update all the instances to point to the imported style
      // - map the current style to the imported one
      if (currentSharedStyle.getLibrary()) {
        map[currentSharedStyle.id] = imported.id
        currentSharedStyle.getAllInstancesLayers().forEach(l => {
          // eslint-disable-next-line no-param-reassign
          l.sharedStyleId = imported.id
          l.style.syncWithSharedStyle(imported)
        })
      } else {
        // if the shared style is local, then we just want to:
        // - import the matching style to update the local one
        // - update all the instances to point to the imported style
        currentSharedStyle.style = imported.style
        currentSharedStyle
          .getAllInstances()
          .forEach(s => s.syncWithSharedStyle(currentSharedStyle))
      }
    }

    // if we have a shared style from another library, we want to:
    // - import the matching style
    // - map the foreign style to the imported one
    const foreignSharedStyle = foreignLookup[librarySharedStyle.name]
    if (foreignSharedStyle) {
      const imported = librarySharedStyle.import()
      map[foreignSharedStyle.id] = imported.id
    }
  })
  return map
}
