import { useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';

export function useAutoScroll() {
  const scrollRef = useRef<KeyboardAwareScrollView>();
  const yCoordinates = useRef<
    Record<string, { y: number; index: number } | undefined>
  >({});

  const setScrollRef = (ref: KeyboardAwareScrollView | null) => {
    if (ref) {
      scrollRef.current = ref;
    }
  };

  const scrollTo = (errors: string[]) => {
    if (scrollRef && errors.length > 0) {
      const yPositions: { y: number; index: number }[] = [];

      errors.forEach((x) => {
        const coord = yCoordinates.current[x];

        if (coord) {
          yPositions.push(coord);
        }
      });

      const yPosition = yPositions.sort((a, b) => a.index - b.index)?.[0]?.y;

      if (_.isNumber(yPosition)) {
        scrollRef.current?.scrollToPosition(0, yPosition, true);
      }
    }
  };

  const setYCoordinate = (name: string, yPos: number, index: number) => {
    yCoordinates.current[name] = {
      y: yPos,
      index,
    };
  };

  return { setScrollRef, scrollTo, setYCoordinate };
}
