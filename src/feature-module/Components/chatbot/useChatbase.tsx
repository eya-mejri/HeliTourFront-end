// hooks/useChatbase.ts
import { useEffect } from 'react';

declare global {
  interface Window {
    chatbase: any;
  }
}

const useChatbase = () => {
  useEffect(() => {
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...args: any[]) => {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(args);
      };
      
      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") {
            return target.q;
          }
          return (...args: any[]) => target(prop, ...args);
        }
      });
    }

    const onLoad = () => {
      const script = document.createElement('script');
      script.src = 'https://www.chatbase.co/embed.min.js';
      script.id = 'A3JKt9ZJ_ZLi8gcNDhYsm';
      script.setAttribute('domain', 'www.chatbase.co');
      document.body.appendChild(script);
    };

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
    }

    return () => {
      // Cleanup if needed
      const script = document.getElementById('A3JKt9ZJ_ZLi8gcNDhYsm');
      if (script) {
        script.remove();
      }
      window.removeEventListener('load', onLoad);
    };
  }, []);
};

export default useChatbase;