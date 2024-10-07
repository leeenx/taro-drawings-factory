import Taro from '@tarojs/taro';
import { Component } from 'react';
import taroComponents from './index.css';

const { View } = taroComponents;

export default class NavigatorBtn extends Component {
  handleGoto (webPackage, page) {
    if (webPackage && page) navigate(process.env.PUBLIC_PATH + webPackage, { page });
    else {
      Taro.showToast({ icon: 'error', title: '缺少参数: webPackage 或 page' });
    }
  }

  render () {
    const { webPackage, page } = this.props

    return (
      <View
        className='demo-goto-btn'
        onClick={this.handleGoto.bind(this, webPackage, page)}
      >
        查看详情
      </View>
    )
  }
}

NavigatorBtn.defaultProps = {
  webPackage: '',
  page: '',
}
