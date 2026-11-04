import { makeScene2D, Img, Rect, Txt, SVG, Node } from "@motion-canvas/2d";
import {
  all,
  waitFor,
  createRef,
  easeInOutCubic,
  easeOutCubic,
  sequence,
  waitUntil,
  slideTransition,
  Direction,
} from "@motion-canvas/core";
import { BASE, palette } from "../styles/palette";
import { PillLabel } from "../components/PillLabel";
import { addGroovyBackground } from "../lib/background";

import obsidianScreenshot from "../images/screenshots/obsidianDark.png";

const DOT_RADIUS = 6;
const ZONES = [
  { label: "tab bar", x: 0, y: -120 },
  { label: "sidebar", x: -240, y: 0 },
  { label: "editor", x: 100, y: 40 },
];

const pillLabel = createRef<PillLabel>();

export default makeScene2D(function* (view) {
  addGroovyBackground(view);
  yield* slideTransition(Direction.Bottom, 0.6);

  const screenshot = createRef<Img>();
  const cursor = createRef<Rect>();
  const readyEnough = createRef<PillLabel>();
  const questionMarks = ZONES.map(() => createRef<Txt>());

  view.add(
    <>
      <PillLabel
        ref={pillLabel}
        text="Uncertainty"
        opacity={0}
        accentColor={palette.fireOpal.dark.fg}
      />

      {/* Zed screenshot with theme applied */}
      <Img
        ref={screenshot}
        src={obsidianScreenshot}
        width={960}
        radius={8}
        stroke={BASE.surfaceHi}
        lineWidth={2}
        opacity={0}
      />

      {/* Hand cursor (simple dot indicator) */}
      <Rect
        ref={cursor}
        width={DOT_RADIUS * 2}
        height={DOT_RADIUS * 2}
        radius={DOT_RADIUS}
        fill={BASE.text}
        opacity={0}
      />

      {/* Question marks near each zone */}
      {ZONES.map((zone, i) => (
        <Txt
          ref={questionMarks[i]}
          text="?"
          fontSize={32}
          fill={palette.obsidian.dark.fg}
          fontFamily={BASE.font}
          x={zone.x + 30}
          y={zone.y - 20}
          opacity={0}
        />
      ))}

      {/* Ready enough label */}
      <PillLabel
        ref={readyEnough}
        text="Ready enough."
        accentColor={BASE.textMid}
        y={450}
        opacity={0}
      />
    </>,
  );

  yield* waitUntil("uncertainty");
  yield* pillLabel().opacity(1, 0.4);

  yield* waitUntil("uncertainty-out");
  yield* pillLabel().opacity(0, 0.2);

  // Screenshot appears
  yield* waitUntil("show-screenshot");
  yield* screenshot().opacity(1, 0.5, easeOutCubic);

  // Cursor appears and starts inspecting zones
  yield* waitUntil("inspect");
  cursor().opacity(1);

  const cursorTargets = [ZONES[0], ZONES[1], ZONES[2]];

  for (let i = 0; i < cursorTargets.length; i++) {
    const zone = cursorTargets[i];
    yield* cursor().position([zone.x, zone.y], 0.6, easeInOutCubic);

    // Question mark appears briefly (first 2 passes)
    if (i < 5) {
      const qIdx = ZONES.indexOf(zone);
      if (qIdx >= 0) {
        yield* questionMarks[qIdx]().opacity(1, 0.15);
        yield* waitFor(0.3);
        yield* questionMarks[qIdx]().opacity(0, 0.3);
      }
    }
  }

  // Cursor settles
  yield* cursor().position([0, 0], 0.5, easeOutCubic);

  yield* waitUntil("fade-screenshot");

  // Cursor fades
  yield* cursor().opacity(0, 0.3);
  // Screenshot fades out
  yield* screenshot().opacity(0, 0.5, easeOutCubic);

  yield* waitUntil("ready-enough");

  // Label appears
  yield* readyEnough().opacity(1, 0.5);

  yield* waitUntil("next-scene");
});
