import sinon from 'sinon'
import sketch from 'sketch'

import SwitchLibrary from './switch-library'

test('switch library', (context, document) => {
  const doc = document
  const reloadInspectorSpy = sinon.spy()
  doc.sketchObject.reloadInspector = reloadInspectorSpy
  const libraries = sketch.getLibraries().filter(l => l.valid && l.enabled)
  // @TODO library should be from mocks
  const library = libraries[0]
  const originalDocument = JSON.stringify(doc)

  SwitchLibrary(doc, library)

  expect(reloadInspectorSpy.calledOnce).toBe(true)
  // @TODO this should actuall change the document
  expect(originalDocument).toEqual(JSON.stringify(doc))
})
