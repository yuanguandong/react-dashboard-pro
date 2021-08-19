export default `import React from 'react';
import Background from 'smart-background';

const symbols = ['乾','坤','震','巽','坎','离','艮','兑','天','地','雷','风','水','火','山','泽']

export default () => {
  return (
    <div className="container">
      <Background
        underlayImage='linear-gradient(to right, #434343 0%, black 100%)'
        symbolsStyle={{color:'rgba(255,255,255,0.8)'}}
        symbolSize={20}
        gap={20}
        animation={{ type: 'right', speed: 5 }}
        rotate={45}
        symbols={symbols}
      >
        <div style={styles.content}>
          <FaYinYang style={styles.icon} />
          <h1 style={styles.text}>乾坤</h1>
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
    fontWeight: 'bold',
  },
  icon: { color: '#fff', fontSize: 120 },
  text: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
};`;


// import React from 'react';
// import Background from 'smart-background';

// export default () => {
//   return (
//     <div className="container">
//       <Background
//         underlayImage="linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)"
//         symbolSize={20}
//         gap={20}
//         animation={{ type: 'right', speed: 5 }}
//         rotate={45}
//         symbols={[
//           '乾',
//           '坤',
//           '震',
//           '巽',
//           '坎',
//           '离',
//           '艮',
//           '兑',
//           '天',
//           '地',
//           '雷',
//           '风',
//           '水',
//           '火',
//           '山',
//           '泽',
//         ]}
//       >
//         <div
//           style={styles.content}
//         >
//           <FaYinYang style={styles.icon} />
//           <h1 style={styles.text}>乾坤</h1>
//         </div>
//       </Background>
//     </div>
//   );
// };

// const styles = {
//   container: { width: '100%', position: 'relative', height: 350 },
//   content: {
//     width: '100%',
//     height: '100%',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'column',
//     fontWeight: 'bold',
//   },
//   icon: { color: '#fff', fontSize: 120 },
//   text: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
// };
