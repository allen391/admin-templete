import React, { Component } from 'react'
import {Card, Button, Radio} from 'antd';
import './ui.less';

class Buttons extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       loading: true
    };
  };
  handleLoadingClick = () => {
    this.setState({
      loading: false
    })
  }
  render() {
    return (
      <div>
        <div className="card-wrap">
          <Card title="basic button">
            <Button type="primary">Immoc</Button>        
            <Button type="danger">Immoc</Button>
            <Button type="dashed">Immoc</Button>
            <Button>Immoc</Button>
            <Button disabled>Immoc</Button>
          </Card>
          <Card title="icon button">
            <Button icon="plus">create</Button>
            <Button icon="edit">edit</Button>
            <Button icon="delete">delete</Button>
            <Button shape="circle" icon="search"></Button>
            <Button type="primary" icon="search">search</Button>
            <Button type="primary" icon="download">download</Button>
          </Card>
          <Card title="loading button">
            <Button type="primary" loading={this.state.loading}>create</Button>
            <Button icon="edit" shape="circle" loading={this.state.loading} ></Button>
            <Button loading={this.state.loading}>delete</Button>
            <Button shape="circle" loading={this.state.loading}></Button>
            <Button type="primary" onClick={this.handleLoadingClick}>close</Button>
          </Card>
        </div>
        <Card title="group button">
          <Button.Group>
            <Button type="primary" icon="left">Back</Button>
            <Button type="primary" icon="right">Forward</Button>
          </Button.Group>
        </Card>
      </div>
    )
  }
}

export default Buttons
