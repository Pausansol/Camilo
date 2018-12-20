/* globals NSUUID, __command, NSURLSession, NSURL, NSString, NSUserDefaults */

import { version, Settings } from 'sketch'

const trackingID = 'UA-128191866-1'
const uuidKey = 'google.analytics.uuid'
const baseURL = 'https://www.google-analytics.com/collect?v=1'
let uuid
try {
  uuid = Settings.globalSettingForKey(uuidKey)
} catch (err) {
  // this shouldn't be needed if we'd use Settings from the beginning
  const value = NSUserDefaults.standardUserDefaults().objectForKey(uuidKey)
  if (typeof value === 'string') {
    uuid = value
  } else {
    uuid = NSUUID.UUID().UUIDString()
  }
  Settings.setGlobalSettingForKey(uuid, uuidKey)
}

if (!uuid) {
  uuid = NSUUID.UUID().UUIDString()
  Settings.setGlobalSettingForKey(uuid, uuidKey)
}

export default function googleAnalytics(category, action, label, value) {
  let url = baseURL
  // Tracking ID
  url += `&tid=${trackingID}`
  // Source
  url += `&ds=sketch${version.sketch}`
  // Client ID
  url += `&cid=${uuid}`
  // pageview, screenview, event, transaction, item, social, exception, timing
  url += '&t=event'
  // App Name
  url += `&an=${encodeURI(__command.pluginBundle().name())}`
  // App Version
  url += `&av=${__command.pluginBundle().version()}`
  // Event category
  url += `&ec=${encodeURI(category)}`
  // Event action
  url += `&ea=${encodeURI(action)}`
  // Event label
  if (label) {
    url += `&el=${encodeURI(label)}`
  }
  // Event value
  if (value) {
    url += `&ev=${encodeURI(value)}`
  }

  const session = NSURLSession.sharedSession()
  const task = session.dataTaskWithURL(
    NSURL.URLWithString(NSString.stringWithString(url))
  )
  task.resume()
}
