import taroComponents from './index.css';

const { View } = taroComponents;

interface Props {
  title: string;
  desc: string;
}

export default (props: Props) => {
  const { title = '标题', desc = '' } = props;

  return (
    <View className='doc-header'>
      <View className='doc-header__title'>{title}</View>
      <View className='doc-header__desc'>{desc}</View>
    </View>
  )
}
