import React from 'react';
import { View } from '@tarojs/components'

import css from './index.css';

interface Props {
  title: string;
  desc: string;
}

export default (props: Props) => {
  const { title = '标题', desc = '' } = props;

  return (
    <View className='doc-header' style={css.header}>
      <View className='doc-header__title' style={css.title}>{title}</View>
      <View className='doc-header__desc' style={css.desc}>{desc}</View>
      <View style={css.headerAfter} />
    </View>
  )
}
