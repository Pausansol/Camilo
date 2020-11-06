export default function(docData,librarySwatches,docSwatches) {
  docSwatches.forEach(swatch => {
    let importableSwatch = librarySwatches.find(sw => sw.name == swatch.name())
    if (!importableSwatch) {
      return
    } else {
      let newSwatch = importableSwatch.import()
      docData
            .replaceInstancesOfColor_withColor_ignoreAlphaWhenMatching_replaceAlphaOfOriginalColor(
            swatch.makeReferencingColor(),
            newSwatch.referencingColor,
            false,
            false)
    }
  })
}