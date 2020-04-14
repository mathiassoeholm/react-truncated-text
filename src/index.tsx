import { useRef, useLayoutEffect } from 'react';

function useTruncatedText(text: string) {
  const ref = useRef<HTMLElement | null>(null);

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
      const words = text.split(' ');

      let i = 0;
      let upperLimit = words.length - 1;
      let lowerLimit = 0;
      while (true) {
        const nextTry = Math.floor(lowerLimit + (upperLimit - lowerLimit) / 2);

        ref.current.textContent = words.slice(0, nextTry + 1).join(' ') + '...';

        if (ref.current.scrollHeight <= targetHeight) {
          ref.current.textContent =
            words.slice(0, nextTry + 2).join(' ') + '...';

          if (ref.current.scrollHeight > targetHeight) {
            // FOUND THE INDEX
            ref.current.textContent =
              words.slice(0, nextTry + 1).join(' ') + '...';
            break;
          } else {
            lowerLimit = Math.max(nextTry, lowerLimit + 1);
          }
        } else {
          upperLimit = Math.min(nextTry, upperLimit - 1);
        }

        if (lowerLimit === upperLimit) {
          // The text fits
          console.log('It fits');
          ref.current.innerText = text;
          break;
        }

        i++;
      }
      console.log(i);
    }

    document.fonts.ready.then(truncate);

    if (ResizeObserver) {
      const observer = new ResizeObserver(() => {
        truncate();
        console.log('REsize');
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
