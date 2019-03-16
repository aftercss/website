import { Checkbox, Radio } from 'antd';
/* tslint:disable */
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import * as Monaco from 'monaco-editor';
import * as React from 'react';
import { createWorker, ITypedWorker } from 'typed-web-workers';
/* tslint:disable */
import { CSSParser } from '@aftercss/parser';
/* tslint:disable */
import { Root } from '@aftercss/parser/lib/parser-node/index';
import { AfterContext } from '@aftercss/shared';
import { CSSTokenizer } from '@aftercss/tokenizer';
import * as postcss from 'postcss';
import './editor.css';

export interface IEditorProp {
  language: string;
}

export interface IWorkerInput {
  css: string;
  type: string;
}

export interface IWorkerOuput {
  res: postcss.Root | Root;
  time: number;
}
export interface IEditorState {
  ast: object;
  showLocation: boolean;
  showRaw: boolean;
  time: number;
  type: string;
}

export interface IInputData {
  css: string;
  type: 'Aftercss' | 'Postcss';
}
export class Editor extends React.Component<IEditorProp, IEditorState> {
  private inputEditor: Monaco.editor.IStandaloneCodeEditor;
  private resultEditor: Monaco.editor.IStandaloneCodeEditor;
  private timer: number;
  constructor(props: IEditorProp) {
    super(props);
    this.state = {
      ast: {},
      showLocation: true,
      showRaw: true,
      time: 0,
      type: 'Aftercss',
    };
    this.getSelectors = this.getSelectors.bind(this);
    this.locationChange = this.locationChange.bind(this);
    this.rawChange = this.rawChange.bind(this);
    this.startWorker = this.startWorker.bind(this);
    this.typeChange = this.typeChange.bind(this);
  }
  public render() {
    const RadioGroup = Radio.Group;
    return (
      <div className="repl-container">
        <div className="select-zone">
          <div className="parser">
            <span className="prop">Parser:</span>
            <RadioGroup onChange={this.typeChange} value={this.state.type}>
              <Radio value={'Aftercss'} checked>
                Aftercss
              </Radio>
              <Radio value={'Postcss'} checked>
                Postcss
              </Radio>
            </RadioGroup>
          </div>
          {this.getSelectors(this.state.type)}
          <div className="time">
            <span className="prop">Consume:</span>
            <span className="content">{this.state.time.toFixed(5)} ms</span>
          </div>
        </div>
        <div className="editor-zone">
          <div id="input" />
          <div id="result" />
        </div>
      </div>
    );
  }
  public componentDidMount() {
    this.inputEditor = Monaco.editor.create(document.getElementById('input'), {
      language: this.props.language,
      value: '/* input css content*/',
    });
    this.resultEditor = Monaco.editor.create(document.getElementById('result'), {
      language: 'json',
      value: '{}',
    });
    this.inputEditor.onDidChangeModelContent(this.startWorker);
    window.onresize = () => {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.inputEditor.layout();
          this.resultEditor.layout();
          this.timer = null;
        }, 200);
      }
    };
  }
  private locationChange(event: CheckboxChangeEvent) {
    this.setState(
      {
        showLocation: event.target.checked,
      },
      this.showResult,
    );
  }

  private rawChange(event: CheckboxChangeEvent) {
    this.setState(
      {
        showRaw: event.target.checked,
      },
      this.showResult,
    );
  }

  private showResult() {
    const invisibleProps = ['parent'];
    if (!this.state.showLocation) {
      invisibleProps.push('start');
    }
    if (!this.state.showRaw) {
      invisibleProps.push('raw');
    }

    this.resultEditor.setValue(
      JSON.stringify(
        this.state.ast,
        (key, value) => {
          if (invisibleProps.indexOf(key) > -1) {
            return undefined;
          }
          return value;
        },
        2,
      ),
    );
  }

  private startWorker() {
    function workFn(input: IWorkerInput, callback: (_: IWorkerOuput) => void): void {
      const out: IWorkerOuput = {
        res: new Root(),
        time: 0,
      };
      const start = performance.now();
      try {
        if (input.type === 'Aftercss') {
          const tokenizer = new CSSTokenizer(
            new AfterContext({
              fileContent: input.css,
            }),
          );
          const parser = new CSSParser(tokenizer);
          out.res = parser.parseStyleSheet();
        } else if (input.type === 'Postcss') {
          out.res = postcss.parse(input.css);
        }
      } catch (err) {
        out.res = err.message;
      }
      out.time = performance.now() - start;
      callback(out);
    }
    const typedWorker: ITypedWorker<IWorkerInput, IWorkerOuput> = createWorker(workFn, updateState);
    const self = this;
    function updateState(out: IWorkerOuput) {
      typedWorker.terminate();
      self.setState({
        ast: out.res,
        time: out.time,
      });
    }
    typedWorker.postMessage({
      css: this.inputEditor.getValue(),
      type: this.state.type,
    });
  }

  private typeChange(event: CheckboxChangeEvent) {
    this.setState(
      {
        type: event.target.value,
      },
      this.startWorker,
    );
  }

  private getSelectors(type: string) {
    if (type === 'Aftercss') {
      return (
        <>
          <div className="raw">
            <span className="prop">Show Raw:</span>
            <Checkbox onChange={this.rawChange} checked={this.state.showRaw} />
          </div>
          <div className="location">
            <span className="prop">Show Location:</span>
            <Checkbox onChange={this.locationChange} checked={this.state.showLocation} />
          </div>
        </>
      );
    }
  }
}
