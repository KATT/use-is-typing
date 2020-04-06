import { useCallback, useEffect, useState, useRef } from 'react';

export interface UseIsTypingProps {
  /**
   * Time in milliseconds before typing indicator gets reset. **Default:** `1000`
   */
  timeout?: number;
}

export type TextElement = HTMLInputElement | HTMLTextAreaElement;

export type RegisterElement = <Element extends TextElement = TextElement>(
  el: Element | null,
) => void;

export function useIsTyping({ timeout = 1000 }: UseIsTypingProps = {}): [
  boolean,
  RegisterElement,
] {
  const [isTyping, setIsTyping] = useState(false);
  const [currentEl, setCurrentEl] = useState<TextElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    // Debounce `reset()` based on `timeout`
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, timeout);
  }, [timeout]);

  const register: RegisterElement = useCallback(el => {
    setCurrentEl(el);
    if (!el) {
      setIsTyping(false);
    }
  }, []);

  useEffect(() => {
    // Clear timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setIsTyping(false);
    if (!currentEl) {
      return;
    }

    const keyUpDownListener = (e: Event) => {
      const hasValue = (e.target as TextElement).value !== '';

      setIsTyping(hasValue);
      reset();
    };
    const blurListener = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsTyping(false);
    };

    currentEl.addEventListener('keyup', keyUpDownListener);
    currentEl.addEventListener('keydown', keyUpDownListener);
    currentEl.addEventListener('blur', blurListener);

    return () => {
      currentEl.removeEventListener('keydown', keyUpDownListener);
      currentEl.removeEventListener('keyup', keyUpDownListener);
      currentEl.removeEventListener('blur', blurListener);
    };
  }, [currentEl, reset]);

  return [isTyping, register];
}

export default useIsTyping;
