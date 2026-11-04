import { makeScene2D, Txt, Layout, Node } from "@motion-canvas/2d";
import {
  all,
  waitFor,
  createRef,
  easeOutCubic,
  sequence,
  waitUntil,
  slideTransition,
  Direction,
  easeInOutCubic,
  useDuration,
} from "@motion-canvas/core";
import { BASE } from "../styles/palette";
import { TlapalliLogo } from "../components/TlapalliLogo";
import { ZedLogo } from "../components/ZedLogo";
import { PillLabel } from "../components/PillLabel";
import { addGroovyBackground } from "../lib/background";
import { TypewriterText } from "../components/TypewriterText";

const ZED_ACCENT = "#1348DC";

export default makeScene2D(function* (view) {
  addGroovyBackground(view);
  yield* slideTransition(Direction.Bottom, 0.6);

  const logo = createRef<TlapalliLogo>();
  const forTxt = createRef<Txt>();
  const zed = createRef<ZedLogo>();

  const zedPill = createRef<PillLabel>();
  const vscodePill = createRef<PillLabel>();
  const openVsxPill = createRef<PillLabel>();
  const urlRef = createRef<TypewriterText>();

  view.add(
    <>
      {/* Logos at bottom center */}
      <Node y={-130}>
        <TlapalliLogo ref={logo} opacity={0} mode={0} logoSize={400} x={-300} />
        <Txt ref={forTxt} text="for" fontSize={32} fill="#a7a7a7" fontFamily="Prompt" opacity={0} />
        <ZedLogo ref={zed} fillColor="#ffffff" lineWidth={0} logoSize={200} opacity={0} x={300} />
      </Node>

      {/* Three pill buttons */}
      <Layout layout direction="row" gap={90} y={290}>
        <PillLabel
          ref={zedPill}
          text="Zed Extensions"
          accentColor={ZED_ACCENT}
          opacity={0}
          scale={0}
        />
        <PillLabel
          ref={vscodePill}
          text="VSCode Marketplace"
          accentColor={BASE.textMid}
          opacity={0}
          scale={0}
        />
        <PillLabel
          ref={openVsxPill}
          text="Open VSX Registry"
          accentColor={BASE.textMid}
          opacity={0}
          scale={0}
        />
      </Layout>

      <TypewriterText ref={urlRef} fontSize={40} fill={BASE.text} fontFamily={BASE.mono} y={130} />
    </>,
  );

  yield* waitUntil("tlapalli");

  yield* logo().opacity(1, 0.35, easeInOutCubic);

  yield* waitUntil("for");

  yield* forTxt().opacity(1, 0.25);

  yield* waitUntil("zed");
  yield* zed().opacity(1, 0.8, easeOutCubic);

  yield* waitUntil("extension-store");

  yield* all(zedPill().opacity(1, 0.4), zedPill().scale(1, 0.4, easeOutCubic));

  yield* waitUntil("marketplace");
  yield* all(vscodePill().opacity(1, 0.4), vscodePill().scale(1, 0.4, easeOutCubic));

  yield* waitUntil("registry");
  yield* all(openVsxPill().opacity(1, 0.4), openVsxPill().scale(1, 0.4, easeOutCubic));

  yield* waitUntil("show-url");

  const urlDuration = useDuration("urlDuration");
  yield* urlRef().type("tlapalli.ackzell.dev", urlDuration);

  yield* waitUntil("fade");

  yield* sequence(
    0.2,
    zedPill().opacity(0, 0.8),
    vscodePill().opacity(0, 0.8),
    openVsxPill().opacity(0, 0.8),
    urlRef().opacity(0, 0.8),
    zed().opacity(0, 1.0),
    logo().opacity(0, 1.5),
    forTxt().opacity(0, 1.3),
  );
});
