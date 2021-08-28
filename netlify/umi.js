  width: 100%;
  height: 100%;
  display: ${t=>t.random||t.exact?"block":"flex"};
  position: ${t=>t.exact?"relative":""};
  flex-direction: row;
  animation: ${t=>{if(t.animation)return`smart-background-scroll-${t.animation.type} ${100/(t.animation.speed||5)}s linear infinite`}};
  flex-wrap: wrap;
  justify-content: space-around;
  position: ${t=>{if(t.animation)return"left"===t.animation.type||"right"===t.animation.type||"bottom"===t.animation.type?"absolute":void 0}};
  top: ${t=>{if(t.animation)return"left"===t.animation.type||"right"===t.animation.type?"0":"bottom"===t.animation.type?1===t.index?0:"-100%":void 0}};
  left: ${t=>{if(t.animation)return"left"===t.animation.type?1===t.index?0:"100%":"right"===t.animation.type?1===t.index?0:"-100%":void 0}};
//# sourceMappingURL=umi.js.map