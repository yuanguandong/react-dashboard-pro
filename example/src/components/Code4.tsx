export default `import React from 'react';
import Background from 'smart-background';
import { Fa500Px,FaApple,FaAdobe,FaAdversal,FaAirbnb } from 'react-icons/fa';

export default () => {
  return (
    <div className="container">
      <Background
        symbols={icons}
        random={{fontSizeRange:[60,90]}}
        rotate={45}
        underlayImage='linear-gradient(to right, #ff0844 0%, #ffb199 100%)'
      >
        <div style={styles.content}>
          <FaApple style={{color:'#fff'}}/>
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

const icons = [
  <Fa500Px />,
  <FaApple />,
  <FaAdobe />,
  <FaAdversal />,
  <FaAirbnb />
]

`;
