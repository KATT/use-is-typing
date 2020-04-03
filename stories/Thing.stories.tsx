import React, { useState } from 'react';
import { useIsTyping } from '../src';

export default {
  title: 'Default',
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const Default = () => {
  const [isTyping, register] = useIsTyping();
  const [isMounted, setIsMounted] = useState(true)
  return (
    <div>
      <label>
        <input type="checkbox" checked={isMounted} onChange={(e) => setIsMounted(e.target.checked)} />
        Is mounted?
      </label>
      <div>
        {isMounted && <input ref={register} placeholder="type something here" />}
        <br/>
        Typing? {isTyping ? '✅' : '❌'}
      </div>
    </div>
  )
};
