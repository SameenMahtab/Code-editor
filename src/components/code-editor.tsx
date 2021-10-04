import MonacoEditor, {EditorDidMount} from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import {useRef} from 'react';
import './code-editor.css';

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({initialValue, onChange}) => {
  const editorRef = useRef<any>();
  //the getVallue callback function (frist attribute of onEditorDidMount) will
  //return the current value in the editor.

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
      editorRef.current = monacoEditor;
      monacoEditor.onDidChangeModelContent(() => {
        onChange(getValue());
      });
      monacoEditor.getModel()?.updateOptions({tabSize:2});
  }; 

  const onFormatClick = () => {
    //Get the current value from the editor
    const unformatted = editorRef.current.getModel().getValue();
    //Format the text using
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    }).replace(/\n$/, '');
    //Set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };
  
  return (
    <div className="editor-wrapper">
      <button className="button button-format is-primary is-small" onClick={onFormatClick}>Format</button>
    <MonacoEditor 
      editorDidMount={onEditorDidMount}
      value={initialValue}
      height="100%" 
      language="javascript" 
      theme="dark"
      options={
        {
        wordWrap: 'on',
        minimap: {enabled: false},
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
      
    />
    </div>
  );
};

export default CodeEditor;
