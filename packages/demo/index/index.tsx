import { useShareAppMessage } from '@tarojs/taro';
import { memo, useState } from "react";
import { View, Image } from '@tarojs/components';
import { useMemoizedFn } from "ahooks";

import LOGO_IMAGE from '~/assets/images/logo_taro.png';

import css from './index.css';

export default memo(() => {
  const [state] = useState({
    list: [
      {
        id: 'Basic',
        title: '基础',
        content: '按钮组件',
      },
      {
        id: 'View',
        title: '视图',
        content: '通告栏等8个组件',
      },
      {
        id: 'Feedback',
        title: '操作反馈',
        content: '对话框等7个组件',
      },
      {
        id: 'DataEntry',
        title: '数据录入',
        content: '输入框等13个组件',
      },
      {
        id: 'Layout',
        title: '布局',
        content: '列表等6个组件',
      },
      {
        id: 'Navigation',
        title: '导航',
        content: '标签栏等7个组件',
      }, {
        id: 'Advanced',
        title: '高阶',
        content: '日历组件',
      }
    ]
  });

  useShareAppMessage(() => {
    return {
      title: 'Taro UI',
      path: '/pages/index/index',
      imageUrl: 'http://storage.360buyimg.com/mtd/home/share1535013100318.jpg'
    }
  });

  const gotoPanel = useMemoizedFn(e => {
    const { id } = e.currentTarget.dataset;
    navigate(process.env.PUBLIC_PATH + '/demo/', { page: id });
  });

  const { list } = state;

  return (
    <View className='page page-index' style={css.page}>
      <View className='logo' style={css.logo}>
        <Image src={LOGO_IMAGE} className='img' mode='widthFix' style={css.logoImg} />
      </View>
      <View className='page-title' style={css.title}>Taro UI</View>
      <View className='module-list' style={css.list}>
        {list.map((item, index) => (
          <View
            className='module-list__item'
            key={index}
            data-id={item.id}
            data-name={item.title}
            onClick={gotoPanel}
            style={css.item}
          >
            <View className='module-list__item-title' style={css.itemTitle}>{item.title}</View>
            <View className='module-list__item-content' style={css.itemContent}>{item.content}</View>
            <View style={css.itemAfter} />
          </View>
        ))}
      </View>
    </View>
  );
});
