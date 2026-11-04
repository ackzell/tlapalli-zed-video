import { makeScene2D, Circle, Rect, Txt, Line, Node } from "@motion-canvas/2d";
import {
  all,
  waitFor,
  createRef,
  easeInOutCubic,
  easeOutCubic,
  sequence,
  waitUntil,
  useRandom,
  slideTransition,
  Direction,
} from "@motion-canvas/core";
import { BASE, palette, GEM_ORDER } from "../styles/palette";
import { addGroovyBackground } from "../lib/background";

export default makeScene2D(function* (view) {
  addGroovyBackground(view);
  yield* slideTransition(Direction.Bottom, 0.6);
  const random = useRandom(42);

  const addedDot = createRef<Circle>();
  const modifiedDot = createRef<Circle>();
  const deletedDot = createRef<Circle>();
  const addedLabel = createRef<Txt>();
  const modifiedLabel = createRef<Txt>();
  const deletedLabel = createRef<Txt>();
  const finalLabel = createRef<Txt>();
  const swatchRefs = GEM_ORDER.map(() => createRef<Rect>());

  // 3 lines per swatch = 24 lines; store flatly with their refs
  const NUM_LINES = GEM_ORDER.length * 3;
  const lineRefs = Array.from({ length: NUM_LINES }, () => createRef<Line>());

  const colors = ["#3d7f3d", "#7f7f3d", "#7f3d3d"];
  const colorLabels = ["added", "modified", "deleted"];
  const neutralColor = "#a7a7a7";

  view.add(
    <>
      {/* Three indicator dots */}
      <Node y={-200}>
        <Node x={-200}>
          <Circle ref={addedDot} size={32} fill={"#3d7f3d"} opacity={0} scale={0} />
          <Txt ref={addedLabel} text="added" fontSize={16} fill={"#3d7f3d"} fontFamily={BASE.mono} y={32} opacity={0} />
        </Node>
        <Node x={0}>
          <Circle ref={modifiedDot} size={32} fill={"#7f7f3d"} opacity={0} scale={0} />
          <Txt ref={modifiedLabel} text="modified" fontSize={16} fill={"#7f7f3d"} fontFamily={BASE.mono} y={32} opacity={0} />
        </Node>
        <Node x={200}>
          <Circle ref={deletedDot} size={32} fill={"#7f3d3d"} opacity={0} scale={0} />
          <Txt ref={deletedLabel} text="deleted" fontSize={16} fill={"#7f3d3d"} fontFamily={BASE.mono} y={32} opacity={0} />
        </Node>
      </Node>

      {/* 8 gem swatches at bottom */}
      {GEM_ORDER.map((gem, i) => {
        const cols = 4;
        const x = (i % cols - (cols - 1) / 2) * 160;
        const y = 100 + Math.floor(i / cols) * 120;
        return (
          <Rect
            ref={swatchRefs[i]}
            width={80}
            height={100}
            fill={palette[gem].dark.bg}
            stroke={palette[gem].dark.fg}
            lineWidth={2}
            radius={6}
            x={x}
            y={y}
            opacity={0}
            scale={0}
          >
            <Txt text={gem} fontSize={12} fill={palette[gem].dark.mid} fontFamily={BASE.mono} y={0} />
          </Rect>
        );
      })}

      {/* Connecting lines — 3 per swatch, 24 total */}
      {GEM_ORDER.map((gem, gi) => {
        const cols = 4;
        const sx = (gi % cols - (cols - 1) / 2) * 160;
        const sy = 100 + Math.floor(gi / cols) * 120;
        return [-200, 0, 200].map((tx, lj) => {
          const idx = gi * 3 + lj;
          const ty = -200;
          const midY = (sy + ty) / 2 + random.nextFloat(-40, 40);
          return (
            <Line
              ref={lineRefs[idx]}
              points={[
                [sx, sy - 50],
                [sx + (tx - sx) * 0.3, midY],
                [tx + (sx - tx) * 0.3, midY],
                [tx, ty + 16],
              ]}
              stroke={
                lj === 0 ? "#3d7f3d" : lj === 1 ? "#7f7f3d" : "#7f3d3d"
              }
              lineWidth={1}
              end={0}
              opacity={0}
              zIndex={-1}
            />
          );
        });
      })}

      {/* Final label */}
      <Txt
        ref={finalLabel}
        text='"One color. Works everywhere."'
        fontSize={28}
        fill={BASE.textMid}
        fontFamily={BASE.mono}
        y={250}
        opacity={0}
      />
    </>,
  );

  // Dots and labels appear
  yield* waitUntil("show-indicators");

  const dots = [
    { dot: addedDot, label: addedLabel },
    { dot: modifiedDot, label: modifiedLabel },
    { dot: deletedDot, label: deletedLabel },
  ];
  yield* sequence(
    0.15,
    ...dots.map((d) =>
      all(
        d.dot().scale(1, 0.4, easeOutCubic),
        d.dot().opacity(1, 0.3),
        d.label().opacity(1, 0.3),
      ),
    ),
  );

  yield* waitUntil("show-swatches");

  yield* sequence(0.06, ...swatchRefs.map((r) =>
    all(
      r().scale(1, 0.3, easeOutCubic),
      r().opacity(1, 0.2),
    ),
  ));

  yield* waitUntil("connect-lines");

  yield* sequence(
    0.04,
    ...lineRefs.map((l) =>
      all(
        l().end(1, 0.3, easeOutCubic),
        l().opacity(0.4, 0.2),
      ),
    ),
  );

  yield* waitUntil("simplify");

  yield* all(...lineRefs.map((l) => l().opacity(0, 0.3)));

  // Dots change to single neutral color
  yield* all(
    addedDot().fill(neutralColor, 0.5, easeInOutCubic),
    modifiedDot().fill(neutralColor, 0.5, easeInOutCubic),
    deletedDot().fill(neutralColor, 0.5, easeInOutCubic),
    addedLabel().fill(neutralColor, 0.5, easeInOutCubic),
    modifiedLabel().fill(neutralColor, 0.5, easeInOutCubic),
    deletedLabel().fill(neutralColor, 0.5, easeInOutCubic),
  );

  yield* waitUntil("one-color");
  yield* finalLabel().opacity(1, 0.5);

  yield* waitUntil("next-scene");
});
