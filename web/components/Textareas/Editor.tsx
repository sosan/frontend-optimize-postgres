import CodeMirror, { Decoration, DecorationSet, EditorView, Extension, StateEffect, StateField } from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { xcodeDark } from '@uiw/codemirror-theme-xcode';
import { Form, FormInstance, Input } from 'antd';
import "../../assets/css/textarea.css";
import { useEffect, useRef } from 'react';
import { addListenerForEvents } from "../Notification/eventEmitter";
import { ResultState } from '../Cards/BackCard';
import React from 'react';
// import { dataSources } from '../Cards/FineCard';

export const EVENT_EDITOR_DDL = "editor_ddl";
export const EVENT_EDITOR_DML = "editor_dml";
const DDL_KIND_NAME = "ddl";
const DML_KIND_NAME = "dml";

interface ContainerProps {
  code: string
  nameItem: string
  formRef: FormInstance<any>
}

interface ContainerState { }


const highlightLineEffect = StateEffect.define<{ from: number; to: number }>();

const highlightLinesField = StateField.define<DecorationSet>({
  create() {
    return Decoration.none;
  },
  update(highlights, tr) {
    highlights = highlights.map(tr.changes);
    for (let effect of tr.effects) {
      if (effect.is(highlightLineEffect)) {
        const deco = Decoration.line({
          attributes: { class: 'highlighted-line' }
        });
        const startLine = tr.state.doc.lineAt(effect.value.from).number;
        const endLine = tr.state.doc.lineAt(effect.value.to).number;
        for (let i = startLine; i <= endLine; i++) {
          highlights = highlights.update({
            add: [deco.range(tr.state.doc.line(i).from)]
          });
        }
      }
    }
    return highlights;
  },
  provide: f => EditorView.decorations.from(f)
});
export function Editor(props: ContainerProps) {
  const extensions: Extension[] = [sql(), highlightLinesField];
  const editorRef = useRef(null);

  function onChange(newValue: any, _: any) {
    props.formRef.setFieldValue(props.nameItem, newValue);
  }

  useEffect(() => {
    if (props.nameItem === "ddlschema") {
      addListenerForEvents([EVENT_EDITOR_DDL], setComponentState);
    }

    if (props.nameItem === "queries") {
      addListenerForEvents([EVENT_EDITOR_DML], setComponentState);
    }
  }, []);

  function setComponentState(resultData: ResultState) {
    // resultData.columnDataSource = dataSources;
    // @ts-ignore
    const view = editorRef?.current?.view as any;
    const listEffects = generateListEffects(resultData, view)
    view.dispatch({
      effects: listEffects
    });
    // if (listDDL.length === 0 && listQueries.length === 0) return;

    // if (props.nameItem === "ddlschema") {
    //   view.dispatch({
    //     effects: [...listDDL]
    //   });
    // } else if (props.nameItem === "queries") {
    //   view.dispatch({
    //     effects: [ ...listQueries]
    //   });
    // }

  }

  function generateListEffects(resultData: ResultState, view: any) {
    let listEffects = [];

    console.log("+++" + props.nameItem)
    for (let i = 0; i < (resultData.columnDataSource?.length as number); i++) {
      if (props.nameItem === "ddlschema" && resultData.columnDataSource![i]?.kind === DDL_KIND_NAME) {
        let line = resultData.columnDataSource![i]?.position?.split(" ")[2] as string;
        if (!line) continue;
        if (view.state.doc.line(line).text.startsWith("--")) {
          const newLine = Number.parseInt(line) + 1;
          line = newLine.toString();
        }
        listEffects.push(highlightLineEffect.of({
          from: view.state.doc.line(line).from,
          to: view.state.doc.line(line).to
        }));
      }

      if (props.nameItem === "queries" && resultData.columnDataSource![i]?.kind === DML_KIND_NAME) {
        let line = resultData.columnDataSource![i]?.position?.split(" ")[2] as string;
        if (!line) continue;
        if (view.state.doc.line(line).text.startsWith("--")) {
          const newLine = Number.parseInt(line) + 1;
          line = newLine.toString();
        }
        listEffects.push(highlightLineEffect.of({
          from: view.state.doc.line(line).from,
          to: view.state.doc.line(line).to
        }));
      }
    }

    return listEffects;

  }


  return (
    <>
      <Form.Item
        name={props.nameItem}
        noStyle
        hidden={true}
        initialValue={props.code}
        rules={[{ required: true, message: 'Please input schema sql!' }]}>
        <Input />
      </Form.Item>
      <CodeMirror ref={editorRef} onChange={onChange} value={props.code} maxHeight="350px" indentWithTab={true} theme={xcodeDark} height="350px" extensions={extensions} className="input-textarea bg-transparent select-none " />
    </>
  );
}
