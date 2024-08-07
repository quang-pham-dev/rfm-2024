import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

type UseWaitForNavigation = (navigate: () => void) => () => Promise<void>;

/**
 * Returns a promise that resolves when navigation finishes.
 * Only use when navigating by react-navigation
 */
export function useWaitForNavigation(): UseWaitForNavigation {
  const navigation = useNavigation();
  const resolvePromises = useRef<Array<() => void>>([]);

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      resolvePromises.current.forEach((resolve) => {
        resolve();
      });
      resolvePromises.current = [];
    });

    return () => {
      unsubscribeBlur();
    };
  }, [navigation]);

  return (navigate: () => void) => () => {
    navigate();
    return new Promise<void>((resolve) => {
      resolvePromises.current.push(resolve);
    });
  };
}
