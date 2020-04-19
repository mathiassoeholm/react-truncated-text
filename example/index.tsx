import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { loremIpsum } from 'lorem-ipsum';
import { TruncatedText } from '../.';

const text = loremIpsum({ count: 100 });

const App = () => {
  return (
    <>
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
        The following text is {text.length.toString()} characters long: {text}
      </TruncatedText>
      <TruncatedText<'a'>
        as="a"
        href="http://www.github.com"
        style={{
          display: 'block',
          width: 120,
          height: 120,
          overflow: 'hidden',
          background: 'lightblue',
          padding: 5,
          boxShadow: '0px 0px 10px -1px rgba(0,0,0,0.22)',
        }}
      >
        {'This is an anchor ⚓️ '.repeat(5)}
      </TruncatedText>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
