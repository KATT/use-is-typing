import { useCallback, useEffect, useState, useRef } from 'react';

export interface UseIsTypingProps {
  /**
   * Time in milliseconds before typing indicator gets reset. **Default:** `1000`
   */
  timeout?: number;
}

export type TextElement = HTMLInputElement | HTMLTextAreaElement;

export type RegisterElement = <Element extends TextElement = TextElement>(
  el: Element | null
) => void;

export function useIsTyping({ timeout = 1000 }: UseIsTypingProps = {}): [
  boolean,
  RegisterElement
] {
  const [isTyping, setIsTyping] = useState(false);
  const [currentEl, setCurrentEl] = useState<TextElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  
  const reset = useCallback(() => {
    // Debounce `reset()` based on `timeout`
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsTyping(false)
    }, timeout)
  }, [timeout])

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
    }
  }, [])

  useEffect(() => {
    if (!currentEl) {
      return;
    }
    const eventListener = (e: Event) => {
      const hasValue = (e.target as TextElement).value !== '';

      setIsTyping(hasValue);
      reset();
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
