import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import { BsPersonFill, BsPerson } from 'react-icons/bs';
import { AiOutlineHome, AiFillHome, AiOutlineMail,  AiFillMail} from "react-icons/ai";
import { IoBookOutline, IoBook } from "react-icons/io5";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import './index.less';

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          title: 'home',
          selectedIcon: <AiFillHome style={{fontSize: '1.5rem'}}/>,
          icon: <AiOutlineHome style={{fontSize: '1.5rem'}}/>,
          link: '/'
        },
        {
          title: 'LetterBox',
          selectedIcon: <AiFillMail style={{fontSize: '1.5rem'}}/>,
          icon: <AiOutlineMail style={{fontSize: '1.5rem'}}/>,
          link: '/letterbox',
          unread: this.props.unread,
        },
        {
            title: 'AdviceBook',
            selectedIcon: <IoBook style={{fontSize: '1.5rem'}}/>,
            icon: <IoBookOutline style={{fontSize: '1.5rem'}}/>,
            link: '/answerbook'
          },
        {
          title: 'User',
          selectedIcon: <BsPersonFill style={{fontSize: '1.5rem'}}/>,
          icon: <BsPerson style={{fontSize: '1.5rem'}}/>,
          link: '/user'
        },
      ]
    };
  }

  render() {
    const { show, pathname, history } = this.props;
    return (
      <div className='menu-bar'>
          <TabBar hidden={!show}>
            <TabBar.Item
              key='/'
              title='home'
              icon={<AiOutlineHome style={{fontSize: '1.5rem'}}/>}
              selectedIcon={<AiFillHome style={{fontSize: '1.5rem'}}/>}
              selected={pathname === '/'}
              onPress={() => history.push('/')}
            />
            <TabBar.Item
              key='LetterBox'
              title='LetterBox'
              badge={this.props.unread}
              icon={<AiOutlineMail style={{fontSize: '1.5rem'}}/>}
              selectedIcon={<AiFillMail style={{fontSize: '1.5rem'}}/>}
              selected={pathname === '/letterbox'}
              onPress={() => history.push('/letterbox')}
            />
            <TabBar.Item
              key='AdviceBook'
              title='AdviceBook'
              icon={<IoBookOutline style={{fontSize: '1.5rem'}}/>}
              selectedIcon={<IoBook style={{fontSize: '1.5rem'}}/>}
              selected={pathname === '/answerbook'}
              onPress={() => history.push('/answerbook')}
            />
            <TabBar.Item
              key='User'
              title='User'
              icon={<BsPerson style={{fontSize: '1.5rem'}}/>}
              selectedIcon={<BsPersonFill style={{fontSize: '1.5rem'}}/>}
              selected={pathname === '/user'}
              onPress={() => history.push('/user')}
            />
        </TabBar>




        {/* <TabBar hidden={!show}>
          {this.state.items.map(item => (
            <TabBar.Item
              key={item.link}
              title={item.title}
              icon={item.icon}
              
              selectedIcon={item.selectedIcon}
              selected={pathname === item.link}
              onPress={() => history.push(item.link)}
            />
          ))}
        </TabBar> */}
      </div>
    )
  }
}

Menu.defaultProps = {
  show: false,
  pathname: ''
};

Menu.propTypes = {
  show: PropTypes.bool,
  pathname: PropTypes.string
};


const mapStateToProps = (state) => {
	return {
        unread: state.letter.unread,
	};
};

export default connect(mapStateToProps)(withRouter(Menu));