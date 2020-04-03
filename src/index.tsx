import { useCallback, useEffect, useState } from 'react';

export interface UseIsTypingProps {
  timeout?: number;
}

export type FieldElement = HTMLInputElement | HTMLTextAreaElement;

export type Register = <Element extends FieldElement = FieldElement>(
  el: Element | null
) => void;

export function useIsTyping({ timeout = 1000 }: UseIsTypingProps = {}): [
  boolean,
  Register
] {
  const [isTyping, setIsTyping] = useState(false);
  const [currentEl, setCurrentEl] = useState<FieldElement | null>(null);
  const [nonce, setNonce] = useState(0);

  const register: Register = useCallback(el => {
    // console.log('register', el)
    setCurrentEl(el);
    if (!el) {
      setIsTyping(false);
    }
  }, []);

  useEffect(() => {
    if (!isTyping) {
      return;
    }
    const t = setTimeout(() => {
      // console.log('not typing')
      setIsTyping(false);
    }, timeout);

    return () => {
      // console.log('clearing timeout')
      clearTimeout(t);
    };
  }, [nonce, isTyping, timeout]);

  useEffect(() => {
    if (!currentEl) {
      return;
    }
    // console.log('new el')
    const eventListener = (e: Event) => {
      // console.log('event fired', e);
      const hasValue = (e.target as FieldElement).value !== '';

      setIsTyping(hasValue);
      setNonce(Math.random());
    };
    currentEl.addEventListener('keyup', eventListener);
    currentEl.addEventListener('keydown', eventListener);
    return () => {
      currentEl.removeEventListener('keydown', eventListener);
      currentEl.removeEventListener('keyup', eventListener);
    };
  }, [currentEl]);

  return [isTyping, register];
}

export default useIsTyping;
