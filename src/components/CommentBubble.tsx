import { Rect, Txt, Node, NodeProps, initial, signal } from "@motion-canvas/2d";
import { SignalValue, SimpleSignal } from "@motion-canvas/core";
import { BASE } from "../styles/palette";

export interface CommentBubbleProps extends NodeProps {
  text?: SignalValue<string>;
  width?: SignalValue<number>;
}

export class CommentBubble extends Node {
  @initial("")
  @signal()
  declare public readonly text: SimpleSignal<string, this>;

  @initial(380)
  @signal()
  declare public readonly width: SimpleSignal<number, this>;

  public constructor(props?: CommentBubbleProps) {
    super(props ?? {});

    this.add(
      <Rect
        fill={"#1b1f23"}
        stroke={BASE.border}
        lineWidth={3}
        radius={6}
        padding={[16, 20]}
        layout
        maxWidth={() => this.width()}
        strokeFirst
      >
        <Txt
          text={() => this.text()}
          fontSize={42}
          fill={"#ffffffe6"}
          fontFamily={"system-ui"}
          textWrap
          margin={18}
        />
      </Rect>,
    );
  }
}
