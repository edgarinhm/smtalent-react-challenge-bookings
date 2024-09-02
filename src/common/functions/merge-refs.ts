import { MutableRefObject, RefCallback, ForwardedRef } from 'react';

export const mergeRefs = <T>(
  ...refs: (MutableRefObject<T> | RefCallback<T> | ForwardedRef<T>)[]
): RefCallback<T> => {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref !== null && ref !== undefined) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    }
  };
};
