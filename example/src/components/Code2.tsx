export default `import React from 'react';
import Background from 'smart-background';

export default () => {
  return (
    <div className="container">
      <Background
        symbolsStyle={{ opacity: 1 }}
        symbolSize={100}
        gap={0}
        symbols={[
          ...images.map((img) => (
            <div
              style={{
                ...styles.img,
                backgroundImage: \`url(\${img})\`,
              }}
            />
          )),
        ]}
        animation={{ type: 'top', speed: 5 }}
      >
        <div style={styles.content}>
          😋
          <h1 style={styles.text}>
            Nice Image
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
    background: 'rgba(0,0,0,0.5)',
    fontSize: 120,
  },
  img:{
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    transform: 'scale(1.2)',
  },
  text: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
};

const images = [
  'https://cdn.dribbble.com/users/3550736/screenshots/16244010/media/cead570591b124ed91c34dc9958f315c.jpg?compress=1&resize=1200x900',
  'https://cdn.dribbble.com/users/3550736/screenshots/16244010/media/f03f7960c2d88f6fec3b43b9e1b5935b.jpg?compress=1&resize=1600x1200',
  'https://cdn.dribbble.com/users/4666085/screenshots/16244479/media/d3d5b6d3e546fa17170b5daa46de375e.png?compress=1&resize=1200x900',
  'https://cdn.dribbble.com/users/4588540/screenshots/16243929/media/430745b49a20f462bbfbdabc77b542f9.png?compress=1&resize=1200x900',
  'https://cdn.dribbble.com/users/4835348/screenshots/16229715/media/5c68b55f75b04e96ff6f110ab2617996.png?compress=1&resize=800x600',
  'https://cdn.dribbble.com/users/323673/screenshots/16223702/media/60b90d6e0f673e0ccee30056b8ae83d2.png?compress=1&resize=1200x900',
  'https://cdn.dribbble.com/users/427857/screenshots/16157651/media/d8739d9147bb28ae6376e2206f67ba60.png?compress=1&resize=1600x1200',
  'https://cdn.dribbble.com/users/427857/screenshots/16157651/media/18fcbf0c65cb47c14f633b162042cc65.png?compress=1&resize=1600x1200',
  'https://cdn.dribbble.com/users/427857/screenshots/16157651/media/ecd0b4a299aabb66c8358b1051a139cd.png?compress=1&resize=1600x1200',
  'https://cdn.dribbble.com/users/6532302/screenshots/16244413/media/c554d3e5bcf8c680ae56852b1b290fa7.jpg?compress=1&resize=1200x900',
  'https://cdn.dribbble.com/users/2192147/screenshots/16242676/media/20f56e6b73bfc7ee4b9d9143f6449ad3.jpg?compress=1&resize=1200x900',
  'https://cdn.dribbble.com/users/730703/screenshots/16207835/media/a9ad81cbcc73c87629471f4546828f2c.gif',
  'https://cdn.dribbble.com/users/86429/screenshots/16241756/media/2d6331f16965e1ee4453b197e4d7f442.jpg?compress=1&resize=800x600',
  'https://cdn.dribbble.com/users/5462867/screenshots/16165195/media/2a7203b0e3d1bbca91be7565d25d3f39.jpg?compress=1&resize=1200x900',
  'https://cdn.dribbble.com/users/500242/screenshots/15428350/media/7b8a007e88d9050fe3d52c3625d2ff24.gif',
];

`;

