import { Col, Row } from 'antd';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import './index.less';

const widgetName = 'Clock';
const widgetClassName = 'react-dashboard-widget-' + widgetName;

const Widget = (props: any) => {
  const {} = props;
  const [layout, setLayout] = useState('h');
  const [fontSize, setfontSize] = useState('60px');
  const [degSeconds, setDegSeconds] = useState(0);
  const [degMinutes, setDegMinutes] = useState(0);
  const [degHours, setDegHours] = useState(0);
  const [breathe, setBreathe] = useState(true);

  const clockRun = useCallback(() => {
    var date = new Date(),
      seconds = date.getSeconds(),
      minutes = date.getMinutes(),
      hours = date.getHours();
    setDegSeconds((seconds * 360) / 60);
    setDegMinutes(((minutes + seconds / 60) * 360) / 60);
    setDegHours(((hours + minutes / 60 + seconds / 60 / 60) * 360) / 12);
    setBreathe((breathe) => !breathe);
  }, []);

  useEffect(() => {
    let run = setInterval(() => {
      clockRun();
    }, 1000);
    return function cleanup() {
      clearInterval(run);
    };
  }, []);

  const onResize = (w: any, h: any) => {
    let layoutTemp: string, fontSizeTemp: string;
    if (w < h) {
      layoutTemp = 'v';
      fontSizeTemp = h / 6 + 'px';
    } else {
      layoutTemp = 'h';
      fontSizeTemp = h / 3 + 'px';
    }
    setLayout(layoutTemp);
    setfontSize(fontSizeTemp);
  };

  const { ref, width, height } = useResizeDetector({ onResize });

  return (
    <div className={widgetClassName}>
      <Row style={{ height: '100%' }} ref={ref}>
        <Col
          span={layout === 'h' ? 8 : 24}
          className={widgetClassName + '-left'}
          style={{ height: layout === 'h' ? '100%' : '50%' }}
        >
          <div className={widgetClassName + '-clock'}>
            <div className={widgetClassName + '-c1'}>
              <div className={widgetClassName + '-c2'}>
                <div className={widgetClassName + '-pin'}>
                  <div className={widgetClassName + '-clockInner'}></div>
                </div>
                <div
                  id="hr"
                  className={widgetClassName + '-hr'}
                  style={{ transform: `rotate(${degHours}deg)` }}
                ></div>
                <div
                  id="min"
                  className={widgetClassName + '-min'}
                  style={{ transform: `rotate(${degMinutes}deg)` }}
                ></div>
                <div
                  id="sec"
                  className={widgetClassName + '-sec'}
                  style={{ transform: `rotate(${degSeconds}deg)` }}
                ></div>
              </div>
            </div>
          </div>
        </Col>
        <Col
          span={layout === 'h' ? 16 : 24}
          className={widgetClassName + '-right'}
          style={{ height: layout === 'h' ? '100%' : '50%' }}
        >
          <div className={widgetClassName + '-timeNum'} style={{ fontSize }}>
            {moment().format('HH')}
            <span
              style={{
                width: 20,
                textAlign: 'center',
                fontSize: 30,
                fontWeight: 'bold',
              }}
            >
              {breathe ? ':' : ' '}
            </span>
            {moment().format('mm')}
          </div>
          <div className={widgetClassName + '-calender'}>
            <div className={widgetClassName + '-year'}>
              {moment().format('YYYY-MM-DD')}
            </div>
            <div className={widgetClassName + '-day'}>
              {moment().format('dddd')}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Widget;
