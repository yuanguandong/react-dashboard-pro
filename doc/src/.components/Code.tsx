import { Button, Collapse } from 'antd';
import { useState } from 'react';
import { FaCode } from 'react-icons/fa';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
const { Panel } = Collapse;

SyntaxHighlighter.registerLanguage('javascript', typescript);
SyntaxHighlighter.registerLanguage('bash', bash);

export default (props: any) => {
  const { content, defaultOpen = false, title = '代码示例',type='typescript' } = props;

  const [show, setShow] = useState(defaultOpen);

  return (
    <div className="code">
      <Button
        block
        onClick={() => setShow(!show)}
        type="primary"
        style={{
          background: '#000',
          border: 'none',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <p>
          <FaCode
            style={{ fontSize: 16, verticalAlign: 'middle', marginRight: 10 }}
          />
          {title}
        </p>
        <p>{!show ? 'Show Code' : 'Hide Code'}</p>
      </Button>
      {show && (
        <SyntaxHighlighter
          language={type}
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
