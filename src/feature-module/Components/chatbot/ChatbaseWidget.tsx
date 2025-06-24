// components/ChatbaseWidget.tsx
import { useEffect } from 'react';

interface ChatbaseWidgetProps {
  chatId: string;
}

declare global {
  interface Window {
    chatbase: any;
  }
}

const ChatbaseWidget = ({ chatId }: ChatbaseWidgetProps) => {
  useEffect(() => {
    // Initialize chatbase if not already initialized
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
      script.id = chatId;
      script.setAttribute('domain', 'www.chatbase.co');
      document.body.appendChild(script);
    };

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
    }

    return () => {
      // Cleanup
      const script = document.getElementById(chatId);
      if (script) {
        script.remove();
      }
      window.removeEventListener('load', onLoad);
    };
  }, [chatId]);

  return null; // This component doesn't render anything
};

export default ChatbaseWidget;