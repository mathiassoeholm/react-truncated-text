import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { loremIpsum } from 'lorem-ipsum';
import { TruncatedText } from '../.';

const text = loremIpsum({ count: 100 });
console.log('Text length', text.length);

const App = () => {
  return (
    <TruncatedText
      style={{
        resize: 'both',
        width: 100,
        height: 100,
        overflow: 'hidden',
        background: 'lightgreen',
        padding: 5,
        boxShadow: '0px 0px 10px -1px rgba(0,0,0,0.22)',
      }}
    >
      {text}
    </TruncatedText>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
