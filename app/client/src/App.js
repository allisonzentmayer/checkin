import React from 'react';
import axios from 'axios';
// import logo from './logo.svg';
import './App.scss';
import { VisitorList } from './components/VisitorList.jsx';
import { AddVisitorModal } from './components/AddVisitorModal.jsx';

const apiUrl = 'http://localhost:8000';  

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: 'Cool Chip',
      visitors: [],
      shouldShowModal: false,      
    };
    this.getVisitors = this.getVisitors.bind(this);
    this.signOutVisitor = this.signOutVisitor.bind(this);  
    this.showModal = this.showModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.getVisitors();
  }

  async getVisitors() {
    await axios.get(`${apiUrl}/entries`)
    .then((res) => {
      this.setState({visitors: res.data});
    }, (error) => { console.log(error) });
  };

  async signOutVisitor(visitorId) {
    console.log(visitorId);
    await axios.post(`${apiUrl}/visitor/${visitorId}/signout`)
      .then((res) => {
        this.getVisitors();
      }, (error) => { console.log(error) });
  }

  showModal() {
    console.log('showModal');
    this.setState({shouldShowModal: true});
  }

  handleClose(shouldGetVisitors = false) {
    this.setState({shouldShowModal: false});
    this.getVisitors();
  }

  render() {
  return (
    <div className="container mx-auto mt-12 p-8 border  min-h-screen max-w-3xl">
      <div className="clearfix">
        <button className="btn  btn--brand float-right ml-2" onClick={this.showModal}><i className="fas fa-user p-r-15"></i>New visitor</button>
        {/* <input type="text" class="p-2 text-sm border float-right max-w-xs w-full" placeholder="Search"/> */}
        <img src="https://dashboard.envoy.com/assets/images/logo-small-red-ba0cf4a025dd5296cf6e002e28ad38be.svg" alt="Envoy Logo" width="31" className="py3 block"/>
      </div>
      <p className="page-title" >Welcome to {this.state.companyName}!</p>
      <AddVisitorModal shouldShowModal={this.state.shouldShowModal} handleClose={this.handleClose}/>
      <VisitorList visitors={this.state.visitors} signOutVisitor={this.signOutVisitor}/>
    </div>
  )};
}

export default App;
