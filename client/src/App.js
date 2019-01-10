import React, { Component } from 'react';
import BillingForm from './components/billingForm';
import LocationList from './components/locationList';
import EmailAddress from './components/emailAddress';
import logo from './logo.png';
import './App.css';
import './bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ThankYou from './components/thankYou';
import locations from './locations2';
import ReactPixel from 'react-facebook-pixel';
import HeaderBanner from './components/landingpage/headerBanner';
import ReactGA from 'react-ga';
import BillingHotLink from './components/billingHotLink';
import LandingPage from './components/landingpage/index';

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }


  handleSubmit = async (x) => {
    this.setState({ error: false });
    await this.saveData(x);
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.data),
    });

    const status = await response.text();
    if(status === "Success") {
      this.nextSection();
      ReactPixel.track('Purchase', {
        'currency': 'USD',
        'value': 97.0
      });
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <Router>
        <div className="App">
            <HeaderBanner />
            <div id="logo-container">
              <img src={logo} alt="The Camp" />
            </div>
            {
              this.state.error ? <ErrorComponent /> : <span></span>
            }
            <Route path="/:id/landing" render={props => <LandingPage {...props} saveData={this.saveSiteID} locations={locations} initPixel={this.initPixel} /> } />
            <Route path="/:id/billing" render={ props => 
                      <BillingHotLink 
                        nextSection={this.nextSection}
                        saveEmailData={this.saveEmailData}
                        startCheckout={ReactPixel.track}
                        saveData={this.saveData}
                        handleSubmit={this.handleSubmit}
                        pixelView={ReactPixel.pageView} />} 
            />
        </div>
      </Router>
    );
  }
}

const ErrorComponent = () => (
  <div className="error">
    Unable to complete Purchase. Please Check Your Payment Details.
  </div>
);

export default App;