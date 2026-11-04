import { makeScene2D, Rect, Txt, Layout, Line, Node, colorSignal } from "@motion-canvas/2d";
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
  useDuration,
} from "@motion-canvas/core";
import { BASE, palette, GEM_ORDER, GEM_LABELS } from "../styles/palette";
import { addGroovyBackground } from "../lib/background";
import { PillLabel } from "../components/PillLabel";

export default makeScene2D(function* (view) {
  addGroovyBackground(view);

  yield* slideTransition(Direction.Bottom, 0.6);

  const leftFiles = GEM_ORDER.map((gem) => ({
    ref: createRef<Rect>(),
    label: createRef<Txt>(),
    gem,
  }));

  const leftFilesLight = GEM_ORDER.map((gem) => ({
    ref: createRef<Rect>(),
    label: createRef<Txt>(),
    gem,
  }));

  const rightFile = createRef<Rect>();
  const rightLabel = createRef<Txt>();
  const arrow = createRef<Line>();

  const gemColors: Record<string, string> = {
    obsidian: palette.obsidian.dark.fg,
    gold: palette.gold.dark.fg,
    turquoise: palette.turquoise.dark.fg,
    quartz: palette.quartz.dark.fg,
    lapisLazuli: palette.lapisLazuli.dark.fg,
    amethyst: palette.amethyst.dark.fg,
    jade: palette.jade.dark.fg,
    fireOpal: palette.fireOpal.dark.fg,
  };

  const pillLabel = createRef<PillLabel>();

  view.add(
    <>
      <PillLabel
        ref={pillLabel}
        text="Structural"
        opacity={0}
        accentColor={palette.amethyst.dark.fg}
      />
      <Layout
        layout
        direction="column"
        gap={14}
        width={340}
        x={-620}
        alignItems="center"
        justifyContent="center"
      >
        {GEM_ORDER.map((gem, i) => (
          <Layout layout direction="column" alignItems="center" gap={2}>
            <Rect
              ref={leftFiles[i].ref}
              width={60}
              height={52}
              fill={palette[leftFiles[i].gem].dark.bg}
              stroke={BASE.surfaceHi}
              lineWidth={2}
              radius={4}
              opacity={0}
              scale={0}
            >
              <Rect
                width={10}
                height={20}
                fill={gemColors[gem]}
                radius={[2, 0, 0, 2]}
                x={-25}
                y={6}
                opacity={0.5}
              />
              <Line
                points={[
                  [20, -28],
                  [28, -20],
                ]}
                stroke={BASE.text}
                lineWidth={2}
                lineCap="round"
                x={26}
                y={-22}
                opacity={0.3}
              />
            </Rect>
            <Txt
              ref={leftFiles[i].label}
              text={`${gem}-dark.json`}
              fontSize={10}
              fill={BASE.textMid}
              fontFamily={BASE.mono}
              opacity={0}
            />
          </Layout>
        ))}
      </Layout>

      <Layout
        layout
        direction="column"
        gap={14}
        width={340}
        x={-220}
        alignItems="center"
        justifyContent="center"
      >
        {GEM_ORDER.map((gem, i) => (
          <Layout layout direction="column" alignItems="center" gap={2}>
            <Rect
              ref={leftFilesLight[i].ref}
              width={60}
              height={52}
              fill={palette[leftFiles[i].gem].light.bg}
              stroke={BASE.surfaceHi}
              lineWidth={2}
              radius={4}
              opacity={0}
              scale={0}
            >
              <Rect
                width={10}
                height={20}
                fill={gemColors[gem]}
                radius={[2, 0, 0, 2]}
                x={-25}
                y={6}
                opacity={0.5}
              />
              <Line
                points={[
                  [20, -28],
                  [28, -20],
                ]}
                stroke={BASE.text}
                lineWidth={2}
                lineCap="round"
                x={26}
                y={-22}
                opacity={0.3}
              />
            </Rect>
            <Txt
              ref={leftFilesLight[i].label}
              text={`${gem}-light.json`}
              fontSize={10}
              fill={BASE.textMid}
              fontFamily={BASE.mono}
              opacity={0}
            />
          </Layout>
        ))}
      </Layout>

      <Line
        ref={arrow}
        points={[
          [-100, 0],
          [100, 0],
        ]}
        stroke={BASE.textMid}
        lineWidth={3}
        endArrow
        end={0}
        opacity={0}
      />

      <Node x={320}>
        <Rect
          ref={rightFile}
          width={220}
          height={510}
          fill={BASE.bg}
          stroke={palette.obsidian.dark.fg}
          lineWidth={3}
          radius={6}
          opacity={0}
          scale={0}
        >
          <Rect
            width={22}
            height={310}
            fill={palette.obsidian.dark.fg}
            radius={[3, 0, 0, 3]}
            x={-98}
            y={-100}
            opacity={0.5}
          />
          <Txt
            text="tlapalli-theme"
            fontSize={20}
            fill={palette.obsidian.dark.fg}
            fontFamily={BASE.mono}
            y={-18}
          />
          <Txt text=".json" fontSize={20} fill={BASE.text} fontFamily={BASE.mono} y={20} />
        </Rect>
      </Node>
    </>,
  );

  const structuralDuration = useDuration("structural-duration");

  yield* waitUntil("structural");
  yield* pillLabel().opacity(1, 0.4);

  yield* pillLabel().opacity(0, structuralDuration);

  // Files appear with stagger
  yield* waitUntil("show-files");

  yield* sequence(
    0.06,
    ...GEM_ORDER.map((gem, i) =>
      all(
        leftFiles[i].ref().scale(1, 0.3, easeOutCubic),
        leftFiles[i].ref().opacity(1, 0.2),
        leftFiles[i].label().opacity(0.7, 0.2),
      ),
    ),
  );

  yield* sequence(
    0.06,
    ...GEM_ORDER.map((gem, i) =>
      all(
        leftFilesLight[i].ref().scale(1, 0.3, easeOutCubic),
        leftFilesLight[i].ref().opacity(1, 0.2),
        leftFilesLight[i].label().opacity(0.7, 0.2),
      ),
    ),
  );

  yield* waitUntil("arrow");

  // Arrow draws
  yield* arrow().end(1, 0.5, easeOutCubic);
  yield* arrow().opacity(1, 0.3);

  yield* waitUntil("single-file");

  // Single file appears with scale pulse
  yield* rightFile().scale(1, 0.5, easeOutCubic);
  yield* rightFile().opacity(1, 0.4);

  // Dim the 16 files
  yield* all(
    ...GEM_ORDER.map((gem, i) =>
      all(
        leftFiles[i].ref().opacity(0.2, 0.5),
        leftFiles[i].label().opacity(0.2, 0.5),
        leftFilesLight[i].ref().opacity(0.2, 0.5),
        leftFilesLight[i].label().opacity(0.2, 0.5),
      ),
    ),
  );

  yield* waitUntil("next-scene");
});
