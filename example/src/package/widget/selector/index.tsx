import { AppstoreAddOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Badge, Button, Empty, Input, List, Modal } from 'antd';
import classnames from 'classnames';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.less';



const Search = Input.Search;

const WidgetSelector = (props: any) => {
  const {
    widgets,
    currentLayout,
    addWidget,
    children = <Button
      size="small"
      type="primary"
      icon={<PlusOutlined/>}
      style={{ marginLeft: '10px' }}
    >
      {'添加小程序'}
    </Button>
  } = props;

  const [stateWidgets, setStateWidgets] = useState(widgets)
  const [visible, setVisible] = useState(false)
  const [height, setHeight] = useState(500)
  const [width, setWidth] = useState<any>(860)
  const [menuData, setMenuData] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [keywords, setKeywords] = useState('')

  //计算是否还可添加
  const canBeAdd = (widget: any) => {
    if (widget.length < Number(widget['maxLength'])) {
      return true
    } else {
      return false
    }
  }

  //计算左侧菜单
  const handleCalcMenuData = useCallback((widgets) => {
    let tags: string[] = [];
    Object.keys(widgets).map((key) => {
      tags.push(...widgets[key]['tags'])
    })
    const tempObj:any = {}
    tags.map(item => {
      if (tempObj[item]) {
        tempObj[item]['count']++
      } else {
        tempObj[item] = {
          title: item,
          count: 1
        }
      }
    })
    const menuData: any = []
    Object.keys(tempObj).map((key, index, arr) => {
      menuData.push(tempObj[key])
    })
    setMenuData(menuData)
  }, [menuData])

  //菜单变化
  const handleMenuChange = useCallback((item, index) => {
    setActiveIndex(index)
    let temp:any = {}
    Object.keys(widgets).map((key) => {
      if (widgets[key]['tags'].indexOf(menuData[index]['title']) >= 0) {
        temp[key] = widgets[key]
      }
    })
    setStateWidgets(temp)
  }, [widgets, menuData])

  //查询
  const handleSearch = useCallback((value) => {
    let temp:any = {}
    Object.keys(widgets).map((key) => {
      if (widgets[key]['name'].indexOf(value) >= 0) {
        temp[key] = widgets[key]
      }
    })
    handleCalcMenuData(temp)
    setStateWidgets(temp)
    setKeywords(value)
  }, [widgets, menuData, handleCalcMenuData])


  useEffect(() => {
    handleCalcMenuData(widgets)
  }, [])

  return (
    <>
      <div style={{ display: 'inline-block' }} onClick={() => { setVisible(true) }}>
        {children}
      </div>
      <Modal
        width={width}
        height={height}
        itemState={{
          width,
          height
        }}
        title={<><AppstoreAddOutlined className='gant-margin-h-5' />{'选择小程序'}</>}
        visible={visible}
        isModalDialog
        onCancel={() => { setVisible(false) }}
        footer={null}
        onSizeChange={(width:number, height:number) => { setHeight(height - 30); setWidth(width) }}
        bodyStyle={{ padding: 0 }}
        zIndex={1006}
      >
        <div className={styles.wrap}>
          <div className={styles.leftBar}>
            <Search
              placeholder={'请输入小程序名称'}
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              prefix={<SearchOutlined className={styles.searchIcon} />}
              allowClear
            />
            <List
              itemLayout="horizontal"
              style={{ marginTop: '10px' }}
              dataSource={menuData}
              renderItem={(item: any, index: number) => (
                <List.Item className={classnames(styles.item, activeIndex == index ? styles.active : '')} onClick={() => handleMenuChange(item, index)}>
                  <div className={styles.name}>{item['title']}</div>
                  <div className={styles.Badge}><Badge count={item['count']} /></div>
                </List.Item>
              )}
            />
          </div>
          <div className={classnames(styles.Layer)} style={{
            height: height - 2
          }}>
            {!_.isEmpty(stateWidgets) ?
              <div className="waterfall" style={{ columnCount: Math.ceil((width - 200) / 200) }}>
                {Object.keys(stateWidgets).map((key) =>
                  <div key={key} className={classnames(styles.item)}>
                    <img src={stateWidgets[key]['snapShot']} className={styles.shortcut} />
                    <div className={styles.bottombar}>
                      <div className={styles.iconWrap} style={{ backgroundImage: stateWidgets[key]['iconBackground'] }}>
                        {stateWidgets[key].icon}
                      </div>
                      <div className={styles.name}>
                        {stateWidgets[key].name}
                      </div>
                      <div className={styles.description}>
                        {stateWidgets[key].description}
                      </div>
                    </div>
                    <div className={styles.mask}>
                      {
                        canBeAdd(stateWidgets[key]) ?
                          <Button type="primary" shape="circle" icon={<PlusOutlined/>} size="large" onClick={() => addWidget(stateWidgets[key], key)} />
                          :
                          <div style={{ padding: 20, color: '#fff', fontWeight: 'bold' }}>{'该小程序最多添加'}{stateWidgets[key].maxLength}{'个'}</div>
                      }
                    </div>
                  </div>
                )}
              </div>
              :
              <div className="emptyContent" style={{ minHeight: height - 20 }}>
                <Empty
                  description={
                    <span>{'该条件下暂无小程序'}</span>
                  }
                />
              </div>
            }
          </div>
        </div>
      </Modal>
    </>
  )
}

export default WidgetSelector