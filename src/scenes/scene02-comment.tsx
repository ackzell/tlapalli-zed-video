import { makeScene2D, Rect, Txt, Layout } from "@motion-canvas/2d";
import {
  all,
  waitFor,
  createRef,
  easeInOutCubic,
  easeOutCubic,
  easeInCubic,
  loop,
  waitUntil,
  slideTransition,
  Direction,
} from "@motion-canvas/core";
import { BASE, palette } from "../styles/palette";
import { CommentBubble } from "../components/CommentBubble";
import { addGroovyBackground } from "../lib/background";

const ZED_ACCENT = "#1348DC";

export default makeScene2D(function* (view) {
  addGroovyBackground(view);

  yield* slideTransition(Direction.Bottom, 0.6);

  const bubble = createRef<CommentBubble>();
  const cursor = createRef<Rect>();
  const gemDot = createRef<Rect>();

  view.add(
    <>
      <CommentBubble ref={bubble} text="" width={820} opacity={0} />
    </>,
  );

  yield* waitUntil("comment-text-start");

  // Bubble appears
  yield* bubble().opacity(1, 0.5, easeOutCubic);

  // Stream text in
  const text = '"Can\'t wait for a Zed port ;D super cool!"';
  const charDelay = 2 / text.length;

  for (let i = 1; i <= text.length; i++) {
    bubble().text(text.slice(0, i));
    yield* waitFor(charDelay);
  }

  yield* waitUntil("new-scene");
});
