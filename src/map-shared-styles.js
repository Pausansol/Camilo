function createLookup(styles) {
  return styles.reduce((prev, s) => {
    // eslint-disable-next-line no-param-reassign
    prev[s.name] = s
    return prev
  }, {})
}

export default document => ({
  layer: createLookup(document.getSharedLayerStyles()),
  text: createLookup(document.getSharedTextStyles()),
})
