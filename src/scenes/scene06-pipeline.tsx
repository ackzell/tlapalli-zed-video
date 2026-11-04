import { makeScene2D, Rect, Txt, Layout } from "@motion-canvas/2d";
import {
  all,
  waitFor,
  createRef,
  easeOutCubic,
  waitUntil,
  slideTransition,
  Direction,
  sequence,
} from "@motion-canvas/core";
import { BASE, palette } from "../styles/palette";
import { PillLabel } from "../components/PillLabel";
import { EditorWindow } from "../components/EditorWindow";
import { addGroovyBackground } from "../lib/background";
import { floatIt } from "../lib/floatIt";
import { Terminal } from "../components/Terminal";

const ZED_ACCENT = "#1348DC";

const COMMANDS = [
  { cmd: "$ npm run zed:generate-theme", label: "generate", delay: 0.3, y: -80 },
  { cmd: "$ npm run zed:install-locally", label: "test locally", delay: 0.3, y: 0 },
  { cmd: "$ npm run zed:update-zed-repo", label: "move to repo", delay: 0.3, y: 80 },
];

const term = createRef<Terminal>();
const TERMINAL_LINES = [
  "$ npm run zed:install-locally",
  "> tlapalli@1.2.0 zed:install-locally",
  "> cp zed-themes/tlapalli.json ~/.config/zed/themes/tlapalli.json",
];

export default makeScene2D(function* (view) {
  addGroovyBackground(view);
  yield* slideTransition(Direction.Bottom, 0.6);

  const termContainers = COMMANDS.map(() => createRef<Layout>());
  const termLabels = COMMANDS.map(() => createRef<PillLabel>());
  const zedWindow = createRef<EditorWindow>();
  const themeNameRef = createRef<Txt>();

  const pillLabel = createRef<PillLabel>();

  view.add(
    <>
      <PillLabel ref={pillLabel} text="Pipeline" opacity={0} accentColor={palette.gold.dark.fg} />

      {COMMANDS.map((cmd, i) => (
        <Layout layout direction="column" y={cmd.y} x={-500}>
          <Layout ref={termContainers[i]} layout direction="column" height={0} clip>
            <Rect
              fill={BASE.bg}
              stroke={BASE.surfaceHi}
              lineWidth={1}
              radius={4}
              padding={[10, 16]}
            >
              <Txt
                text={cmd.cmd}
                fontSize={18}
                fill={palette.obsidian.dark.fg}
                fontFamily={BASE.mono}
              />
            </Rect>
          </Layout>
          <PillLabel
            ref={termLabels[i]}
            text={cmd.label}
            accentColor={ZED_ACCENT}
            x={350}
            y={-60}
            opacity={0}
            scale={0}
          />
        </Layout>
      ))}

      {/* Zed preview window */}
      <EditorWindow
        ref={zedWindow}
        accentColor={ZED_ACCENT}
        bodyFill={"#080808"}
        winWidth={300}
        winHeight={180}
        placeholderBaseOpacity={0.2}
        opacity={0}
        scale={0}
        x={500}
        y={-60}
      >
        <Txt
          ref={themeNameRef}
          text=""
          fontSize={14}
          fill={BASE.textMid}
          fontFamily={BASE.mono}
          x={0}
          y={20}
          opacity={0}
        />
      </EditorWindow>

      <Terminal
        ref={term}
        lines={TERMINAL_LINES}
        accent={palette.obsidian.dark.fg}
        x={-320}
        y={200}
        opacity={0}
      />
    </>,
  );

  yield floatIt(zedWindow());

  yield* waitUntil("pipeline");
  yield* pillLabel().opacity(1, 0.4);

  yield* waitUntil("pipeline-out");
  yield* pillLabel().opacity(0, 0.2);

  // Commands appear one by one
  for (let i = 0; i < COMMANDS.length; i++) {
    yield* waitUntil(`cmd-${i + 1}`);

    yield* termContainers[i]().height("100%", 0.3, easeOutCubic);

    yield* waitFor(COMMANDS[i].delay);

    yield* all(termLabels[i]().opacity(1, 0.3), termLabels[i]().scale(1, 0.3, easeOutCubic));

    // Special beat for install line: show Zed window
    if (i === 1) {
      yield* waitUntil("zed-preview");
      yield* all(
        zedWindow().opacity(1, 0.5, easeOutCubic),
        zedWindow().scale(1.5, 0.5, easeOutCubic),
      );

      themeNameRef().text("Tlapalli");
      yield* themeNameRef().opacity(1, 0.3);
    }
  }

  yield* waitUntil("local-install");

  yield* sequence(
    0.4,
    all(
      termContainers[0]().height(0, 0.3, easeOutCubic),
      termLabels[0]().opacity(0, 0.3),
      termLabels[0]().scale(0, 0.3, easeOutCubic),
    ),
    all(
      termContainers[2]().height(0, 0.3, easeOutCubic),
      termLabels[2]().opacity(0, 0.3),
      termLabels[2]().scale(0, 0.3, easeOutCubic),
    ),
  );

  yield* waitUntil("drop-file");
  yield* sequence(0.2, term().opacity(1, 0.2), term().animate("terminal"));

  yield* sequence(
    0.1,
    sequence(0.1, zedWindow().scale(2.4, 0.2), zedWindow().scale(1.5, 0.2)),
    zedWindow().accentColor(palette.gold.dark.fg, 0.3),
  );

  yield* waitUntil("next-scene");
});
