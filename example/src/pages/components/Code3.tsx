export default `import React from 'react';
import Background from 'smart-background';
import { FaApple } from 'react-icons/fa';

export default () => {
  return (
    <div className="container">
      <Background
        symbolsStyle={{ opacity: 1 }}
        exact={true}
        symbols={[
          ...dots.map((dot) => (
            <div
              style={{
                position: 'absolute',
                width: dot.size,
                height: dot.size,
                borderRadius: dot.borderRadius,
                background: dot.background,
                top: dot.y,
                left: dot.x,
              }}
            />
          )),
        ]}
      >
        <div style={styles.content}>
          <FaApple />
          <h1 style={styles.text}>
            Apple
          </h1>
        </div>
      </Background>
    </div>
  );
};

const styles = {
  container: { width: '100%', position: 'relative', height: 350 },
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: 120,
  },
  text: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
};

const dots = [
  {
    x: '-10%',
    y: '-20%',
    size: 200,
    background: 'linear-gradient(to top, #0ba360 0%, #3cba92 100%)',
    borderRadius: '50%',
  },
  {
    x: '60%',
    y: '40%',
    size: 500,
    background:
      'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)',
    borderRadius: '50%',
  },
  {
    x: '-30%',
    y: '50%',
    size: 450,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50%',
  },
];

`;

