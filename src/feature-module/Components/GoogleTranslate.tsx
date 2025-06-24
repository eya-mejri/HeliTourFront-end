import { useEffect } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
  }
}

const GoogleTranslate = () => {
  useEffect(() => {
    if (document.getElementById('google-translate-script')) return;

    // Set up global init function
    window.googleTranslateElementInit = () => {
      try {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,fr,ar',
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
      } catch (e) {
        console.error('Google Translate init failed:', e);
      }
    };

    // Inject script only once
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = () => {
      console.error('Google Translate script failed to load.');
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div id="google_translate_element" />
  );
};

export default GoogleTranslate;
