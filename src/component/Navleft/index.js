import React, { Component } from 'react';
import {Menu} from 'antd';
import MenuConfig from '../../config/menuConfig';
import './index.less';
import {NavLink} from 'react-router-dom';

const SubMenu = Menu.SubMenu
const Item = Menu.Item
class NavLeft extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  componentWillMount(){
    console.log(MenuConfig)
    const menuTreeNode = this.renderMenu(MenuConfig)
    this.setState({menuTreeNode})
  }
  //菜单渲染
  renderMenu = (data) => {
    return data.map((item) => {
      if(item.children){
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Item title={item.title} key={item.key}>
        <NavLink to={item.key}>{item.title}</NavLink>
      </Item>
    })
  }
  render() {
    return (
      <div className="nav-left">
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt=""/>
          <h1>MoBike Admin</h1>
        </div>
        <Menu
          theme="dark"
        >
         {this.state.menuTreeNode}
        </Menu>
      </div>
    )
  }
}

export default NavLeft;
