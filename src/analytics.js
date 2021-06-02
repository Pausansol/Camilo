export default function googleAnalytics(
  context,
  category,
  action,
  label,
  value
) {
  const trackingID = 'UA-128191866-1'
  const uuidKey = 'google.analytics.uuid'
  let url = 'https://www.google-analytics.com/collect?v=1'
  let uuid = NSUserDefaults.standardUserDefaults().objectForKey(uuidKey)

  if (!uuid) {
    uuid = NSUUID.UUID().UUIDString()
    NSUserDefaults.standardUserDefaults().setObject_forKey(uuid, uuidKey)
  }

  // Tracking ID
  url += `&tid=${trackingID}`
  // Source
  url += `&ds=sketch${BCSketchInfo.shared().metadata().appVersion}`
  // Client ID
  url += `&cid=${uuid}`
  // pageview, screenview, event, transaction, item, social, exception, timing
  url += '&t=event'
  // App Name
  url += `&an=${encodeURI(context.plugin.name())}`
  // App Version
  url += `&av=${context.plugin.version()}`
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

  const session = NSURLSession.sharedSession();
    const task = session.dataTaskWithURL(
      NSURL.URLWithString(NSString.stringWithString(url))
    )
  task.resume()
}
