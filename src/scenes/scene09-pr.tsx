import { makeScene2D, Rect, Txt, Layout, Circle, Path, SVG, Img } from "@motion-canvas/2d";
import {
  all,
  waitFor,
  createRef,
  easeInOutCubic,
  easeOutCubic,
  easeOutBack,
  waitUntil,
  slideTransition,
  Direction,
  sequence,
  easeOutElastic,
} from "@motion-canvas/core";
import { BASE, palette } from "../styles/palette";
import { addGroovyBackground } from "../lib/background";
import { PillLabel } from "../components/PillLabel";
import motionCanvasLogoSvg from "../images/motion-canvas-logo-dark.svg?raw";

import mergedImage from "../images/merged-pr.png";

const ZED_ACCENT = "#1348DC";

const REPOS = [
  {
    label: "tlapalli-vscode-theme",
    color: palette.lapisLazuli.dark.mid,
    labelColor: palette.lapisLazuli.dark.mid,
    x: -465,
    kind: "theme" as const,
  },
  {
    label: "tlapalli-video",
    color: palette.amethyst.dark.fg,
    labelColor: palette.amethyst.dark.mid,
    kind: "video" as const,
    x: 465,
  },
] as const;

const NEW_REPOS = [
  {
    label: "tlapalli-zed-theme",
    color: ZED_ACCENT,
    labelColor: ZED_ACCENT,
    x: -465,
    kind: "theme" as const,
  },
  {
    label: "tlapalli-zed-video",
    color: palette.jade.dark.fg,
    labelColor: palette.jade.dark.mid,
    kind: "video" as const,
    x: 465,
  },
] as const;

const VS_CODE_MARK_OUTER_PATH =
  "M70.8511 99.3171C72.4261 99.9306 74.2221 99.8913 75.8117 99.1264L96.4 89.2197C98.5634 88.1787 99.9392 85.9892 99.9392 83.5871V16.4133C99.9392 14.0112 98.5635 11.8217 96.4001 10.7807L75.8117 0.873695C73.7255 -0.13019 71.2838 0.115699 69.4527 1.44688C69.1912 1.63705 68.942 1.84937 68.7082 2.08335L29.2943 38.0414L12.1264 25.0096C10.5283 23.7964 8.29285 23.8959 6.80855 25.246L1.30225 30.2548C-0.513334 31.9064 -0.515415 34.7627 1.29775 36.4169L16.1863 50L1.29775 63.5832C-0.515415 65.2374 -0.513334 68.0937 1.30225 69.7452L6.80855 74.754C8.29285 76.1042 10.5283 76.2036 12.1264 74.9905L29.2943 61.9586L68.7082 97.9167C69.3317 98.5405 70.0638 99.0104 70.8511 99.3171Z";
const VS_CODE_MARK_INNER_PATH = "M74.9544 27.2989L45.0483 50L74.9544 72.7012V27.2989Z";
const GITHUB_MARK_PATH =
  "M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z";
const VS_CODE_VIEWBOX_SIZE = 100;
const VS_CODE_SCALE = 0.36;
const GITHUB_VIEWBOX_SIZE = 16;
const GITHUB_SCALE = 1.8;

