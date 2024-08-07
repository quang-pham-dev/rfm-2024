import { useEffect } from 'react';
import { addEventListener } from '@react-native-community/netinfo';
import isBoolean from 'lodash/isBoolean';

interface UseOnlineManagerProps {
  onConnected?: () => void;
  onDisConnected?: () => void;
}

export function useOnlineManager(callbacks: UseOnlineManagerProps) {
  useEffect(
    function navigateToOfflineScreen() {
      const unsubscribe = addEventListener((state) => {
        if (isBoolean(state.isConnected)) {
          if (state.isConnected) {
            callbacks.onConnected?.();
          } else {
            callbacks.onDisConnected?.();
          }
        }
      });

      return () => {
        unsubscribe();
      };
    },
    [callbacks]
  );
}
