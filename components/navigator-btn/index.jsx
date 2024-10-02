import Taro from '@tarojs/taro'
import { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import css from './index.css'

export default class NavigatorBtn extends Component {
  handleGoto (webPackage, page) {
    if (webPackage && page) navigate(webPackage, { page });
    Taro.showToast({ icon: 'error', title: '缺少参数: webPackage 或 page' });
  }

  render () {
    const { webPackage, page } = this.props

    return (
      <View
        className='demo-goto-btn'
        style={css('demo-goto-btn')}
        onClick={this.handleGoto.bind(this, webPackage, page)}
      >
        查看详情
        <View style={css('demo-goto-btn::after')}>→</View>
      </View>
    )
  }
}

NavigatorBtn.defaultProps = {
  webPackage: '',
  page: '',
}

NavigatorBtn.propTypes = {
  webPackage: PropTypes.string,
  page: PropTypes.string,
}
