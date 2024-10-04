import { memo, useEffect } from 'react';
import { AtIndexes } from 'taro-ui';
import mockData from './mock-data';
import { setPageTitle } from '~/utils';
import components from './index.css';

const { View } = components;

export default memo(() => {
  useEffect(() => {
    setPageTitle('Taro UI');
  }, []);

  const handleClick = (item) => {
    console.log(item)
  };

  return (
    <View className='page' style={{ height: '100vh' }}>
      {/* 基础用法 */}
      <View style={{ height: '100%' }}>
        <AtIndexes
          list={mockData}
          topKey='Top'
          onClick={handleClick}
        >
          <View className='custom-area'>用户自定义内容</View>
        </AtIndexes>
      </View>
    </View>
  );
});
