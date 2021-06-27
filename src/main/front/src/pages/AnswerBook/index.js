import  React,{Component} from 'react';
import { NavBar, Icon } from 'antd-mobile';

export default class Answerbook extends Component {
  render() {
    return (
      <div>
        <NavBar leftContent="返回"
                mode="light"
                onLeftClick={() => console.log('onLeftClick')}
                rightContent={[
        <Icon key="1" type="ellipsis" />,
      ]}
        >answerbook</NavBar>
      </div>
    )
  }
}