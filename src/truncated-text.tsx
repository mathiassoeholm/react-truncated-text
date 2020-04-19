import { useRef, useLayoutEffect } from 'react';
import * as React from 'react';
import { truncate } from './truncate';

type Props<T extends keyof JSX.IntrinsicElements> = {
  children: string | string[];
  as?: string;
} & JSX.IntrinsicElements[T];

export function TruncatedText<T extends keyof JSX.IntrinsicElements = 'p'>(
  props: Props<T>
) {
  const { children, as = 'p', ...restProps } = props;

  const element = useRef<HTMLElement | null>(null);
  const text = Array.isArray(children) ? children.join('') : children;

  useLayoutEffect(() => {
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

  const ref: React.ClassAttributes<HTMLElement>['ref'] = r =>
    (element.current = r);

  return React.createElement(as, {
    ...restProps,
    children: text,
    ref,
  });
}
