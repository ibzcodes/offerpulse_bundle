import { useEffect } from 'react';

export default function NotificationInit() {
  useEffect(() => {
    if (window.OneSignal || window.__ONE_SIGNAL_INITIALIZED__) return;
    window.__ONE_SIGNAL_INITIALIZED__ = true;

    const sdk = document.createElement('script');
    sdk.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
    sdk.async = true;
    document.head.appendChild(sdk);

    sdk.onload = () => {
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      window.OneSignalDeferred.push(async OneSignal => {
        try {
          await OneSignal.init({
            appId: import.meta.env.VITE_ONESIGNAL_APP_ID,
            allowLocalhostAsSecureOrigin: true,
            welcomeNotification: { disable: true }
          });
          if (OneSignal.showSlidedownPrompt) OneSignal.showSlidedownPrompt();
          else if (OneSignal.showNativePrompt) OneSignal.showNativePrompt();
        } catch (e) {
          console.error('OneSignal init error', e);
        }
      });
    };
  }, []);

  return null;
}
