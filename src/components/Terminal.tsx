import { Rect, Txt, Layout, Node, NodeProps, initial, signal } from "@motion-canvas/2d";
import {
  SignalValue,
  SimpleSignal,
  createRef,
  easeOutCubic,
  easeInOutCubic,
  sequence,
  all,
  waitUntil,
  useDuration,
  ThreadGenerator,
  TimingFunction,
} from "@motion-canvas/core";
import { BASE } from "../styles/palette";
import { TypewriterText } from "./TypewriterText";

export interface TerminalProps extends NodeProps {
  lines?: SignalValue<string[]>;
  accent?: SignalValue<string>;
  fontSize?: SignalValue<number>;
  fontFamily?: SignalValue<string>;
  panelFill?: SignalValue<string>;
  panelStroke?: SignalValue<string>;
  panelLineWidth?: SignalValue<number>;
  panelRadius?: SignalValue<number>;
  gap?: SignalValue<number>;
  padding?: SignalValue<number>;
  cursorWidth?: SignalValue<number>;
  cursorColor?: SignalValue<string>;
  cursorBlinkSpeed?: SignalValue<number>;
  cursorOffset?: SignalValue<number>;
}

export interface ShowOutputOptions {
  stagger?: number;
  lineAnimDuration?: number;
  fadeDuration?: number;
}

export interface DismissOptions {
  distance?: number;
  duration?: number;
  scale?: number;
  easing?: TimingFunction;
}

export class Terminal extends Node {
  @initial([])
  @signal()
  declare public readonly lines: SimpleSignal<string[], this>;

  @initial(BASE.text)
  @signal()
  declare public readonly accent: SimpleSignal<string, this>;

  @initial(20)
  @signal()
  declare public readonly fontSize: SimpleSignal<number, this>;

  @initial(BASE.mono)
  @signal()
  declare public readonly fontFamily: SimpleSignal<string, this>;

  @initial(BASE.bg)
  @signal()
  declare public readonly panelFill: SimpleSignal<string, this>;

  @initial(BASE.surfaceHi)
  @signal()
  declare public readonly panelStroke: SimpleSignal<string, this>;

  @initial(2)
  @signal()
  declare public readonly panelLineWidth: SimpleSignal<number, this>;

  @initial(8)
  @signal()
  declare public readonly panelRadius: SimpleSignal<number, this>;

  @initial(8)
  @signal()
  declare public readonly gap: SimpleSignal<number, this>;

  @initial(29)
  @signal()
  declare public readonly padding: SimpleSignal<number, this>;

  @initial(24)
  @signal()
  declare public readonly cursorWidth: SimpleSignal<number, this>;

  @initial(BASE.textMid)
  @signal()
  declare public readonly cursorColor: SimpleSignal<string, this>;

  @initial(0.5)
  @signal()
  declare public readonly cursorBlinkSpeed: SimpleSignal<number, this>;

  @initial(4)
  @signal()
  declare public readonly cursorOffset: SimpleSignal<number, this>;

  private readonly panelRef = createRef<Rect>();
  private readonly cmdContainer = createRef<Layout>();
  private readonly cmdText = createRef<TypewriterText>();
  private readonly outputContainers: ReturnType<typeof createRef<Layout>>[] = [];
  private readonly outputTexts: ReturnType<typeof createRef<Txt>>[] = [];

  public constructor(props?: TerminalProps) {
    super(props ?? {});

    const currentLines = this.lines();
    for (let i = 1; i < currentLines.length; i++) {
      this.outputContainers.push(createRef<Layout>());
      this.outputTexts.push(createRef<Txt>());
    }

    this.add(
      <Rect
        ref={this.panelRef}
        layout
        radius={() => this.panelRadius()}
        fill={() => this.panelFill()}
        stroke={() => this.panelStroke()}
        lineWidth={() => this.panelLineWidth()}
      >
        <Layout layout direction="column" gap={() => this.gap()} padding={() => this.padding()}>
          <Layout layout height={0} ref={this.cmdContainer}>
            <TypewriterText
              ref={this.cmdText}
              fontSize={() => this.fontSize()}
              fill={BASE.textMid}
              fontFamily={() => this.fontFamily()}
              cursorHeight={() => this.fontSize()}
              cursorWidth={() => this.cursorWidth()}
              cursorColor={() => this.cursorColor()}
              cursorBlinkSpeed={() => this.cursorBlinkSpeed()}
              cursorOffset={() => this.cursorOffset()}
              opacity={0}
            />
          </Layout>
          {currentLines.slice(1).map((line, i) => (
            <Layout layout height={0} ref={this.outputContainers[i]}>
              <Txt
                ref={this.outputTexts[i]}
                text={line}
                fontSize={() => this.fontSize()}
                fill={() => this.accent()}
                fontFamily={() => this.fontFamily()}
                textWrap
                opacity={0}
              />
            </Layout>
          ))}
        </Layout>
      </Rect>,
    );
  }

  public *typeCommand(duration: number): ThreadGenerator {
    yield* this.cmdContainer().height("100%", 0.22, easeOutCubic);
    this.cmdText().opacity(1);
    yield* this.cmdText().type(this.lines()[0], duration, { autoHideAfter: -1 });
    yield* this.cmdText().stop();
  }

  public *showOutput(options: ShowOutputOptions = {}): ThreadGenerator {
    const { stagger = 0.1, lineAnimDuration = 0.18, fadeDuration = 0.12 } = options;

    yield* sequence(
      stagger,
      ...this.outputContainers.map((container, i) =>
        all(
          container().height("100%", lineAnimDuration, easeOutCubic),
          this.outputTexts[i]().opacity(1, fadeDuration),
        ),
      ),
    );
  }

  public *dismiss(options: DismissOptions = {}): ThreadGenerator {
    const {
      distance = 680,
      duration = 0.42,
      scale = 0.96,
      easing = easeInOutCubic,
    } = options;

    yield* all(
      this.panelRef().position.x(distance, duration, easing),
      this.panelRef().opacity(0, duration),
      this.panelRef().scale(scale, duration, easeOutCubic),
    );
  }

  public *animate(cuePrefix: string, options?: ShowOutputOptions): ThreadGenerator {
    yield* waitUntil(`${cuePrefix}-cmd`);
    yield* this.typeCommand(useDuration(`${cuePrefix}-typing`));
    yield* waitUntil(`${cuePrefix}-output`);
    yield* this.showOutput(options);
  }
}
