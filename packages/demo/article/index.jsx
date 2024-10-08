import React, { memo, useEffect } from 'react';
import { View, Image } from '@tarojs/components';
import { setPageTitle } from '~/utils';
import css from './index.css';

export default memo(() => {

  useEffect(() => {
    setPageTitle('Article');
  }, []);

  return (
    <View className='page'>
      {/* S Body */}
      <View className='doc-body' style={css('doc-body')}>
        <View className='at-article' style={css('at-article')}>
          <View className='at-article__h1' style={css('at-article__h1')}>这是一级标题这是一级标题</View>
          <View className='at-article__info' style={css('at-article__info')}>2017-05-07&nbsp;&nbsp;&nbsp;这是作者</View>
          <View className='at-article__content' style={css('at-article__content')}>
            <View className='at-article__section' style={css('at-article__content')}>
              <View className='at-article__h2' style={css('at-article__h2')}>这是二级标题</View>
              <View className='at-article__h3' style={css('at-article__h3')}>这是三级标题</View>
              <View className='at-article__p' style={css('at-article__p')}>这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。1234567890123456789012345678901234567890 ABCDEFGHIJKLMNOPQRSTUVWXYZ</View>
              <View className='at-article__p' style={css('at-article__p')}>这是文本段落。这是文本段落。</View>
              <Image className='at-article__img' style={css('at-article__img')} src='http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg' mode='widthFix' />
            </View>

            <View className='at-article__section' style={css('at-article__content')}>
              <View className='at-article__h2' style={css('at-article__h2')}>这是二级标题</View>
              <View className='at-article__h3' style={css('at-article__h3')}>这是三级标题</View>
              <View className='at-article__p' style={css('at-article__p')}>这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。1234567890123456789012345678901234567890 ABCDEFGHIJKLMNOPQRSTUVWXYZ</View>
              <Image className='at-article__img' style={css('at-article__img')} src='https://img30.360buyimg.com/sku/jfs/t19660/324/841553494/117886/ad2742c1/5aab8d20Ne56ae3bf.jpg' mode='widthFix' />
            </View>
          </View>
        </View>
      </View>
      {/* E Body */}
    </View>
  );
});
