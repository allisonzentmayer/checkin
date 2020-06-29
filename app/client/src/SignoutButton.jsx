import React from 'react';

export class SignoutButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signingOut: false,
    }
    this.sleep = this.sleep.bind(this);
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async triggerSignOut(visitorId) {
    this.setState({signingOut: true});
    // to mock the api taking a second and show button state triggering a text and css change
    await this.sleep(1000);
    await this.props.signOutVisitor(visitorId);
    this.setState({signingOut: false});
  }

  signoutButton(visitorId) {
    return <button className={`btn btn--smaller btn--outline ${this.state.signingOut ? "processing" : ""}`}
    onClick={() => this.triggerSignOut(visitorId)}>{this.state.signingOut ? 'Signing out...' : 'Sign out'}</button>;
  }

  render() {
    const buttonClasses = `btn btn--smaller btn--outline ${this.state.signingOut ? "signing-out" : ""}`;
    const signOutButtonText = this.state.signingOut ? 'Signing out...' : 'Sign out';
    return (
        <button className={buttonClasses} onClick={() => this.triggerSignOut(this.props.visitorId)}>{signOutButtonText}</button>
    );
  }
}


