import  React,{Component} from 'react';
import { NavBar, Icon } from 'antd-mobile';
import Category from './subpages/Category';
export default class Answerbook extends Component {
  render() {
    return (
      <div>
        <NavBar mode="light">Answer Book</NavBar>
        <Category></Category>
      </div>
    )
  }
}