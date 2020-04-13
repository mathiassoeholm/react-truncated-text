import { useRef, useLayoutEffect } from 'react';

function useTruncatedText(text: string) {
  const ref = useRef<HTMLElement>();

  useLayoutEffect(() => {
    if (!ref.current) {
      throw new Error('Remember to set the ref returned by useTruncateText');
    }

    // Inspired by '3. Using JavaScript' here:
    // http://hackingui.com/front-end/a-pure-css-solution-for-multiline-text-truncation/
    function truncate() {
      if (!ref.current) {
        return;
      }

      ref.current.innerText = text;
      const targetHeight = Math.max(0, ref.current.offsetHeight);
      const wordArray = text.split(' ');
      while (ref.current.scrollHeight > targetHeight) {
        wordArray.pop();
        ref.current.innerHTML = wordArray.join(' ') + '...';
      }
    }

    document.fonts.ready.then(truncate);

    if (ResizeObserver) {
      const observer = new ResizeObserver(() => {
        truncate();
      });

      observer.observe(ref.current);

      return () => {
        observer.disconnect();
      };
    } else {
      return undefined;
    }
  }, [text]);

  return ref;
}

export { useTruncatedText };
