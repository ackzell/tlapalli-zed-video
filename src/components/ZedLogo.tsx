import { Rect, RectProps, Path, initial, signal } from "@motion-canvas/2d";
import { SignalValue, SimpleSignal } from "@motion-canvas/core";

export interface ZedLogoProps extends RectProps {
  accentColor?: SignalValue<string>;
  fillColor?: SignalValue<string>;
  logoSize?: SignalValue<number>;
  lineWidth?: SignalValue<number>;
}

const ZED_PATH =
  "M8.4375 5.625C6.8842 5.625 5.625 6.8842 5.625 8.4375V70.3125H0V8.4375C0 3.7776 3.7776 0 8.4375 0H83.7925C87.551 0 89.4333 4.5442 86.7756 7.20186L40.3642 53.6133H53.4375V47.8125H59.0625V55.0195C59.0625 57.3495 57.1737 59.2383 54.8438 59.2383H34.7392L25.0712 68.9062H68.9062V33.75H74.5312V68.9062C74.5312 72.0128 72.0128 74.5312 68.9062 74.5312H19.4462L9.60248 84.375H81.5625C83.1158 84.375 84.375 83.1158 84.375 81.5625V19.6875H90V81.5625C90 86.2224 86.2224 90 81.5625 90H6.20749C2.44898 90 0.566723 85.4558 3.22438 82.7981L49.46 36.5625H36.5625V42.1875H30.9375V35.1562C30.9375 32.8263 32.8263 30.9375 35.1562 30.9375H55.085L64.9288 21.0938H21.0938V56.25H15.4688V21.0938C15.4688 17.9871 17.9871 15.4688 21.0938 15.4688H70.5538L80.3975 5.625H8.4375Z";

export class ZedLogo extends Rect {
  @initial("#1348DC")
  @signal()
  declare public readonly accentColor: SimpleSignal<string, this>;

  @initial("#00000000")
  @signal()
  declare public readonly fillColor: SimpleSignal<string, this>;

  @initial(80)
  @signal()
  declare public readonly logoSize: SimpleSignal<number, this>;

  @initial(2.5)
  @signal()
  declare public readonly lineWidth: SimpleSignal<number, this>;

  public constructor(props?: ZedLogoProps) {
    super(props ?? {});

    const scale = () => this.logoSize() / 90;

    this.size(() => [this.logoSize(), this.logoSize()]);

    this.add(
      <Path
        data={ZED_PATH}
        fill={() => this.fillColor()}
        stroke={() => this.accentColor()}
        lineWidth={() => this.lineWidth()}
        lineCap="round"
        lineJoin="round"
        scale={scale}
        x={() => -45 * scale()}
        y={() => -45 * scale()}
      />,
    );
  }
}
