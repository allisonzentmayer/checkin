import React from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:8000';  

export class AddVisitorModal extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          formValues: {}
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleClose = this.handleClose.bind(this);
  }

  handleChange(event) {
      event.preventDefault();
      let formValues = this.state.formValues;
      let name = event.target.name;
      let value = event.target.value;

      formValues[name] = value;

      this.setState({formValues});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.formValues);
    axios.post(`${apiUrl}/entries`, this.state.formValues)
    .then((res) => {
    console.log(res);
    this.props.handleClose();
    }, (error) => { console.log(error) });
  }

  handleClose(event) {
      event.preventDefault();
      this.props.handleClose();
  }

  render(){
    const showHideClassName = this.props.shouldShowModal ? "modal display-block" : "modal display-none";

    return (
      <div className={showHideClassName}>
        <form>
          <div className="modal-main">
            <div className="section-title">Sign in new visitor</div>
            <div>
                <label className="input-label">First name:</label>
                <input type="text" name="firstName" placeholder="First name" value={this.state.formValues["firstName"]} onChange={this.handleChange.bind(this)} />
            </div>
            <div>
            <label className="input-label">Last name:</label>
                <input type="text" name="lastName" placeholder="Last name" value={this.state.formValues["lastName"]} onChange={this.handleChange.bind(this)}/>
            </div>
            <div>
                <label className="input-label">Notes:</label>
                <input type="textarea" name="notes" placeholder="Notes" value={this.state.formValues["notes"]} onChange={this.handleChange.bind(this)}/>
            </div>
            <input className="btn btn--brand btn-primary" type="submit" onClick={this.handleSubmit} value="Save" />
            <input className="btn btn--brand btn-primary" type="submit" onClick={this.handleClose} value="Cancel" />
          </div>
        </form>
      </div>
    )
  }
}