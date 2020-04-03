import { useCallback, useEffect, useState } from 'react';

export interface UseIsTypingProps {
  /**
   * Time in milliseconds before typing indicator gets reset. **Default:** `1000`
   */
  timeout?: number;
}

export type FieldElement = HTMLInputElement | HTMLTextAreaElement;

export type RegisterElement = <Element extends FieldElement = FieldElement>(
  el: Element | null
) => void;

export function useIsTyping({ timeout = 1000 }: UseIsTypingProps = {}): [
  boolean,
  RegisterElement
] {
  const [isTyping, setIsTyping] = useState(false);
  const [currentEl, setCurrentEl] = useState<FieldElement | null>(null);
  const [nonce, setNonce] = useState(0);

  const register: RegisterElement = useCallback(el => {
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
      setIsTyping(false);
    }, timeout);

    return () => {
      clearTimeout(t);
    };
  }, [nonce, isTyping, timeout]);

  useEffect(() => {
    if (!currentEl) {
      return;
    }
    const eventListener = (e: Event) => {
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
