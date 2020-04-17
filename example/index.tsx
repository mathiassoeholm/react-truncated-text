import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { loremIpsum } from 'lorem-ipsum';
import { useTruncatedText } from '../.';

const text = loremIpsum({ count: 300 });
console.log('Text length', text.length);

const App = () => {
  // Perhaps useTruncatedText should be a component instead?
  const truncateRef = useTruncatedText(text);

  return (
    <p
      ref={r => (truncateRef.current = r)}
      style={{
        resize: 'both',
        width: 500,
        height: 700,
        overflow: 'hidden',
        background: 'lightgreen',
        padding: 5,
        boxShadow: '0px 0px 10px -1px rgba(0,0,0,0.22)',
      }}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
