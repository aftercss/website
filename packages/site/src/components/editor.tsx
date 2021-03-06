import { Checkbox, Radio } from 'antd';
import Worker from '../worker/parser.worker.ts';
/* tslint:disable */
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/basic-languages/css/css.contribution.js';
import 'monaco-editor/esm/vs/language/json/monaco.contribution';
import * as React from 'react';
/* tslint:disable */
import './editor.css';

(self as any).MonacoEnvironment = {
	getWorkerUrl: function (moduleId: string, label: string) {
		if (label === 'json') {
			return './json.worker.js';
		}
		if (label === 'css') {
			return './css.worker.js';
		}
		return './editor.worker.js';
	}
}

export interface IEditorProp {
  language: string;
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
  private inputEditor: monaco.editor.IStandaloneCodeEditor;
  private resultEditor: monaco.editor.IStandaloneCodeEditor;
  private timer: NodeJS.Timeout;
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
    this.inputEditor = monaco.editor.create(document.getElementById('input'), {
      language: this.props.language,
      value: '/* input css content*/',
    });
    this.resultEditor = monaco.editor.create(document.getElementById('result'), {
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
    const worker = Worker();
    console.log('worker started');

    worker.postMessage({
      css: this.inputEditor.getValue(),
      type: this.state.type,
    });
    worker.addEventListener('message', (event: any) => {
      this.setState(
        {
          ast: event.data.res,
          time: event.data.time,
        },
        this.showResult,
      );
      worker.terminate();
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
