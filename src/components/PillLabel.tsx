import { Layout, Rect, Txt, Node, NodeProps, initial, signal } from "@motion-canvas/2d";
import { SignalValue, SimpleSignal } from "@motion-canvas/core";
import { BASE } from "../styles/palette";

export interface PillLabelProps extends NodeProps {
  text?: SignalValue<string>;
  accentColor?: SignalValue<string>;
  fontSize?: SignalValue<number>;
}

/**
 * PillLabel — a monospace pill tag used for labels and callouts.
 *
 * Usage:
 *   <PillLabel text="Same crop. Every time." accentColor="#3d7f7d" opacity={0} />
 *   yield* pill().opacity(1, 0.5);
 */
export class PillLabel extends Node {
  @initial("label")
  @signal()
  declare public readonly text: SimpleSignal<string, this>;

  @initial("#5c5c5c")
  @signal()
  declare public readonly accentColor: SimpleSignal<string, this>;

  @initial(46)
  @signal()
  declare public readonly fontSize: SimpleSignal<number, this>;

  public constructor(props?: PillLabelProps) {
    super(props ?? {});

    this.add(
      <Rect
        fill={BASE.surfaceHi}
        stroke={BASE.border}
        lineWidth={4}
        radius={7}
        layout
        justifyContent={"center"}
        alignItems={"center"}
        paddingTop={8}
        paddingBottom={19}
        paddingLeft={16}
        paddingRight={16}
      >
        <Txt
          text={() => this.text()}
          fontSize={() => this.fontSize()}
          fill={this.accentColor}
          fontFamily={BASE.font}
        />
      </Rect>,
    );
  }
}
