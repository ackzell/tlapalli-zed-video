import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  createRef,
  Direction,
  easeInOutCubic,
  easeOutCubic,
  fadeTransition,
  slideTransition,
  waitFor,
} from "@motion-canvas/core";
import { TlapalliLogo } from "../components/TlapalliLogo";
import { ZedLogo } from "../components/ZedLogo";
import { addGroovyBackground } from "../lib/background";

export default makeScene2D(function* (view) {
  addGroovyBackground(view);

  const logo = createRef<TlapalliLogo>();
  const forTxt = createRef<Txt>();
  const zed = createRef<ZedLogo>();

  view.add(
    <>
      <TlapalliLogo ref={logo} opacity={0} mode={0} logoSize={500} x={-450} />
      <Txt ref={forTxt} text="for" fontSize={32} fill="#a7a7a7" fontFamily="Prompt" opacity={0} />
      <ZedLogo ref={zed} fillColor="#ffffff" lineWidth={0} logoSize={200} opacity={0} x={350} />
    </>,
  );

  yield* logo().opacity(1, 0.3, easeInOutCubic);

  yield* waitFor(0.1);

  yield* forTxt().opacity(1, 0.4);

  yield* waitFor(0.2);

  yield* zed().opacity(1, 0.8, easeOutCubic);
});
