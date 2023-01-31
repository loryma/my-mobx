import { Reaction } from './Reaction';

export function autorun(callback) {
  const reaction = new Reaction(callback);
  reaction.track(callback);
  return reaction.getDispose();
}