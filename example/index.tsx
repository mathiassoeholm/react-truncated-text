import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { loremIpsum } from 'lorem-ipsum';
import { useTruncatedText } from '../.';

const text = loremIpsum({ count: 50 });

const App = () => {
  const truncateRef = useTruncatedText(text);

  return (
    <div
      ref={r => (truncateRef.current = r)}
      style={{
        resize: 'both',
        width: 100,
        height: 100,
        overflow: 'hidden',
        background: 'lightgreen',
      }}
    >
      {text}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
