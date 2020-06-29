import React from 'react';
import moment from 'moment';
import { SignoutButton } from './SignoutButton.jsx';

export class VisitorList extends React.Component {
  visitorRow(visitor) {
    let name = `${visitor.first_name} ${visitor.last_name}`;
    let signedOutDate = moment(visitor.signed_out).format('MMMM Do YYYY, h:mm:ss a');
    let signOutElement = visitor.signed_out ? signedOutDate : <SignoutButton signOutVisitor={this.props.signOutVisitor} visitorId={visitor.id}/>;
    return (
      <tr key={visitor.id}>
        <td className="p-2 border-t border-grey-light font-mono text-xs">{name}</td>
        <td className="p-2 border-t border-grey-light font-mono text-xs">{visitor.notes}</td>
        <td className="p-1 border-t border-grey-light font-mono text-xs">{signOutElement}</td>
      </tr>
    );
  }

  render() {
    let visitorsList = this.props.visitors.map((visitor) => {
      return this.visitorRow(visitor);
    });

    return (
      <div className="flex-grow h-screen overflow-y-scroll">
    
          <div className="mx-auto">
    
            <div className="mt-8">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Name</th>
                    <th className="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Notes</th>
                    <th className="text-sm font-semibold text-grey-darker p-1 bg-grey-lightest">Signed out</th>
                  </tr>
                </thead>
                <tbody className="align-baseline">
                  {visitorsList}
                </tbody>
              </table>
          </div>
        </div>
      </div>
    );
  }
}


