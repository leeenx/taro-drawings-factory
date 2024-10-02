import { memo, useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Picker, PickerView, PickerViewColumn } from '@tarojs/components';
import {
  AtCheckbox,
  AtImagePicker,
  AtInput,
  AtInputNumber,
  AtForm,
  AtRadio,
  AtRange,
  AtRate,
  AtSearchBar,
  AtSlider,
  AtSwitch,
  AtTextarea,
} from 'taro-ui';
import { useMemoizedFn } from 'ahooks';
import DocHeader from "../../../components/doc-header";
import { rem, setPageTitle } from '../../../utils';

import css from './index.css.ts';

const getYearsMonthsDays = () => {
  const date = new Date()
  const years = []
  const months = []
  const days = []
  const year = date.getFullYear();
  for (let i = 1990; i <= year; i++) {
    years.push(i)
  }
  for (let i = 1; i <= 12; i++) {
    months.push(i)
  }
  for (let i = 1; i <= 31; i++) {
    days.push(i)
  }
  return { year, years, months, days };
};

export default memo(() => {
  const [state, updateState] = useState({
    checkedList: ['list1', 'list4'],
    checkboxOption: [
      { value: 'list1', label: 'iPhone X', desc: '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。' },
      { value: 'list2', label: 'HUAWEI P20' },
      { value: 'list3', label: 'OPPO Find X', desc: '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。', disabled: true },
      { value: 'list4', label: 'vivo NEX', desc: '部分地区提供电子普通发票，用户可自行打印，效力等同纸质普通发票，具体以实际出具的发票类型为准。', disabled: true }
    ],
    files: [
      {
        url: 'https://storage.360buyimg.com/mtd/home/111543234387022.jpg'
      },
      {
        url: 'https://storage.360buyimg.com/mtd/home/221543234387016.jpg'
      },
      {
        url: 'https://storage.360buyimg.com/mtd/home/331543234387025.jpg'
      }
    ],
    inputValue1: '',
    inputValue2: '',
    inputValue3: '',
    inputNumber1: 1,
    inputNumber2: 1,
    inputNumber3: 1,
    selector: ['中国', '美国', '巴西', '日本'],
    selectorValue: 0,
    ...getYearsMonthsDays(),
    month: 2,
    day: 2,
    value: [9999, 5, 17],
    isWeapp: false,
    radioOptions: [
      { label: '单选项一', value: 'option1', desc: '单选项描述' },
      { label: '单选项二', value: 'option2' },
      { label: '单选项三禁用', value: 'option3', desc: '单选项描述', disabled: true }
    ],
    radioValue: 'option1',
    rangeValue: [20, 60],
    rateValue: 3,
    searchbarValue: '',
    switchValue: false,
    textareaValue: '',
  });

  const setState = useMemoizedFn((nextState) => {
    updateState(Object.assign({}, state, nextState));
  });

  useEffect(() => {
    setPageTitle('Taro UI');
    const env = Taro.getEnv()
    setState({
      isWeapp: env === Taro.ENV_TYPE.WEAPP,
      isAlipay: env === Taro.ENV_TYPE.ALIPAY,
    })
  }, []);

  const handleCheckboxChange = useMemoizedFn((value) => {
    setState({
      checkedList: value
    });
  });

  const handleImageChange = useMemoizedFn((stateName, files) => {
    setState({
      [stateName]: files
    });
  });

  const handleInput = useMemoizedFn((stateName, value) => {
    setState({
      [stateName]: value
    });
  });

  const handleNumberChange = useMemoizedFn((stateName, value) => {
    setState({
      [stateName]: value
    });
  });

  const handlePickerChange = useMemoizedFn((e) => {
    setState({
      selectorValue: e.detail.value
    });
  });

  const handlePickerViewChange = useMemoizedFn((e) => {
    const val = e.detail.value;
    setState({
      year: state.years[val[0]],
      month: state.months[val[1]],
      day: state.days[val[2]],
      value: val
    });
  });

  const handleRadioChange = useMemoizedFn((value) => {
    setState({
      radioValue: value
    });
  });

  const handleRangeChange = useMemoizedFn((stateName, value) => {
    setState({
      [stateName]: value
    });
  });

  const handleRateChange = useMemoizedFn((stateName, value) => {
    setState({
      [stateName]: value
    });
  });

  const handleSearchBarChange = useMemoizedFn((stateName, value) => {
    setState({
      [stateName]: value
    });
  });

  const onActionClick = useMemoizedFn(() => {
    Taro.showToast({
      title: '开始搜索',
      icon: 'success',
      duration: 2000
    });
  });

  const handleSwitchChange = useMemoizedFn((value) => {
    setState({
      switchValue: value
    });
  });

  const handleTextareaChange = useMemoizedFn((stateName, value) => {
    setState({
      [stateName]: value
    });
  });

  const { years, months, days, value, year, month, day, isWeapp, isAlipay } = state

  return (
    <View className='page' style={css('page')}>
      {/* S Header */}
      <DocHeader title='数据录入' desc='12 个组件'></DocHeader>
      {/* E Header */}

      {/* S Body */}
      <View className='doc-body' style={css('doc-body')}>
        {/* Radio */}
        <View className='panel' style={css('panel')}>
          <View className='panel__title' style={css('panel__title')}>Radio 单选框</View>
          <View className='panel__content no-padding' style={css('panel__content', 'no-padding')}>
            <View className='radio-container' style={css('radio-container')}>
              <AtRadio options={state.radioOptions} value={state.radioValue} onClick={handleRadioChange} />
            </View>
          </View>
        </View>

        {/* Checkbox */}
        <View className='panel' style={css('panel')}>
          <View className='panel__title' style={css('panel__title')}>Checkbox 复选框</View>
          <View className='panel__content no-padding' style={css('panel__content', 'no-padding')}>
            <View className='example-item' style={css('example-item')}>
              <View className='checkbox-container' style={css('checkbox-container')}>
                <AtCheckbox
                  options={state.checkboxOption}
                  selectedList={state.checkedList}
                  onChange={handleCheckboxChange}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Switch */}
        <View className='panel' style={css('panel')}>
          <View className='panel__title' style={css('panel__title')}>Switch 开关</View>
          <View className='panel__content no-padding' style={css('panel__content', 'no-padding')}>
            <View className='example-item' style={css('example-item')}>
              <AtForm>
                <AtSwitch title='开启中' color='#EC585A' checked={state.switchValue} onChange={handleSwitchChange} />
                <AtSwitch title='已关闭' color='#EC585A' border={false} />
              </AtForm>
            </View>
          </View>
        </View>

        {/* Input */}
        <View className='panel' style={css('panel')}>
          <View className='panel__title' style={css('panel__title')}>Input 输入框</View>
          <View className='panel__content no-padding' style={css('panel__content', 'no-padding')}>
            <View className='component-item' style={css('component-item')}>
              <AtForm>
                <AtInput name='inputValue1' title='标准五个字' type='text' placeholder='标准五个字' value={state.inputValue1} onChange={(value) => handleInput('inputValue1', value)} />
                <AtInput name='inputValue2' title='标题实在特别长就换行' placeholder='其他列保持正常间距' value={state.inputValue2} onChange={(value) => handleInput('inputValue2', value)} />
                <AtInput name='inputValue3' border={false} placeholder='无标题' value={state.inputValue3} onChange={(value) => handleInput('inputValue3', value)} />
              </AtForm>
            </View>
          </View>
        </View>

        {/* Textarea */}
        <View className='panel' style={css('panel')}>
          <View className='panel__title' style={css('panel__title')}>Textarea 多行文本框</View>
          <View className='panel__content' style={css('panel__content')}>
            <View className='example-item' style={css('example-item')}>
              <AtTextarea
                value={state.textareaValue}
                onChange={(value) => handleTextareaChange('textareaValue', value)}
                maxLength={200}
                placeholder='你的问题是...'
              />
            </View>
          </View>
        </View>

        {/* SearchBar */}
        <View className='panel' style={css('panel')}>
          <View className='panel__title' style={css('panel__title')}>SearchBar 搜索栏</View>
          <View className='panel__content no-padding' style={css('panel__content', 'no-padding')}>
            <View className='component-item' style={css('component-item')}>
              <AtSearchBar
                value={state.searchbarValue}
                onChange={(value) => handleSearchBarChange('searchbarValue', value)}
                onActionClick={onActionClick}
              />
            </View>
          </View>
        </View>

        {/* InputNumber */}
        <View className='panel' style={css('panel')}>
          <View className='panel__title' style={css('panel__title')}>InputNumber 数字输入框</View>
          <View className='panel__content' style={css('panel__content')}>
            {/* 基本用法 */}
            <View className='example-item' style={css('example-item')}>
              <View className='example-item__desc' style={css('example-item__desc')}>min=0, max=10, step=1</View>
              <AtInputNumber
                min={0}
                max={10}
                step={1}
                value={state.inputNumber1}
                onChange={(value) => handleNumberChange('inputNumber1', value)}
              />
            </View>

            {/* 禁用 */}
            <View className='example-item' style={css('example-item')}>
              <View className='example-item__desc' style={css('example-item__desc')}>禁用</View>
              <AtInputNumber
                disabled
                min={0}
                max={10}
                step={1}
                value={state.inputNumber2}
                onChange={(value) => handleNumberChange('inputNumber2', value)}
              />
            </View>

            {/* 大尺寸 */}
            <View className='example-item' style={css('example-item')}>
              <View className='example-item__desc' style={css('example-item__desc')}>大尺寸</View>
              <AtInputNumber
                size='large'
                min={0}
                max={10}
                step={1}
                value={state.inputNumber3}
                onChange={(value) => handleNumberChange('inputNumber3', value)}
              />
            </View>
          </View>
        </View>

        {/* Range */}
        <View className='panel' style={css('panel')}>
          <View className='panel__title' style={css('panel__title')}>Range 范围选择器</View>
          <View className='panel__content' style={css('panel__content')}>
            <View className='example-item' style={css('example-item')}>
              <View className='example-item__desc' style={css('example-item__desc')}>
                数值范围：{state.rangeValue[0]}~{state.rangeValue[1]}
              </View>
              <AtRange
                value={[20, 60]}
                onChange={(value) => handleRangeChange('rangeValue', value)}
              />
            </View>
          </View>
        </View>

        {/* Slider */}
        <View className='panel' style={css('panel')}>
          <View className='panel__title' style={css('panel__title')}>Slider 滑动条</View>
          <View className='panel__content' style={css('panel__content')}>
            <View className='example-item' style={css('example-item')}>
              <View className='example-item__desc' style={css('example-item__desc')}>step=1</View>
              <AtSlider step={1} value={50} activeColor='#EC585A'></AtSlider>
            </View>
          </View>
        </View>

        {/* Rate */}
        <View className='panel' style={css('panel')}>
          <View className='panel__title' style={css('panel__title')}>Rate 评分</View>
          <View className='panel__content' style={css('panel__content')}>
            <View className='example-item' style={css('example-item')}>
              <AtRate value={state.rateValue} onChange={(value) => handleRateChange('rateValue', value)} />
            </View>
          </View>
        </View>

        {/* ImagePicker */}
        <View className='panel' style={css('panel')}>
          <View className='panel__title' style={css('panel__title')}>ImagePicker 图片选择器</View>
          <View className='panel__content no-padding' style={css('panel__content', 'no-padding')}>
            <View className='example-item' style={css('example-item')}>
              <AtImagePicker
                files={state.files}
                onChange={(files) => handleImageChange('files', files)}
              />
            </View>
          </View>
        </View>

        {/* Picker */}
        <View className='panel' style={css('panel')}>
          <View className='panel__title' style={css('panel__title')}>Picker 选择器</View>
          <View className='panel__content no-padding' style={css('panel__content', 'no-padding')}>
            <View className='example-item' style={css('example-item')}>
              <Picker mode='selector' range={state.selector} value={state.selectorValue} onChange={handlePickerChange}>
                <View className='demo-list-item' style={css('demo-list-item')}>
                  <View className='demo-list-item__label' style={css('demo-list-item__label')}>国家地区</View>
                  <View className='demo-list-item__value' style={css('demo-list-item__value')}>{state.selector[state.selectorValue]}</View>
                </View>
              </Picker>
            </View>
          </View>
        </View>

        {/* PickerView */}
        <View className='panel' style={css('panel')}>
          <View className='panel__title' style={css('panel__title')}>PickerView 滚动选择器</View>
          <View className='panel__content' style={css('panel__content')}>
            <View className='example-item' style={css('example-item')}>
              <View className='example-item__desc' style={css('example-item__desc')}>嵌入页面的滑动选择器</View>
              {
                isWeapp || isAlipay ? (
                  <View>
                    <View className='title-date' style={css('title-date')}>{year}年{month}月{day}日</View>
                    <PickerView
                      indicatorStyle='height: 50px;'
                      className='picker'
                      style={css('picker', {
                        width: '100%',
                        height: rem(300),
                        textAlign: 'center'
                      })}
                      value={value}
                      onChange={handlePickerViewChange}
                    >
                      <PickerViewColumn>
                        { years.map((item, idx) => <View key={idx} style='line-height: 50px'>{item}年</View>) }
                      </PickerViewColumn>
                      <PickerViewColumn>
                        { months.map((item, idx) => <View key={idx} style='line-height: 50px'>{item}月</View>) }
                      </PickerViewColumn>
                      <PickerViewColumn>
                        { days.map((item, idx) => <View key={idx} style='line-height: 50px'>{item}日</View>) }
                      </PickerViewColumn>
                    </PickerView>
                  </View>
                ) : <View className='title-date' style={css('title-date')}>暂时仅支持小程序</View>
              }
            </View>
          </View>
        </View>

      </View>
      {/* E Body */}
    </View>
  );
});
