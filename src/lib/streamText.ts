import { Layout, Txt } from "@motion-canvas/2d";
import { createRef, useRandom, waitFor } from "@motion-canvas/core";

export function* streamText(
  txtRef: ReturnType<typeof createRef<Txt>>,
  containerRef: ReturnType<typeof createRef<Layout>>,
  text: string,
  role: "user" | "assistant",
  random: ReturnType<typeof useRandom>,
  duration: number,
) {
  const charDelay = duration / text.length;
  const jitter = role === "assistant" ? charDelay * 0.3 : 0;

  for (let i = 1; i <= text.length; i++) {
    txtRef().text(text.slice(0, i));
    containerRef().height("100%");
    const delay = charDelay + (jitter > 0 ? random.nextFloat(-jitter, jitter) : 0);
    yield* waitFor(Math.max(0.008, delay));
  }
}
