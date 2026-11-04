import { makeScene2D, Rect, Txt, Node } from "@motion-canvas/2d";
import {
  all,
  waitFor,
  createRef,
  easeInOutCubic,
  easeOutCubic,
  waitUntil,
  slideTransition,
  Direction,
  easeInSine,
} from "@motion-canvas/core";
import { BASE, palette } from "../styles/palette";
import { CommentBubble } from "../components/CommentBubble";
import { PillLabel } from "../components/PillLabel";
import { addGroovyBackground } from "../lib/background";

const ZED_ACCENT = "#1348DC";

export default makeScene2D(function* (view) {
  addGroovyBackground(view);
  yield* slideTransition(Direction.Bottom, 0.6);

  const bubble = createRef<CommentBubble>();
  const label = createRef<PillLabel>();

  view.add(
    <>
      <CommentBubble ref={bubble} text="" width={820} opacity={0} />
      <PillLabel ref={label} text="Zed is fast! ♥️" accentColor={ZED_ACCENT} y={440} opacity={0} />
    </>,
  );

  // Comment bubble reappears
  yield* waitUntil("show-bubble");
  yield* bubble().opacity(1, 0.5, easeOutCubic);
  // Stream text in
  const text = '"Can\'t wait for a Zed port ;D super cool!"';
  const charDelay = 2 / text.length;

  for (let i = 1; i <= text.length; i++) {
    bubble().text(text.slice(0, i));
    yield* waitFor(charDelay);
  }

  yield* waitUntil("hide-bubble");
  yield* bubble().opacity(0, 0.4, easeInSine);

  yield* waitUntil("label");

  // Label fades in
  yield* label().opacity(1, 0.5);

  // Hold
  yield* waitUntil("next-scene");
});
