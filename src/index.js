import React from "react";
import ReactDOM from "react-dom/client";
import SeasonDisplay from "./components/SeasonDisplay";
import Spinner from "./components/Spinner";
import "./style/App.css";

class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })
    );
  }

  renderContent() {
    console.log(this.state);
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    return <Spinner message={"Please, accept location request."} />;
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}
const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(<App />);
