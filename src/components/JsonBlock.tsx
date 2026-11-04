import { Rect, Txt, Layout, Node, NodeProps, initial, signal } from "@motion-canvas/2d";
import { SignalValue, SimpleSignal, createRef } from "@motion-canvas/core";
import { BASE } from "../styles/palette";

export interface JsonBlockProps extends NodeProps {
  headerColor?: SignalValue<string>;
  headerLabel?: SignalValue<string>;
  blockWidth?: SignalValue<number>;
}

export class JsonBlock extends Node {
  @initial(BASE.border)
  @signal()
  declare public readonly headerColor: SimpleSignal<string, this>;

  @initial("file.json")
  @signal()
  declare public readonly headerLabel: SimpleSignal<string, this>;

  @initial(380)
  @signal()
  declare public readonly blockWidth: SimpleSignal<number, this>;

  public readonly contentRef = createRef<Layout>();

  public constructor(props?: JsonBlockProps) {
    super(props ?? {});

    this.add(
      <Rect
        layout
        direction="column"
        width={() => this.blockWidth()}
        fill={BASE.bg}
        stroke={BASE.surfaceHi}
        lineWidth={2}
        radius={6}
        clip
      >
        <Rect
          width={() => this.blockWidth()}
          height={28}
          fill={() => this.headerColor()}
          padding={[0, 14]}
          alignItems="center"
        >
          <Txt
            text={() => this.headerLabel()}
            fontSize={12}
            fill={BASE.text}
            fontFamily={BASE.mono}
          />
        </Rect>
        <Layout layout direction="column" gap={6} padding={16}>
          <Txt text="{" fontSize={13} fill={BASE.textMid} fontFamily={BASE.mono} />
          <Layout ref={this.contentRef} layout direction="column" gap={6} />
          <Txt text="}" fontSize={13} fill={BASE.textMid} fontFamily={BASE.mono} />
        </Layout>
      </Rect>,
    );
  }
}
