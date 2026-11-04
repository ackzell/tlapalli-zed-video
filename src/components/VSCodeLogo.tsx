import { Rect, RectProps, Path, initial, signal } from "@motion-canvas/2d";
import { SignalValue, SimpleSignal } from "@motion-canvas/core";

export interface VSCodeLogoProps extends RectProps {
  fillColor?: SignalValue<string>;
  logoSize?: SignalValue<number>;
}

const OUTER_PATH =
  "M70.8511 99.3171C72.4261 99.9306 74.2221 99.8913 75.8117 99.1264L96.4 89.2197C98.5634 88.1787 99.9392 85.9892 99.9392 83.5871V16.4133C99.9392 14.0112 98.5635 11.8217 96.4001 10.7807L75.8117 0.873695C73.7255 -0.13019 71.2838 0.115699 69.4527 1.44688C69.1912 1.63705 68.942 1.84937 68.7082 2.08335L29.2943 38.0414L12.1264 25.0096C10.5283 23.7964 8.29285 23.8959 6.80855 25.246L1.30225 30.2548C-0.513334 31.9064 -0.515415 34.7627 1.29775 36.4169L16.1863 50L1.29775 63.5832C-0.515415 65.2374 -0.513334 68.0937 1.30225 69.7452L6.80855 74.754C8.29285 76.1042 10.5283 76.2036 12.1264 74.9905L29.2943 61.9586L68.7082 97.9167C69.3317 98.5405 70.0638 99.0104 70.8511 99.3171Z";
const INNER_PATH = "M74.9544 27.2989L74.9544 72.7012L45.0483 50Z";
const COMBINED_PATH = OUTER_PATH + " " + INNER_PATH;
const VIEWBOX = 100;

export class VSCodeLogo extends Rect {
  @initial("#007ACC")
  @signal()
  declare public readonly fillColor: SimpleSignal<string, this>;

  @initial(80)
  @signal()
  declare public readonly logoSize: SimpleSignal<number, this>;

  public constructor(props?: VSCodeLogoProps) {
    super(props ?? {});

    const scale = () => this.logoSize() / VIEWBOX;
    this.size(() => [this.logoSize(), this.logoSize()]);

    this.add(
      <Path
        data={COMBINED_PATH}
        fill={() => this.fillColor()}
        lineWidth={0}
        scale={scale}
        x={() => -(VIEWBOX / 2) * scale()}
        y={() => -(VIEWBOX / 2) * scale()}
        offset={[0, 0]}
      />,
    );
  }
}
