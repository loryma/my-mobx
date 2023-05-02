import { useRef, useLayoutEffect } from 'react';
import { useForceUpdate } from "./utils";
import { Reaction } from './Reaction';

export function observer(Component) {
  return (props) => {
    const reactionTrackingRef = useRef(null);
    const forceUpdate = useForceUpdate();
  
    if (!reactionTrackingRef.current) {
      reactionTrackingRef.current = new Reaction(forceUpdate);
    }
  
    useLayoutEffect(() => () => reactionTrackingRef.current.dispose(), []);
  
    let rendering;
    reactionTrackingRef.current.track(() => {
      rendering = Component(props);
    });
  
    return rendering;
  };
}