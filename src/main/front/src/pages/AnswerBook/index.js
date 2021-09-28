import  React,{Component} from 'react';
import { NavBar } from 'antd-mobile';
import Category from './subpages/Category';
export default class Answerbook extends Component {
  render() {
    return (
      <div>
        <NavBar mode="light">Advice Book</NavBar>
        <Category></Category>
      </div>
    )
  }
}