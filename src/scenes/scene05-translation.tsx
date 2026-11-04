import { makeScene2D, Rect, Txt, Layout, Line, Node, Code } from "@motion-canvas/2d";
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
  easeInSine,
  spawn,
} from "@motion-canvas/core";
import { BASE, palette } from "../styles/palette";
import { addGroovyBackground } from "../lib/background";
import { CodeBlock } from "@motion-canvas/2d/lib/components/CodeBlock";
import { TypewriterText } from "../components/TypewriterText";
import { ZedLogo } from "../components/ZedLogo";
import { VSCodeLogo } from "../components/VSCodeLogo";
import { PillLabel } from "../components/PillLabel";
import { floatIt } from "../lib/floatIt";

const ZED_ACCENT = "#1348DC";

const PAIRS: [string, string, string][] = [
  ["sideBar.background", "panel.background", palette.amethyst.dark.fg],
  ["editorWidget.background", "elevated_surface.background", palette.lapisLazuli.dark.mid],
  ["tab.activeBackground", "tab.active_background", palette.turquoise.dark.fg],
  ["editor.background", "editor.background", palette.quartz.dark.fg],
];

export default makeScene2D(function* (view) {
  addGroovyBackground(view);
  yield* slideTransition(Direction.Bottom, 0.6);

  const vscodeBlock = createRef<Rect>();
  const zedBlock = createRef<Rect>();
  const arrow = createRef<Line>();

  const vscodeEntries = PAIRS.map(() => createRef<Txt>());
  const zedEntries = PAIRS.map(() => createRef<Txt>());
  const highlightDots = PAIRS.map(() => createRef<Rect>());

  const vscodeKeys = [
    {
      ref: createRef<TypewriterText>(),
      cue: "sidebar.background",
      duration: "sidebar.backgroundDuration",
      text: "sidebar.background",
      color: palette.obsidian.dark.fg,
    },
    {
      ref: createRef<TypewriterText>(),
      cue: "editorWidget.background",
      duration: "editorWidget.backgroundDuration",
      text: "editorWidget.background",
      color: palette.obsidian.dark.fg,
    },
    {
      ref: createRef<TypewriterText>(),
      cue: "tab.activeBackground",
      duration: "tab.activeBackgroundDuration",
      text: "tab.activeBackground",
      color: palette.obsidian.dark.fg,
    },
  ];

  const zedKeys = [
    {
      ref: createRef<TypewriterText>(),
      cue: "panel.background",
      duration: "panel.backgroundDuration",
      text: "panel.background",
      color: palette.lapisLazuli.dark.fg,
    },
    {
      ref: createRef<TypewriterText>(),
      cue: "elevated_surface.background",
      duration: "elevated_surface.backgroundDuration",
      text: "elevated_surface.background",
      color: palette.lapisLazuli.dark.fg,
    },
    {
      ref: createRef<TypewriterText>(),
      cue: "tab.active_background",
      duration: "tab.active_backgroundDuration",
      text: "tab.active_background",
      color: palette.lapisLazuli.dark.fg,
    },
  ];

  const zed = createRef<ZedLogo>();
  const vscode = createRef<VSCodeLogo>();

  const pillLabel = createRef<PillLabel>();

  view.add(
    <>
      <PillLabel ref={pillLabel} text="Keys" opacity={0} accentColor={palette.jade.dark.fg} />

      <VSCodeLogo ref={vscode} lineWidth={1} logoSize={100} opacity={0} x={-500} />
      <ZedLogo ref={zed} fillColor="#ffffff" lineWidth={0} logoSize={100} opacity={0} x={500} />

      {vscodeKeys.map((key, i) => {
        return (
          <TypewriterText
            fontSize={30}
            ref={key.ref}
            text=""
            y={(i - 1) * 100}
            x={-500}
            fill={key.color}
          />
        );
      })}

      {zedKeys.map((key, i) => {
        return (
          <TypewriterText fontSize={30} ref={key.ref} y={(i - 1) * 100} x={500} fill={key.color} />
        );
      })}

      {/* VSCode block */}
      <Rect
        ref={vscodeBlock}
        layout
        direction="column"
        width={360}
        fill={BASE.bg}
        stroke={BASE.surfaceHi}
        lineWidth={2}
        radius={6}
        x={-500}
        opacity={0}
        clip
      >
        <Rect width={360} height={28} fill={BASE.border} padding={[0, 14]} alignItems="center">
          <Txt
            text="VSCode — settings.json"
            fontSize={12}
            fill={BASE.text}
            fontFamily={BASE.mono}
          />
        </Rect>
        <Layout layout direction="column" gap={6} padding={16}>
          <Txt text="{" fontSize={13} fill={BASE.textMid} fontFamily={BASE.mono} />
          {PAIRS.map(([key], i) => (
            <Txt
              ref={vscodeEntries[i]}
              text={`  "${key}": "#...",`}
              fontSize={12}
              fill={BASE.text}
              fontFamily={BASE.mono}
              opacity={0}
            />
          ))}
          <Txt text="}" fontSize={13} fill={BASE.textMid} fontFamily={BASE.mono} />
        </Layout>
      </Rect>
      {/* Arrow */}
      <Line
        ref={arrow}
        points={[
          [-80, 0],
          [80, 0],
        ]}
        stroke={BASE.textMid}
        lineWidth={2}
        endArrow
        lineDash={[8, 8]}
        end={0}
        opacity={0}
      />
      {/* Zed block */}
      <Rect
        ref={zedBlock}
        layout
        direction="column"
        width={360}
        fill={BASE.bg}
        stroke={BASE.surfaceHi}
        lineWidth={2}
        radius={6}
        x={500}
        opacity={0}
        clip
      >
        <Rect width={360} height={28} fill={ZED_ACCENT} padding={[0, 14]} alignItems="center">
          <Txt
            text="Zed — tlapalli.json"
            fontSize={12}
            fill={palette.obsidian.light.bg}
            fontFamily={BASE.mono}
          />
        </Rect>
        <Layout layout direction="column" gap={6} padding={16}>
          <Txt text="{" fontSize={13} fill={BASE.textMid} fontFamily={BASE.mono} />
          {PAIRS.map(([, key], i) => (
            <Txt
              ref={zedEntries[i]}
              text={`  "${key}": "#...",`}
              fontSize={12}
              fill={BASE.text}
              fontFamily={BASE.mono}
              opacity={0}
            />
          ))}
          <Txt text="}" fontSize={13} fill={BASE.textMid} fontFamily={BASE.mono} />
        </Layout>
      </Rect>
      {/* Highlight dots between panels */}
      {PAIRS.map(([, , color], i) => (
        <Rect
          ref={highlightDots[i]}
          width={8}
          height={8}
          radius={4}
          fill={color}
          y={(i - (PAIRS.length - 1) / 2) * 30 - 24}
          scale={0}
          opacity={0}
        />
      ))}
    </>,
  );

  yield* waitUntil("keys");
  yield* pillLabel().opacity(1, 0.4);

  yield* waitUntil("keys-out");
  yield* pillLabel().opacity(0, 0.2);

  yield* waitUntil("vscode");

  yield* all(vscode().logoSize(350, 0.5, easeInSine), vscode().opacity(1, 0.5, easeInSine));

  yield* waitUntil("fade-vscode");
  yield* vscode().opacity(0.05, 0.5);

  for (const key of vscodeKeys) {
    yield* waitUntil(key.cue);
    yield* key.ref().type(key.text, useDuration(key.duration));
  }

  yield* waitUntil("zed");

  yield* all(zed().logoSize(350, 0.5, easeInSine), zed().opacity(1, 0.5, easeInSine));

  yield* waitUntil("fade-zed");
  yield* zed().opacity(0.05, 0.5);

  for (const key of zedKeys) {
    yield* waitUntil(key.cue);
    yield* key.ref().type(key.text, useDuration(key.duration));
  }

  yield* waitUntil("show-blocks");

  yield* sequence(
    0.3,
    all(
      all(vscode().opacity(0, 0.5), vscode().scale(0, 0.5)),
      sequence(
        0.1,
        ...vscodeKeys.map((key) => all(key.ref().opacity(0, 0.2), key.ref().scale(0, 0.2))),
      ),
      all(zed().opacity(0, 0.5), zed().scale(0, 0.5)),
      sequence(
        0.1,
        ...zedKeys.map((key) => all(key.ref().opacity(0, 0.2), key.ref().scale(0, 0.2))),
      ),
    ),
  );

  // Both blocks fade in
  yield* all(vscodeBlock().opacity(1, 0.5, easeOutCubic), zedBlock().opacity(1, 0.5, easeOutCubic));

  yield floatIt(vscodeBlock(), { phase: 0.3 });
  yield floatIt(zedBlock());

  // Show entries within each block
  yield* all(
    ...vscodeEntries.map((ref) => ref().opacity(1, 0.3)),
    ...zedEntries.map((ref) => ref().opacity(1, 0.3)),
  );

  yield* waitUntil("arrow");

  // Arrow draws
  yield* all(arrow().end(1, 0.6, easeOutCubic), arrow().opacity(1, 0.4));

  yield* waitUntil("arrow-leave");

  // Arrow leaves
  yield* all(arrow().start(1, 0.6, easeOutCubic), arrow().opacity(0, 0.4));

  // Highlight key pairs sequentially
  for (let i = 0; i < PAIRS.length; i++) {
    yield* waitUntil(`pair-${i + 1}`);
    yield* all(
      vscodeEntries[i]().fill(PAIRS[i][2], 0.4, easeInOutCubic),
      zedEntries[i]().fill(PAIRS[i][2], 0.4, easeInOutCubic),
      highlightDots[i]().scale(3, 0.4, easeOutCubic),
      highlightDots[i]().opacity(1, 0.3),
    );
  }

  yield* waitUntil("next-scene");
});
