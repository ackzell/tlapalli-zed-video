import { makeScene2D, Rect, Txt, Layout, Node } from "@motion-canvas/2d";
import {
  all,
  waitFor,
  createRef,
  easeInOutCubic,
  easeOutCubic,
  sequence,
  waitUntil,
  linear,
  slideTransition,
  Direction,
  useDuration,
} from "@motion-canvas/core";
import { BASE } from "../styles/palette";
import { EditorWindow } from "../components/EditorWindow";
import { PillLabel } from "../components/PillLabel";
import { addGroovyBackground } from "../lib/background";
import { floatIt } from "../lib/floatIt";
import { FixedCamera } from "../components/FixedCamera";

const ZED_ACCENT = "#1348DC";

export default makeScene2D(function* (view) {
  addGroovyBackground(view);

  yield* slideTransition(Direction.Bottom, 0.6);

  const vscodeWin = createRef<EditorWindow>();
  const zedWin = createRef<EditorWindow>();
  const vscodeLabel = createRef<PillLabel>();
  const zedLabel = createRef<PillLabel>();
  const zedSpeedBar = createRef<Rect>();
  const vscodeSpeedBar = createRef<Rect>();

  const cameraRef = createRef<FixedCamera>();

  view.add(
    <FixedCamera ref={cameraRef}>
      <Node x={-380}>
        <EditorWindow
          ref={vscodeWin}
          accentColor={BASE.textMid}
          bodyFill={BASE.surface}
          winWidth={400}
          winHeight={260}
          placeholderBaseOpacity={0.24}
          opacity={0}
        />
        <PillLabel ref={vscodeLabel} text="VSCode" accentColor={BASE.text} y={190} opacity={0} />
        <Rect
          offsetX={-1}
          ref={vscodeSpeedBar}
          width={0}
          height={6}
          radius={3}
          fill={BASE.text}
          y={250}
          x={-100}
          opacity={0.5}
        />
      </Node>

      <Node x={380}>
        <EditorWindow
          ref={zedWin}
          accentColor={ZED_ACCENT}
          bodyFill={"#121316"}
          winWidth={400}
          winHeight={260}
          placeholderBaseOpacity={0.24}
          opacity={0}
        />
        <PillLabel ref={zedLabel} text="Zed" accentColor={ZED_ACCENT} y={190} opacity={0} />
        <Rect
          offsetX={-1}
          ref={zedSpeedBar}
          width={0}
          height={6}
          radius={3}
          fill={ZED_ACCENT}
          y={250}
          x={-100}
          opacity={0.5}
        />
      </Node>
    </FixedCamera>,
  );

  yield* waitUntil("show-editors");

  yield floatIt(zedWin());

  // Windows appear
  yield* all(vscodeWin().opacity(1, 0.6, easeOutCubic), zedWin().opacity(1, 0.6, easeOutCubic));

  yield* waitUntil("labels");

  yield* all(vscodeLabel().opacity(1, 0.4), zedLabel().opacity(1, 0.4));

  yield* waitUntil("speed-bars");

  // Speed bars fill — Zed faster
  yield* all(zedSpeedBar().width(200, 0.2, linear), vscodeSpeedBar().width(200, 0.5, linear));

  const zedDuration = useDuration("zed-duration");
  yield* all(
    cameraRef().centerOn(zedWin(), zedDuration, easeOutCubic),
    cameraRef().zoom(2.2, zedDuration, easeOutCubic),
  );

  yield* waitUntil("next-scene");
});
