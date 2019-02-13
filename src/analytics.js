
export default function googleAnalytics(context, category, action, label, value) {
  var trackingID = "UA-128191866-1";
  var uuidKey = "google.analytics.uuid";
  var url = "https://www.google-analytics.com/collect?v=1";
  var uuid = NSUserDefaults.standardUserDefaults().objectForKey(uuidKey);

  if (!uuid) {
    uuid = NSUUID.UUID().UUIDString();
    NSUserDefaults.standardUserDefaults().setObject_forKey(uuid,uuidKey);
  }

  // Tracking ID
  url += "&tid=" + trackingID;
  // Source
  url += "&ds=sketch" + MSApplicationMetadata.metadata().appVersion;
  // Client ID
  url += "&cid=" + uuid;
  // pageview, screenview, event, transaction, item, social, exception, timing
  url += "&t=event";
  // App Name
  url += "&an=" + encodeURI(context.plugin.name());
  // App Version
  url += "&av=" + context.plugin.version();
  // Event category
  url += "&ec=" + encodeURI(category);
  // Event action
  url += "&ea=" + encodeURI(action);
  // Event label
  if (label) {
    url += "&el=" + encodeURI(label);
  }
  // Event value
  if (value) {
    url += "&ev=" + encodeURI(value);
  }

  var session = NSURLSession.sharedSession(),
  task = session.dataTaskWithURL(NSURL.URLWithString(NSString.stringWithString(url)));
  task.resume();
}
