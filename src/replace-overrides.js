export default (
  docSymbolInstances,
  { symbolsMap, layerStylesMap, textStylesMap }
) => {
  docSymbolInstances.forEach(symbolInstance => {
    symbolInstance.overrides.forEach(override => {
      if (override.property === 'symbolID' && symbolsMap[override.value]) {
        // eslint-disable-next-line no-param-reassign
        override.value = symbolsMap[override.value]
      }
      if (
        override.property === 'layerStyle' &&
        layerStylesMap[override.value]
      ) {
        // eslint-disable-next-line no-param-reassign
        override.value = layerStylesMap[override.value]
      }
      if (override.property === 'textStyle' && textStylesMap[override.value]) {
        // eslint-disable-next-line no-param-reassign
        override.value = textStylesMap[override.value]
      }
    })
  })
}
