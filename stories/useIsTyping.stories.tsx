import React, { useState } from 'react';
import { useIsTyping } from '../src';

export default {
  title: 'Default',
};

export const Input = () => {
  const [isTyping, register] = useIsTyping();
  return (
    <div>
      <input ref={register} placeholder="type something here" />
      <br/>
      Typing? {isTyping ? '✅' : '❌'}
    </div>
  )
};
export const TextArea = () => {
  const [isTyping, register] = useIsTyping();
  return (
    <div>
      <textarea ref={register} placeholder="type something here" />
      <br/>
      Typing? {isTyping ? '✅' : '❌'}
    </div>
  )
};

export const MaterialUI = () => {
  const [isTyping, register] = useIsTyping();
  return (
    <div>
      <textarea ref={register} placeholder="type something here" />
      <br/>
      Typing? {isTyping ? '✅' : '❌'}
    </div>
  )
};

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