export default makeScene2D(function* (view) {
  addGroovyBackground(view);
  yield* slideTransition(Direction.Bottom, 0.6);

  const card = createRef<Rect>();
  const title = createRef<Txt>();
  const statusPill = createRef<Rect>();
  const statusText = createRef<Txt>();
  const notificationDot = createRef<Circle>();

  const pillLabel = createRef<PillLabel>();

  const boxRefs = REPOS.map(() => createRef<Rect>());
  const newBoxRefs = REPOS.map(() => createRef<Rect>());
  const actionsBadgeRef = createRef<Rect>();
  const actionsLabelRef = createRef<Txt>();
  const actionsIconRef = createRef<Path>();

  const newActionsBadgeRef = createRef<Rect>();
  const newActionsLabelRef = createRef<Txt>();
  const newActionsIconRef = createRef<Path>();

  const mergedPr = createRef<Img>();

  view.add(
    <>
      <PillLabel
        ref={pillLabel}
        text="New repo"
        opacity={0}
        accentColor={palette.amethyst.dark.fg}
      />

      {/* GitHub Actions automation cue */}
      <Rect
        ref={actionsBadgeRef}
        width={290}
        height={74}
        radius={10}
        fill={BASE.surfaceHi}
        stroke={palette.obsidian.dark.mid}
        lineWidth={1}
        y={158}
        opacity={0}
        scale={0.92}
        zIndex={9}
      >
        <Path
          ref={actionsIconRef}
          data={GITHUB_MARK_PATH}
          fill={palette.obsidian.dark.mid}
          lineWidth={0}
          x={-68 - (GITHUB_VIEWBOX_SIZE / 2) * GITHUB_SCALE}
          y={0 - (GITHUB_VIEWBOX_SIZE / 2) * GITHUB_SCALE}
          offset={[0, 0]}
          scale={GITHUB_SCALE}
          opacity={0}
        />
        <Txt
          ref={actionsLabelRef}
          text="GitHub Actions"
          fontSize={20}
          fill={BASE.textMid}
          fontFamily={BASE.font}
          x={16}
          opacity={0}
        />
      </Rect>

      {/* NEW GitHub Actions automation cue */}
      <Rect
        ref={newActionsBadgeRef}
        width={290}
        height={74}
        radius={10}
        fill={BASE.surfaceHi}
        stroke={palette.quartz.dark.mid}
        lineWidth={1}
        y={158}
        opacity={0}
        scale={0.92}
        zIndex={9}
      >
        <Path
          ref={newActionsIconRef}
          data={GITHUB_MARK_PATH}
          fill={palette.quartz.dark.mid}
          lineWidth={0}
          x={-68 - (GITHUB_VIEWBOX_SIZE / 2) * GITHUB_SCALE}
          y={0 - (GITHUB_VIEWBOX_SIZE / 2) * GITHUB_SCALE}
          offset={[0, 0]}
          scale={GITHUB_SCALE}
          opacity={0}
        />
        <Txt
          ref={newActionsLabelRef}
          text="GitHub Actions"
          fontSize={20}
          fill={palette.quartz.dark.fg}
          fontFamily={BASE.font}
          x={16}
          opacity={0}
        />
      </Rect>

      {/* Repo boxes */}
      {REPOS.map((repo, i) => (
        <Rect
          ref={boxRefs[i]}
          width={220}
          height={128}
          radius={8}
          fill={BASE.surface}
          stroke={repo.color}
          lineWidth={1}
          x={repo.x}
          opacity={0}
          scale={0.88}
          zIndex={6}
        >
          {/* Per-repo iconography */}
          {repo.kind === "theme" && (
            <>
              <Rect
                width={54}
                height={54}
                radius={10}
                y={-18}
                fill={BASE.bg}
                stroke={repo.color}
                lineWidth={0}
                opacity={0.85}
              >
                <Path
                  data={VS_CODE_MARK_OUTER_PATH}
                  fill={repo.color}
                  lineWidth={0}
                  x={-(VS_CODE_VIEWBOX_SIZE / 2) * VS_CODE_SCALE}
                  y={-(VS_CODE_VIEWBOX_SIZE / 2) * VS_CODE_SCALE}
                  offset={[0, 0]}
                  scale={VS_CODE_SCALE}
                  opacity={0.85}
                />
                <Path
                  data={VS_CODE_MARK_INNER_PATH}
                  fill={BASE.bg}
                  lineWidth={0}
                  x={-(VS_CODE_VIEWBOX_SIZE / 2) * VS_CODE_SCALE}
                  y={-(VS_CODE_VIEWBOX_SIZE / 2) * VS_CODE_SCALE}
                  offset={[0, 0]}
                  scale={VS_CODE_SCALE}
                  opacity={1}
                />
              </Rect>
            </>
          )}

          {repo.kind === "video" && (
            <Rect
              width={54}
              height={54}
              radius={10}
              y={-18}
              fill={BASE.bg}
              stroke={repo.color}
              lineWidth={0}
              opacity={0.85}
            >
              <SVG svg={motionCanvasLogoSvg} fill={repo.color} />
            </Rect>
          )}

          <Txt
            text={repo.label}
            fontSize={20}
            fill={repo.labelColor}
            fontFamily={BASE.font}
            y={36}
            textAlign="center"
            maxWidth={186}
            textWrap
          />
        </Rect>
      ))}

      {/* Repo boxes */}
      {NEW_REPOS.map((repo, i) => (
        <Rect
          ref={newBoxRefs[i]}
          width={220}
          height={128}
          radius={8}
          fill={BASE.surface}
          stroke={repo.color}
          lineWidth={1}
          x={repo.x}
          opacity={0}
          scale={0.88}
          zIndex={6}
        >
          {/* Per-repo iconography */}
          {repo.kind === "theme" && (
            <>
              <Rect
                width={54}
                height={54}
                radius={10}
                y={-18}
                fill={BASE.bg}
                stroke={repo.color}
                lineWidth={0}
                opacity={0.85}
              >
                <Path
                  data={VS_CODE_MARK_OUTER_PATH}
                  fill={repo.color}
                  lineWidth={0}
                  x={-(VS_CODE_VIEWBOX_SIZE / 2) * VS_CODE_SCALE}
                  y={-(VS_CODE_VIEWBOX_SIZE / 2) * VS_CODE_SCALE}
                  offset={[0, 0]}
                  scale={VS_CODE_SCALE}
                  opacity={0.85}
                />
                <Path
                  data={VS_CODE_MARK_INNER_PATH}
                  fill={BASE.bg}
                  lineWidth={0}
                  x={-(VS_CODE_VIEWBOX_SIZE / 2) * VS_CODE_SCALE}
                  y={-(VS_CODE_VIEWBOX_SIZE / 2) * VS_CODE_SCALE}
                  offset={[0, 0]}
                  scale={VS_CODE_SCALE}
                  opacity={1}
                />
              </Rect>
            </>
          )}

          {repo.kind === "video" && (
            <Rect
              width={54}
              height={54}
              radius={10}
              y={-18}
              fill={BASE.bg}
              stroke={repo.color}
              lineWidth={0}
              opacity={0.85}
            >
              <SVG svg={motionCanvasLogoSvg} fill={repo.color} />
            </Rect>
          )}

          <Txt
            text={repo.label}
            fontSize={20}
            fill={repo.labelColor}
            fontFamily={BASE.font}
            y={36}
            textAlign="center"
            maxWidth={186}
            textWrap
          />
        </Rect>
      ))}

      {/* PR Card */}
      <Rect
        ref={card}
        layout
        direction="column"
        width={500}
        fill={BASE.bg}
        stroke={BASE.surfaceHi}
        lineWidth={2}
        radius={8}
        padding={24}
        gap={16}
        opacity={0}
        scale={0.9}
      >
        <Txt
          ref={title}
          text="Add Tlapalli theme"
          fontSize={24}
          fill={BASE.textMid}
          fontFamily={BASE.mono}
        />
        <Layout layout direction="row" gap={12} alignItems="center">
          <Rect ref={statusPill} padding={[4, 12]} radius={4} fill={BASE.text}>
            <Txt ref={statusText} text="open" fontSize={14} fill={BASE.bg} fontFamily={BASE.mono} />
          </Rect>
          <Txt text="#6536" fontSize={14} fill={BASE.text} fontFamily={BASE.mono} />
        </Layout>
      </Rect>

      {/* Notification dot */}
      <Circle ref={notificationDot} size={12} fill={ZED_ACCENT} y={-60} scale={0} opacity={0} />

      <Img ref={mergedPr} src={mergedImage} opacity={0} scale={0.4} y={230} />
    </>,
  );

  yield* waitUntil("new-repo");
  yield* pillLabel().opacity(1, 0.4);

  yield* waitUntil("new-repo-out");
  yield* pillLabel().opacity(0, 0.2);

  yield* waitUntil("show-repos");
  yield* sequence(
    0.2,
    ...boxRefs.map((ref) =>
      all(ref().opacity(1, 0.35, easeOutCubic), ref().scale(1, 0.5, easeOutElastic)),
    ),
  );

  yield* waitUntil("show-new-repos");
  yield* sequence(
    0.2,
    ...newBoxRefs.map((ref) =>
      all(ref().opacity(1, 0.35, easeOutCubic), ref().scale(1, 0.5, easeOutElastic)),
    ),
    ...newBoxRefs.map((ref) => ref().y(-160, 0.4)),
  );

  yield* waitUntil("github-action");
  yield* all(
    actionsBadgeRef().opacity(1, 0.35, easeOutCubic),
    actionsBadgeRef().scale(1, 0.35, easeOutCubic),
    actionsIconRef().opacity(1, 0.3),
    actionsLabelRef().opacity(1, 0.3),
  );

  yield* waitUntil("new-github-action");
  yield* all(
    newActionsBadgeRef().opacity(1, 0.35, easeOutCubic),
    newActionsBadgeRef().scale(1, 0.35, easeOutCubic),
    newActionsIconRef().opacity(1, 0.3),
    newActionsLabelRef().opacity(1, 0.3),
  );
  yield* newActionsBadgeRef().y(50, 0.3);

  // PR card appears
  yield* waitUntil("show-pr");

  yield* sequence(
    0.12,
    ...[...boxRefs, ...newBoxRefs].map((ref) =>
      all(ref().opacity(0, 0.35, easeOutCubic), ref().scale(0, 0.35, easeOutElastic)),
    ),

    all(
      actionsBadgeRef().opacity(0, 0.35, easeOutCubic),
      actionsBadgeRef().scale(0, 0.35, easeOutCubic),
      actionsIconRef().opacity(0, 0.3),
      actionsLabelRef().opacity(0, 0.3),

      newActionsBadgeRef().opacity(0, 0.35, easeOutCubic),
      newActionsBadgeRef().scale(0, 0.35, easeOutCubic),
      newActionsIconRef().opacity(0, 0.3),
      newActionsLabelRef().opacity(0, 0.3),
    ),
  );

  yield* all(card().opacity(1, 0.5, easeOutCubic), card().scale(1, 0.5, easeOutCubic));

  // Clock / timer waits briefly
  yield* waitFor(1.5);

  // Status flips to merged
  yield* waitUntil("merged");
  yield* all(statusPill().fill("#8957e5", 0.6, easeInOutCubic), statusText().text("merged", 0.6));

  yield* waitUntil("notification");
  yield* all(mergedPr().opacity(1, 0.5, easeInOutCubic), mergedPr().y(210, 0.5, easeInOutCubic));

  // Notification dot appears then fades
  yield* all(notificationDot().scale(1, 0.5, easeOutBack), notificationDot().opacity(1, 0.3));

  yield* notificationDot().opacity(0, 1.5);

  // Silence — hold
  yield* waitUntil("next-scene");
});
