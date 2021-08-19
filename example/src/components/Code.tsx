import { Button, Collapse } from 'antd';
import { useState } from 'react';
import { FaCode } from 'react-icons/fa';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
const { Panel } = Collapse;

SyntaxHighlighter.registerLanguage('javascript', typescript);

export default (props: any) => {
  const { content } = props;

  const [show, setShow] = useState(false);

  return (
    <div className="code">
      <Button block onClick={() => setShow(!show)} type="primary"  style={{background:'#000',border:'none'}}>
      <FaCode style={{fontSize:16,verticalAlign: 'middle',marginRight:10}}/> {!show ? 'Show Code' : 'Hide Code'}
      </Button>
      {show && (
        <SyntaxHighlighter
          language="typescript"
          // showLineNumbers={true}
          wrapLines={true}
          style={atomOneDark}
        >
          {content}
        </SyntaxHighlighter>
      )}
    </div>
  );
};
