import { useRef, useLayoutEffect } from 'react';

function useTruncatedText(text: string) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) {
      throw new Error('Remember to set the ref returned by useTruncateText');
    }

    function truncate() {
      if (!ref.current) {
        return;
      }

      const {
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
      } = getComputedStyle(ref.current);

      ref.current.innerText = text;
      const targetHeight =
        ref.current.clientHeight -
        parseFloat(paddingTop) -
        parseFloat(paddingBottom);

      const targetWidth =
        ref.current.clientWidth -
        parseFloat(paddingLeft) -
        parseFloat(paddingRight);

      const words = text.split(' ');
      ref.current.innerText = '';

      const measureElem = document.createElement('div');
      measureElem.style.position = 'absolute';
      measureElem.style.visibility = 'hidden';
      measureElem.style.maxWidth = `${targetWidth}px`;

      ref.current.appendChild(measureElem);

      console.log(measureElem);

      let upperLimit = words.length - 1;
      let lowerLimit = 0;
      while (true) {
        const nextTry = Math.floor(lowerLimit + (upperLimit - lowerLimit) / 2);

        measureElem.textContent = words.slice(0, nextTry + 1).join(' ') + '...';

        if (measureElem.clientHeight <= targetHeight) {
          measureElem.textContent =
            words.slice(0, nextTry + 2).join(' ') + '...';

          if (measureElem.clientHeight > targetHeight) {
            measureElem.textContent =
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
          measureElem.textContent = text;
          break;
        }
      }
      const finalText = measureElem.textContent;

      console.log('finalText', finalText);

      ref.current.removeChild(measureElem);
      ref.current.textContent = finalText;
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
