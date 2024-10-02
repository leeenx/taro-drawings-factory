import React, {memo, useEffect} from "react";
import { View, Image } from '@tarojs/components';
import { setPageTitle } from "../../../utils";
import { AtButton } from 'taro-ui'
import DocHeader from "../../../components/doc-header";
import { listMap, rem } from "../../../utils";

import css from './index.css';

export default memo(() => {

  useEffect(() => {
    setPageTitle('Taro UI')
  }, []);

  return (
    <View className="page" style={css('page')}>
      <DocHeader title='基础' desc='1 个组件' />
      <View className='doc-body' style={css('doc-body')}>
          {/* Button */}
          <View className='panel' style={css('panel')}>
            <View className='panel__title' style={css('panel__title')}>Button 按钮</View>
            {/* 主操作 */}
            <View className='panel__content' style={css('panel__content')}>
              <View className='example-item' style={css('example-item')}>
                <View className='example-item__desc' style={css('example-item__desc')}>主操作</View>
                {
                  listMap(
                    [
                      <AtButton type='primary'>主操作按钮</AtButton>,
                      <AtButton type='primary' loading>Loading</AtButton>,
                      <AtButton type='primary' disabled>不可操作</AtButton>
                    ],
                    (item, index) => {
                      return <View className='btn-item' style={css('btn-item')} key={index}>{item}</View>;
                    }
                  )
                }
              </View>
            </View>

            {/* 次要操作 */}
            <View className='panel__content' style={css('panel__content')}>
              <View className='example-item' style={css('example-item')}>
                <View className='example-item__desc' style={css('example-item__desc')}>次要操作</View>
                {
                  listMap(
                    [
                      <AtButton type='secondary'>次操作按钮</AtButton>,
                      <AtButton type='secondary' loading>Loading</AtButton>,
                      <AtButton type='secondary' disabled>不可操作</AtButton>,
                    ],
                    (item, index) => {
                      return <View className='btn-item' style={css('btn-item')} key={index}>{item}</View>;
                    }
                  )
                }
              </View>
            </View>


            {/* 次次要操作 */}
            <View className='panel__content' style={css('panel__content')}>
              <View className='example-item' style={css('example-item')}>
                <View className='example-item__desc' style={css('example-item__desc')}>次次要操作</View>
                {
                  listMap(
                    [
                      <AtButton>次次要操作按钮</AtButton>,
                      <AtButton loading>Loading</AtButton>,
                      <AtButton disabled>不可操作</AtButton>
                    ],
                    (item, index) => {
                      return <View className='btn-item' style={css('btn-item')} key={index}>{item}</View>
                    }
                  )
                }
              </View>
            </View>

            {/* 小按钮 */}
            <View className='panel__content' style={css('panel__content')}>
              <View className='example-item' style={css('example-item')}>
                <View className='example-item__desc' style={css('example-item__desc')}>小按钮</View>

                <View className='btn-item' style={css('btn-item')}>
                  {
                    listMap(
                      [
                        <AtButton type='primary' size='small'>按钮</AtButton>,
                        <AtButton type='secondary' size='small'>按钮</AtButton>,
                        <AtButton size='small'>按钮</AtButton>,
                      ],
                      (item, index) => {
                        return <View className='subitem' style={css('subitem')} key={index}>{item}</View>
                      }
                    )
                  }
                </View>
                <View className='btn-item' style={css('btn-item')}>
                  {
                    listMap(
                      [
                        <AtButton type='primary' size='small' loading></AtButton>,
                        <AtButton type='secondary' size='small' loading></AtButton>,
                        <AtButton size='small' loading></AtButton>,
                      ],
                      (item, index) => {
                        return <View className='subitem' style={css('subitem')} key={index}>{item}</View>
                      }
                    )
                  }
                </View>
                <View className='btn-item' style={css('btn-item')}>
                  {
                    listMap(
                      [
                        <AtButton type='primary' size='small' disabled>按钮</AtButton>,
                        <AtButton type='secondary' size='small' disabled>按钮</AtButton>,
                        <AtButton size='small' disabled>按钮</AtButton>,
                      ],
                      (item, index) => {
                        return <View className='subitem' style={css('subitem')} key={index}>{item}</View>
                      }
                    )
                  }
                </View>
              </View>
            </View>

            {/* 圆角按钮 */}
            <View className='panel__content' style={css('panel__content')}>
              <View className='example-item' style={css('example-item')}>
                <View className='example-item__desc' style={css('example-item__desc')}>圆角按钮</View>
                <View className='btn-item' style={css('btn-item')}>
                  {
                    listMap(
                      [
                        <AtButton type='primary' size='small' circle>按钮</AtButton>,
                        <AtButton type='secondary' size='small' circle>按钮</AtButton>,
                        <AtButton size='small' circle>按钮</AtButton>,
                      ],
                      (item, index) => {
                        return <View className='subitem' style={css('subitem')} key={index}>{item}</View>
                      }
                    )
                  }
                </View>
                <View className='btn-item' style={css('btn-item')}>
                  {
                    listMap(
                      [
                        <AtButton type='primary' size='small' loading circle></AtButton>,
                        <AtButton type='secondary' size='small' loading circle></AtButton>,
                        <AtButton size='small' loading circle></AtButton>,
                      ],
                      (item, index) => {
                        return <View className='subitem' style={css('subitem')} key={index}>{item}</View>
                      }
                    )
                  }
                </View>
                <View className='btn-item' style={css('btn-item')}>
                  {
                    listMap(
                      [
                        <AtButton type='primary' size='small' disabled circle>按钮</AtButton>,
                        <AtButton type='secondary' size='small' disabled circle>按钮</AtButton>,
                        <AtButton size='small' disabled circle>按钮</AtButton>,
                      ],
                      (item, index) => {
                        return <View className='subitem' style={css('subitem')} key={index}>{item}</View>
                      }
                    )
                  }
                </View>
              </View>
            </View>

            {/* 通栏按钮 */}
            <View className='panel__content no-padding' style={css('panel__content', 'no-padding')}>
              <View className='example-item' style={css('example-item')}>
                <View className='example-item__desc' style={css('example-item__desc', { padding: `0 ${rem(60)}` })}>通栏按钮</View>
                  {
                    listMap(
                      [
                        <AtButton type='primary' full>主操作按钮</AtButton>,
                        <AtButton type='secondary' full>次操作按钮</AtButton>,
                        <AtButton full>次次要操作按钮</AtButton>,
                        <AtButton disabled full>不可操作</AtButton>,
                      ],
                      (item, index) => {
                        return <View className='btn-item' style={css('btn-item')} key={index}>{item}</View>
                      }
                    )
                  }
              </View>
            </View>

          </View>
        </View>
    </View>
  );
});
