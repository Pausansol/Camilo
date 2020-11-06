export function createLookupName(swatches) {
  return swatches.reduce((prev, s) => {
    // eslint-disable-next-line no-param-reassign
    prev[s.name()] = s
    return prev
  }, {})
}

export default function(nativeLibrary) {
	let lookups = {
  	libraryColorVariables: createLookupName(nativeLibrary.allSwatches())
	}
  return lookups
}