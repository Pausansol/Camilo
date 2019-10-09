import sketch from 'sketch'
import mapSharedStyles, { createLookup } from './map-shared-styles'

test('should create lookup object from array', () => {
  const styles = [
    { name: 's1', value: 1 },
    { name: 's2', value: 2 },
    { name: 's3', value: 3 },
  ]
  const lookup = createLookup(styles)
  expect(lookup).toEqual({
    s1: { name: 's1', value: 1 },
    s2: { name: 's2', value: 2 },
    s3: { name: 's3', value: 3 },
  })
})

test('should map shared styles', (context, document) => {
  const [library] = sketch.getLibraries().filter(l => l.valid && l.enabled)
  const sharedStyles = mapSharedStyles(document, library)
  expect(sharedStyles.layer).toBeDefined()
  expect(sharedStyles.text).toBeDefined()
})
