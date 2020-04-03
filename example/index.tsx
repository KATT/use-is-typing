import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useIsTyping } from '../.';

const App = () => {
  const [isTyping, register] = useIsTyping();

  return (
    <div>
      <textarea ref={register} />
      <br />
      Typing? {isTyping ? '✅' : '❌'}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
