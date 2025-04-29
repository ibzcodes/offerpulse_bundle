(function() {
  if (window.OneSignal) return;
  var script = document.createElement("script");
  script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
  script.async = true;
  document.head.appendChild(script);
})();