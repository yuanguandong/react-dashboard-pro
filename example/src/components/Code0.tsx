export default `import React from 'react';
import Background from 'smart-background';
import { FaLaugh } from 'react-icons/fa';

export default () => {
  return (
    <div style={styles.container}>
      <Background underlayColor="#f00" animation={{ type: 'bottom', speed: 5 }}>
        <div style={styles.content}>
          <FaLaugh style={styles.icon} />
          <h1 style={styles.text}>JUST DO IT</h1>
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
  },
  icon: { color: '#fff', fontSize: 120 },
  text: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
};
`;

// import React from 'react';
// import Background from 'smart-background';
// import { FaLaugh } from 'react-icons/fa';

// export default () => {
//   return (
//     <div style={styles.container}>
//       <Background underlayColor="#f00" animation={{ type: 'bottom', speed: 5 }}>
//         <div style={styles.content}>
//           <FaLaugh style={styles.icon} />
//           <h1 style={styles.text}>JUST DO IT</h1>
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
//   },
//   icon: { color: '#fff', fontSize: 120 },
//   text: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
// };
