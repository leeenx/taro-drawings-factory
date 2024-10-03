import { memo, useEffect, useState } from 'react';
import { AtCalendar } from 'taro-ui';
import DocHeader from "~/components/doc-header";
import { useMemoizedFn } from 'ahooks';
import { setPageTitle } from '../../../utils';

import components from './index.css';

const { View } = components;

export default memo(() => {
  useEffect(() => {
    setPageTitle('Taro UI');
  }, []);

  const [state, setState] = useState({
    multiCurentDate: {
      start: Date.now()
    }
  });

  const handleClick = useMemoizedFn((key, value) => {
    setState({ ...state, [key]: value });
  })

  return (
    <View className='page'>
      {/* S Header */}
      <DocHeader title='高阶' desc='日历组件'></DocHeader>
      {/* E Header */}

      {/* S Body */}
      <View className='doc-body'>
        {/* Calendar */}
        <View className='panel'>
          <View className='panel__title'>Calendar 日历</View>
          <View className='panel__content'>
            {/* 一般案例 */}
            <View className='example-item example-item--calendar'>
              <View className='example-item__desc'>一般案例</View>
              <AtCalendar />
            </View>

            {/* 范围选择 */}
            <View className='example-item example-item--calendar'>
              <View className='example-item__desc'>范围选择</View>
              <AtCalendar isMultiSelect currentDate={state.multiCurentDate} />
            </View>

            <View className='example-item'>
              <View
                className='demo-btn'
                onClick={() => handleClick('multiCurentDate', {
                  start: '2018/10/28',
                  end: '2018/11/11'
                })}
              >设置选择区间为 2018/10/28 - 2018/11/11</View>
            </View>
          </View>
        </View>
      </View>
      {/* E Body */}
    </View>
  );
});
