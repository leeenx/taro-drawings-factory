import Taro from '@tarojs/taro';
import React, { memo, useEffect, useState } from 'react';
import { View, Text, Button } from '@tarojs/components'
import {
  AtActionSheet,
  AtActionSheetItem,
  AtActivityIndicator,
  AtMessage,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtProgress,
  AtSwipeAction,
  AtToast,
} from 'taro-ui';
import { useMemoizedFn } from 'ahooks';
import DocHeader from "../../../components/doc-header";
import { setPageTitle, listMap } from '../../../utils';

import css from './index.css';

const OPTIONS = [
  {
    text: '删除',
    style: {
      color: '#333',
      backgroundColor: '#F7F7F7'
    }
  },
  {
    text: '确认',
    style: {
      backgroundColor: '#E93B3D'
    }
  }
]
const INIT_STATE = {
  image: '',
  icon: '',
  text: '',
  status: '',
  duration: 3000,
  hasMask: false,
  isOpened: false
}

export default memo(() => {
  const [state, setState] = useState({
    isActionSheetOpened1: false,
    isActionSheetOpened2: false,
    isActionSheetOpened3: false,
    isModalOpened1: false,
    isModalOpened2: false,
    isModalOpened3: false,
    isModalOpened4: false,
    ...INIT_STATE,
  });

  useEffect(() => {
    setPageTitle('Taro UI');
  }, []);

  const showToast = useMemoizedFn((name) => {
    Taro.showToast({
      icon: 'none',
      title: name
    })
  });

  const handleActionSheetClick = useMemoizedFn((type) => {
    setState({
      [`isActionSheetOpened${type}`]: true
    })
  });

  const handleActionSheetCancel = useMemoizedFn(() => {
    showToast('点击了取消按钮')
  });

  const handleActionSheetClose = useMemoizedFn((name) => {
    setState({
      [`isActionSheetOpened${name}`]: false
    })
  });

  const handleMessageClick = useMemoizedFn((type) => {
    Taro.atMessage({
      'message': '消息通知',
      'type': type,
    })
  });

  const handleSwipeClick  = useMemoizedFn(() => {
    console.log('--- Taro DEMO 缺失');
  });

  const handleModalClick = useMemoizedFn((type) => {
    setState({
      [`isModalOpened${type}`]: true
    })
  });

  const closeModal = useMemoizedFn((type, msg) => {
    setState({
      [`isModalOpened${type}`]: false
    })
    showToast(msg)
  });

  const handleToastClick = useMemoizedFn((text, icon, image, hasMask, status) => {
    if (state.isOpened) {
      return setState(INIT_STATE)
    }

    setState(Object.assign(
      { ...INIT_STATE, isOpened: true },
      { text, icon, image, hasMask, status }
    ))
  });

  const handleToastClose = useMemoizedFn(() => {
    setState({
      isOpened: false
    })
  });

  return (
    <View className='page' style={css('page')}>
      {/* S Header */}
      <DocHeader title='操作反馈' desc='7 个组件'></DocHeader>
      {/* E Header */}

      {/* S Body */}
      <View className='doc-body' style={css('doc-body')}>
        {/* ActionSheet */}
        <View className='panel' style={css('panel')}>
          <View className='panel__title' style={css('panel__title')}>ActionSheet 动作面板</View>
          <View className='panel__content' style={css('panel__content')}>
            {/* 无 Title */}
            <View className='example-item' style={css('example-item')}>
              <View className='demo-btn' style={css('demo-btn')} onClick={() => handleActionSheetClick(1)}>无标题 ActionSheet</View>
            </View>

            {/* 含标题 */}
            <View className='example-item' style={css('example-item')}>
              <View className='demo-btn' style={css('demo-btn')} onClick={() => handleActionSheetClick(2)}>含标题 ActionSheet</View>
            </View>

            {/* 自定义选项 */}
            <View className='example-item' style={css('example-item')}>
              <View className='demo-btn' style={css('demo-btn')} onClick={() => handleActionSheetClick(3)}>自定义选项 ActionSheet</View>
            </View>
          </View>
        </View>

        {/* Message */}
        <View className='panel' style={css('panel')}>
          <View className='panel__title' style={css('panel__title')}>Message 消息通知</View>
          <View className='panel__content' style={css('panel__content')}>
            <View className='example-item' style={css('example-item')}>
              {
                listMap(
                  [
                    <View className='demo-btn' style={css('demo-btn')} onClick={() => handleMessageClick('')}>普通提示</View>,
                    <View className='demo-btn' style={css('demo-btn')} onClick={() => handleMessageClick('success')}>成功提示</View>,
                    <View className='demo-btn' style={css('demo-btn')} onClick={() => handleMessageClick('error')}>错误提示</View>,
                  ],
                  (item, index) => <View className='subitem' style={css('subitem')} key={index}>{item}</View>
                )
              }
            </View>
            <View className='example-item' style={css('example-item')}>
              {
                listMap(
                  [
                    <View className='demo-btn' style={css('demo-btn')} onClick={() => handleMessageClick('warning')}>警告提示</View>,
                    <View className='demo-btn' style={css('demo-btn')} onClick={() => handleMessageClick('info')}>提示消息</View>
                  ],
                  (item, index) => <View className='subitem' style={css('subitem')} key={index}>{item}</View>
                )
              }
            </View>
          </View>
        </View>

        {/* Modal */}
        <View className='panel' style={css('panel')}>
          <View className='panel__title' style={css('panel__title')}>Modal 模态框</View>
          <View className='panel__content' style={css('panel__content')}>
            {/* 基础模态框 */}
            <View className='example-item' style={css('example-item')}>
              <View className='demo-btn' style={css('demo-btn')} onClick={() => handleModalClick(1)}>打开基础模态框</View>
            </View>

            {/* 单个按钮 */}
            <View className='example-item' style={css('example-item')}>
              <View className='demo-btn' style={css('demo-btn')} onClick={() => handleModalClick(2)}>打开单个按钮模态框</View>
            </View>

            {/* 无标题 */}
            <View className='example-item' style={css('example-item')}>
              <View className='demo-btn' style={css('demo-btn')} onClick={() => handleModalClick(3)}>打开无标题模态框</View>
            </View>

            {/* 简化使用 */}
            <View className='example-item' style={css('example-item')}>
              <View className='demo-btn' style={css('demo-btn')} onClick={() => handleModalClick(3)}>打开简化使用模态框</View>
            </View>
          </View>
        </View>

        {/* Toast */}
        <View className='panel' style={css('panel')}>
          <View className='panel__title' style={css('panel__title')}>Toast 轻提示</View>
          <View className='panel__content' style={css('panel__content')}>
            <View className='example-item' style={css('example-item')}>
              <View className='demo-btn' style={css('demo-btn')} onClick={() => handleToastClick('文本内容', '', '', false, '')}>文本 Toast</View>
            </View>
            <View className='example-item' style={css('example-item')}>
              <View className='demo-btn' style={css('demo-btn')} onClick={() => handleToastClick('文本内容', 'analytics', '', false, '')}>文本 + ICON</View>
            </View>
            <View className='example-item' style={css('example-item')}>
              <View className='demo-btn' style={css('demo-btn')} onClick={() => handleToastClick('凹凸实验室', '', 'http://storage.360buyimg.com/mtd/home/group-21533885306540.png', false, '')}>自定义图片 Toast</View>
            </View>
            <View className='example-item' style={css('example-item')}>
              <View className='demo-btn' style={css('demo-btn')} onClick={() => handleToastClick('文本内透明遮罩层的作用在于不可点击下面的元素容', '', '', true, '')}>添加遮罩层 Toast</View>
            </View>
            <View className='example-item' style={css('example-item')}>
              <View className='demo-btn' style={css('demo-btn')} onClick={() => handleToastClick('错误提示', '', '', true, 'error')}>错误提示 Toast</View>
            </View>
            <View className='example-item' style={css('example-item')}>
              <View className='demo-btn' style={css('demo-btn')} onClick={() => handleToastClick('正确提示', '', '', true, 'success')}>正确提示 Toast</View>
            </View>
            <View className='example-item' style={css('example-item')}>
              <View className='demo-btn' style={css('demo-btn')} onClick={() => handleToastClick('正在加载…', '', '', true, 'loading')}>加载中 Toast</View>
            </View>
          </View>
        </View>

        {/* Progress */}
        <View className='panel' style={css('panel')}>
          <View className='panel__title' style={css('panel__title')}>Progress 进度条</View>
          {/* 基础进度条 */}
          <View className='panel__content panel__content--progress' style={css('panel__content', 'panel__content--progress')}>
            <View className='example-item__desc' style={css('example-item__desc')}>基础进度条</View>
            <View className='example-item' style={css('example-item')}>
              <AtProgress percent={25} />
            </View>
            <View className='example-item' style={css('example-item')}>
              <AtProgress percent={50} />
            </View>
            <View className='example-item' style={css('example-item')}>
              <AtProgress percent={75} />
            </View>
          </View>

          {/* 隐藏进度文案 */}
          <View className='panel__content panel__content--progress' style={css('panel__content', 'panel__content--progress')}>
            <View className='example-item__desc' style={css('example-item__desc')}>隐藏进度文案</View>
            <View className='example-item' style={css('example-item')}>
              <AtProgress percent={25} isHidePercent />
            </View>
            <View className='example-item' style={css('example-item')}>
              <AtProgress percent={75} isHidePercent />
            </View>
          </View>

          {/* 不同的状态 */}
          <View className='panel__content panel__content--progress' style={css('panel__content', 'panel__content--progress')}>
            <View className='example-item__desc' style={css('example-item__desc')}>不同的状态</View>
            <View className='example-item' style={css('example-item')}>
              <View className='example-item__desc' style={css('example-item__desc')}>暂停</View>
              <AtProgress percent={25} />
            </View>
            <View className='example-item' style={css('example-item')}>
              <View className='example-item__desc' style={css('example-item__desc')}>进行中</View>
              <AtProgress percent={50} status='progress' />
            </View>
            <View className='example-item' style={css('example-item')}>
              <View className='example-item__desc' style={css('example-item__desc')}>错误</View>
              <AtProgress percent={75} status='error' />
            </View>
            <View className='example-item' style={css('example-item')}>
              <View className='example-item__desc' style={css('example-item__desc')}>已完成</View>
              <AtProgress percent={100} status='success' />
            </View>
          </View>
        </View>

        {/* SwipeAction */}
        <View className='panel' style={css('panel')}>
          <View className='panel__title' style={css('panel__title')}>SwipeAction 滑动操作</View>
          <View className='panel__content' style={css('panel__content')}>
            <View className='example-item example-item--border' style={css('example-item', 'example-item--border')}>
              <AtSwipeAction onClick={handleSwipeClick} options={OPTIONS}>
                <View className='normal' style={css('normal')}>AtSwipeAction 一般使用场景</View>
              </AtSwipeAction>
            </View>
          </View>
        </View>

        {/* Activity Indicator */}
        <View className='panel' style={css('panel')}>
          <View className='panel__title' style={css('panel__title')}>Activity Indicator 活动指示器</View>
          <View className='panel__content' style={css('panel__content')}>
            {/* 自定义尺寸 */}
            <View className='example-item' style={css('example-item')}>
              <View className='subitem' style={css('subitem')}>
                <AtActivityIndicator size={20} ></AtActivityIndicator>
              </View>
              <View className='subitem' style={css('subitem')}>
                <AtActivityIndicator size={24} />
              </View>
              <View className='subitem' style={css('subitem')}>
                <AtActivityIndicator size={32} />
              </View>
            </View>

            {/* 自定义颜色 */}
            <View className='example-item' style={css('example-item')}>
              <View className='subitem' style={css('subitem')}>
                <AtActivityIndicator color='#13CE66' />
              </View>
              <View className='subitem' style={css('subitem')}>
                <AtActivityIndicator color='#FF4949' />
              </View>
              <View className='subitem' style={css('subitem')}>
                <AtActivityIndicator color='#C9C9C9' />
              </View>
            </View>

            {/* 垂直水平居中 */}
            <View className='example-item indicator-panel' style={css('example-item', 'indicator-panel')}>
              <AtActivityIndicator mode='center' />
            </View>
            <View className='example-item indicator-panel' style={css('example-item', 'indicator-panel')}>
              <AtActivityIndicator mode='center' content='Loading...' />
            </View>
          </View>
        </View>

      </View>
      {/* E Body */}

      <AtActionSheet
        cancelText='取消'
        isOpened={state.isActionSheetOpened1}
        onClose={() => handleActionSheetClose(1)}
      >
        <AtActionSheetItem
          onClick={() => showToast('点击了按钮一')}
        >
          按钮一
        </AtActionSheetItem>
        <AtActionSheetItem
          onClick={() => showToast('点击了按钮二')}
        >
          按钮二
        </AtActionSheetItem>
      </AtActionSheet>

      <AtActionSheet
        cancelText='取消'
        isOpened={state.isActionSheetOpened2}
        onClose={() => handleActionSheetClose(2)}
        title='清除位置信息后， 别人将不能查看到你'
      >
        <AtActionSheetItem
          onClick={() => showToast('点击了按钮一')}
        >
          按钮一
        </AtActionSheetItem>
        <AtActionSheetItem
          onClick={() => showToast('点击了按钮二')}
        >
          按钮二
        </AtActionSheetItem>
      </AtActionSheet>

      <AtActionSheet
        cancelText='取消'
        isOpened={state.isActionSheetOpened3}
        onCancel={handleActionSheetCancel}
        onClose={() => handleActionSheetClose(3)}
        title='清除位置信息后， 别人将不能查看到你'
      >
        <AtActionSheetItem
          onClick={() => showToast('点击了按钮一')}
        >
          按钮一
        </AtActionSheetItem>
        <AtActionSheetItem
          onClick={() => showToast('点击了按钮二')}
        >
          按钮二
        </AtActionSheetItem>
        <AtActionSheetItem
          onClick={() => showToast('成功清除位置')}
        >
          <Text className='danger' style='color: #FF4949;'>清除位置信息并退出</Text>
        </AtActionSheetItem>
      </AtActionSheet>

      <AtMessage />

      {/* 基础模态框 */}
      <AtModal
        isOpened={state.isModalOpened1}
        onClose={() => closeModal(1, 'Modal被关闭了')}
      >
        <AtModalHeader>标题</AtModalHeader>
        <AtModalContent>
          <View className='modal-content'>
            这里是正文内容，欢迎加入京东凹凸实验室
            这里是正文内容，欢迎加入京东凹凸实验室
            这里是正文内容，欢迎加入京东凹凸实验室
          </View>
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => closeModal(1, '点击了取消')}>
            取消
          </Button>
          <Button
            onClick={() => closeModal(1, '点击了确定')}
          >
            确定
          </Button>
        </AtModalAction>
      </AtModal>

      {/* 单个按钮 */}
      <AtModal
        isOpened={state.isModalOpened2}
        onClose={() => closeModal(2, 'Modal被关闭了')}
      >
        <AtModalHeader>标题</AtModalHeader>
        <AtModalContent>
          <View className='modal-content'>
            这里是正文内容，欢迎加入京东凹凸实验室
          </View>
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => closeModal(2, '点击了确定')}>
            确定
          </Button>
        </AtModalAction>
      </AtModal>

      {/* 无标题 */}
      <AtModal
        isOpened={state.isModalOpened3}
        onClose={() => closeModal(3, 'Modal被关闭了')}
      >
        <AtModalContent>
          <View className='modal-content'>
            这里是正文内容，欢迎加入京东凹凸实验室
            这里是正文内容，欢迎加入京东凹凸实验室
            这里是正文内容，欢迎加入京东凹凸实验室
          </View>
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => closeModal(3, '点击了取消')}>
            取消
          </Button>
          <Button
            onClick={() => closeModal(3, '点击了确定')}
          >
            确定
          </Button>
        </AtModalAction>
      </AtModal>

      {/* 简化使用 */}
      <AtModal
        isOpened={state.isModalOpened4}
        title='标题'
        cancelText='取消'
        confirmText='确认'
        content='欢迎加入京东凹凸实验室\n\r欢迎加入京东凹凸实验室'
        onClose={() => closeModal(4, 'Modal被关闭了')}
        onCancel={() => closeModal(4, '点击了取消')}
        onConfirm={() => closeModal(4, '点击了确认')}
      />

      <AtToast
        icon={state.icon}
        text={state.text}
        image={state.image}
        status={state.status}
        hasMask={state.hasMask}
        isOpened={state.isOpened}
        duration={state.duration}
        onClose={handleToastClose}
      />
    </View>
  );
});
