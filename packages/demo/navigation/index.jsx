import { memo, useEffect, useState } from 'react';
import {
  AtNavBar,
  AtTabBar,
  AtTabs,
  AtTabsPane,
  AtSegmentedControl,
  AtPagination,
  AtDrawer,
} from 'taro-ui';
import DocHeader from "~/components/doc-header";
import NavigatorBtn from '~/components/navigator-btn';
import { setPageTitle, rem } from '~/utils';
import { useMemoizedFn } from 'ahooks';
import components from './index.css';

const { View } = components;

export default memo(() => {
  useEffect(() => {
    setPageTitle('Taro UI');
  }, []);

  const [state, updateState] = useState({
    tabbarCurrent: 0,
    tabsListValue: 0,
    tabsListValue2: 0,
    segmentedValue: 0,
    leftDrawerShow: false,
  });

  const setState = useMemoizedFn((nextState) => {
    updateState({ ...state, ...nextState });
  });

  const leftDrawerClick = useMemoizedFn(() => {
    setState({
      leftDrawerShow: !state.leftDrawerShow,
    });
  });

  const onDrawerClose = useMemoizedFn(() => {
    setState({
      leftDrawerShow: !state.leftDrawerShow,
    });
  });

  const handleTabBarClick = useMemoizedFn((value) => {
    setState({
      tabbarCurrent: value
    });
  });

  const handleTabsClick = useMemoizedFn((stateName, value) => {
    setState({
      [stateName]: value
    });
  });

  const handleSegmenentedClick = useMemoizedFn((value) => {
    setState({
      segmentedValue: value
    });
  });

  const { tabsListValue, tabsListValue2, segmentedValue } = state
    const tabbarList = [{ title: '待办事项', iconType: 'bullet-list', text: 'new' }, { title: '拍照', iconType: 'camera' }, { title: '文件夹', iconType: 'folder', text: '100', max: '99' }]
    const tabList = [
      { title: '标签页1' },
      { title: '标签页2' },
      { title: '标签页3' },
      { title: '标签页4' },
      { title: '标签页5' },
      { title: '标签页6' }
    ]
    const segmentedList = ['标签页1', '标签页2', '标签页3']

    return (
      <View className='page'>
        {/* S Header */}
        <DocHeader title='导航' desc='7 个组件'></DocHeader>
        {/* E Header */}

        {/* S Body */}
        <View className='doc-body'>
          {/* NavBar */}
          <View className='panel'>
            <View className='panel__title'>NavBar 导航栏</View>
            <View className='panel__content no-padding'>
              <View className='example-item'>
                <AtNavBar
                  title='NavBar 导航栏示例'
                  leftIconType='chevron-left'
                  rightFirstIconType='bullet-list'
                  rightSecondIconType='user'
                />
              </View>
            </View>
          </View>

          {/* TabBar */}
          <View className='panel'>
            <View className='panel__title'>TabBar 标签栏</View>
            <View className='panel__content no-padding'>
              <View className='example-item'>
                <AtTabBar tabList={tabbarList} onClick={handleTabBarClick} current={state.tabbarCurrent} />
              </View>
            </View>
          </View>

          {/* Tabs */}
          <View className='panel'>
            <View className='panel__title'>Tabs 标签页</View>
            <View className='panel__content'>
              <View className='example-item'>
                <View className='example-item__desc'>水平标签页</View>
                <AtTabs swipeable={false} scroll current={tabsListValue} tabList={tabList} onClick={(value) => handleTabsClick('tabsListValue', value)}>
                  <AtTabsPane current={tabsListValue} index={0}>
                    <View className='tab-content'>标签页一的内容</View>
                  </AtTabsPane>
                  <AtTabsPane current={tabsListValue} index={1}>
                    <View className='tab-content'>标签页二的内容</View>
                  </AtTabsPane>
                  <AtTabsPane current={tabsListValue} index={2}>
                    <View className='tab-content'>标签页三的内容</View>
                  </AtTabsPane>
                  <AtTabsPane current={tabsListValue} index={3}>
                    <View className='tab-content'>标签页四的内容</View>
                  </AtTabsPane>
                  <AtTabsPane current={tabsListValue} index={4}>
                    <View className='tab-content'>标签页五的内容</View>
                  </AtTabsPane>
                  <AtTabsPane current={tabsListValue} index={5}>
                    <View className='tab-content'>标签页六的内容</View>
                  </AtTabsPane>
                </AtTabs>
              </View>

              <View className='example-item'>
                <View className='example-item__desc'>垂直标签页</View>
                <AtTabs height='200px' scroll tabDirection='vertical' current={tabsListValue2} tabList={tabList} onClick={(value) => handleTabsClick('tabsListValue2', value)}>
                  <AtTabsPane tabDirection='vertical' current={tabsListValue2} index={0}>
                    <View className='tab-content--vertical'>标签页一的内容</View>
                  </AtTabsPane>
                  <AtTabsPane tabDirection='vertical' current={tabsListValue2} index={1}>
                    <View className='tab-content--vertical'>标签页二的内容</View>
                  </AtTabsPane>
                  <AtTabsPane tabDirection='vertical' current={tabsListValue2} index={2}>
                    <View className='tab-content--vertical'>标签页三的内容</View>
                  </AtTabsPane>
                  <AtTabsPane tabDirection='vertical' current={tabsListValue2} index={3}>
                    <View className='tab-content--vertical'>标签页四的内容</View>
                  </AtTabsPane>
                  <AtTabsPane tabDirection='vertical' current={tabsListValue2} index={4}>
                    <View className='tab-content--vertical'>标签页五的内容</View>
                  </AtTabsPane>
                  <AtTabsPane tabDirection='vertical' current={tabsListValue2} index={5}>
                    <View className='tab-content--vertical'>标签页六的内容</View>
                  </AtTabsPane>
                </AtTabs>
              </View>
            </View>
          </View>

          {/* SegmentedControl */}
          <View className='panel'>
            <View className='panel__title'>SegmentedControl 分段器</View>
            <View className='panel__content'>
              <View className='example-item'>
                <AtSegmentedControl onClick={handleSegmenentedClick} current={segmentedValue} values={segmentedList} />
                <View className='tab-content'>标签 {segmentedValue + 1} 的内容</View>
              </View>
            </View>
          </View>

          {/* Pagination */}
          <View className='panel'>
            <View className='panel__title'>Pagination 分页器</View>
            <View className='panel__content no-padding'>
              <View className='example-item'>
                <View className='example-item__desc' style={{ padding: `0 ${rem(60)}` }}>基础</View>
                <AtPagination total={50} pageSize={10} current={1}></AtPagination>
              </View>

              <View className='example-item'>
                <View className='example-item__desc' style={{ padding: `0 ${rem(60)}` }}>图标</View>
                <AtPagination icon total={50} pageSize={10} current={1}></AtPagination>
              </View>
            </View>
          </View>

          {/* Drawer */}
          <View className='panel'>
            <View className='panel__title'>Drawer 抽屉</View>
            <View className='panel__content'>
              <View className='example-item'>
                <View className='demo-btn' onClick={leftDrawerClick}>左边滑出</View>
                <AtDrawer show={state.leftDrawerShow} mask onClose={onDrawerClose} items={['菜单1', '菜单2']}>
                </AtDrawer>
              </View>
            </View>
          </View>

          {/* Indexes */}
          <View className='panel'>
            <View className='panel__title'>Indexes 索引选择器</View>
            <View className='panel__content'>
              <View className='example-item'>
                <NavigatorBtn webPackage='/demo/' page='Indexes'></NavigatorBtn>
              </View>
            </View>
          </View>

        </View>
        {/* E Body */}
      </View>
    );
});
