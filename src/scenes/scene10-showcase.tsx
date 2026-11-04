import { makeScene2D, Img, Node, Txt } from "@motion-canvas/2d";
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
} from "@motion-canvas/core";
import { BASE, GEM_ORDER, GEM_LABELS } from "../styles/palette";
import { GemSwatch } from "../components/GemSwatch";
import { TlapalliLogo } from "../components/TlapalliLogo";
import { ZedLogo } from "../components/ZedLogo";
import { addGroovyBackground } from "../lib/background";

import obsidianDarkScreenshot from "../images/screenshots/obsidianDark.png";
import goldDarkScreenshot from "../images/screenshots/goldDark.png";
import turquoiseDarkScreenshot from "../images/screenshots/turquoiseDark.png";
import quartzDarkScreenshot from "../images/screenshots/quartzDark.png";
import lapisLazuliDarkScreenshot from "../images/screenshots/lapisLazuliDark.png";
import amethystDarkScreenshot from "../images/screenshots/amethystDark.png";
import jadeDarkScreenshot from "../images/screenshots/jadeDark.png";
import fireOpalDarkScreenshot from "../images/screenshots/fireOpalDark.png";

import obsidianLightScreenshot from "../images/screenshots/obsidianLight.png";
import goldLightScreenshot from "../images/screenshots/goldLight.png";
import turquoiseLightScreenshot from "../images/screenshots/turquoiseLight.png";
import quartzLightScreenshot from "../images/screenshots/quartzLight.png";
import lapisLazuliLightScreenshot from "../images/screenshots/lapisLazuliLight.png";
import amethystLightScreenshot from "../images/screenshots/amethystLight.png";
import jadeLightScreenshot from "../images/screenshots/jadeLight.png";
import fireOpalLightScreenshot from "../images/screenshots/fireOpalLight.png";

const ZED_ACCENT = "#1348DC";

const DARK_SCREENSHOT_MAP: Record<string, string> = {
  obsidian: obsidianDarkScreenshot,
  gold: goldDarkScreenshot,
  turquoise: turquoiseDarkScreenshot,
  quartz: quartzDarkScreenshot,
  lapisLazuli: lapisLazuliDarkScreenshot,
  amethyst: amethystDarkScreenshot,
  jade: jadeDarkScreenshot,
  fireOpal: fireOpalDarkScreenshot,
};

const LIGHT_SCREENSHOT_MAP: Record<string, string> = {
  obsidian: obsidianLightScreenshot,
  gold: goldLightScreenshot,
  turquoise: turquoiseLightScreenshot,
  quartz: quartzLightScreenshot,
  lapisLazuli: lapisLazuliLightScreenshot,
  amethyst: amethystLightScreenshot,
  jade: jadeLightScreenshot,
  fireOpal: fireOpalLightScreenshot,
};

const COLS = 4;

export default makeScene2D(function* (view) {
  addGroovyBackground(view);
  yield* slideTransition(Direction.Bottom, 0.6);

  const swatchRefs = GEM_ORDER.map(() => createRef<GemSwatch>());
  const darkThumbRefs = GEM_ORDER.map(() => createRef<Img>());
  const lightThumbRefs = GEM_ORDER.map(() => createRef<Img>());

  view.add(
    <>
      <Node scale={1.2}>
        {GEM_ORDER.map((gem, i) => {
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          const x = (col - (COLS - 1) / 2) * 260;
          const y = (row - 0.5) * 280 - 30;
          return (
            <Node key={gem}>
              <GemSwatch
                ref={swatchRefs[i]}
                gem={gem}
                mode={0}
                labelOpacity={1}
                gemName={GEM_LABELS[gem]}
                opacity={0}
                scale={0}
                x={x}
                y={y - 30}
              />
              <Img
                ref={darkThumbRefs[i]}
                src={DARK_SCREENSHOT_MAP[gem]}
                width={220}
                radius={4}
                opacity={0}
                x={x}
                y={y + 100}
              />
              <Img
                ref={lightThumbRefs[i]}
                src={LIGHT_SCREENSHOT_MAP[gem]}
                width={220}
                radius={4}
                alpha={0}
                x={x}
                y={y + 100}
              />
            </Node>
          );
        })}
      </Node>
    </>,
  );

  yield* waitUntil("show-swatches");

  yield* sequence(
    0.1,
    ...GEM_ORDER.map((gem, i) =>
      all(swatchRefs[i]().scale(1, 0.5, easeOutCubic), swatchRefs[i]().opacity(1, 0.3)),
    ),
  );

  yield* waitUntil("show-thumbnails");

  yield* sequence(0.1, ...GEM_ORDER.map((gem, i) => darkThumbRefs[i]().opacity(1, 0.4)));

  yield* waitUntil("light-mode");

  yield* all(
    ...GEM_ORDER.map((gem, i) =>
      all(
        swatchRefs[i]().mode(1, 0.7, easeInOutCubic),
        darkThumbRefs[i]().alpha(0, 0.7, easeInOutCubic),
        lightThumbRefs[i]().alpha(1, 0.7, easeInOutCubic),
      ),
    ),
  );

  yield* waitUntil("dark-mode");

  yield* all(
    ...GEM_ORDER.map((gem, i) =>
      all(
        swatchRefs[i]().mode(0, 0.7, easeInOutCubic),
        darkThumbRefs[i]().alpha(1, 0.7, easeInOutCubic),
        lightThumbRefs[i]().alpha(0, 0.7, easeInOutCubic),
      ),
    ),
  );

  yield* waitUntil("next-scene");
});
