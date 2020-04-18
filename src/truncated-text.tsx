import React, { useRef, useLayoutEffect } from 'react';
import { truncate } from './truncate';

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  children: string;
}

export const TruncatedText: React.FC<Props> = ({ children, ...restProps }) => {
  const element = useRef<HTMLElement | null>(null);
  const text = children as string;

  useLayoutEffect(() => {
    console.log('text 1', text);
    // TODO: Make a test for scenario where multiple truncate callbacks gets added. Only latest callback should run!
    document.fonts.ready.then(
      () => element.current && truncate(element.current, text)
    );

    if (ResizeObserver) {
      const observer = new ResizeObserver(() => {
        if (element.current) {
          truncate(element.current, text);
        }
      });

      if (element.current) {
        observer.observe(element.current);
      }

      return () => {
        observer.disconnect();
      };
    } else {
      return undefined;
    }
  }, [text]);

  return (
    <p {...restProps} ref={r => (element.current = r)}>
      {text}
    </p>
  );
};
