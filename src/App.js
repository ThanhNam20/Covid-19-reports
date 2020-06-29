import React, { Component } from "react";

import Cards from "./components/Cards/Cards.jsx";
import Chart from "./components/Chart/Chart.jsx";
import CountryPicker from "./components/CountryPicker/CountryPicker.jsx";

import { fetchData } from "./api/index.js";

import styles from "./App.module.css";

export default class App extends Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    //fetch data
    // set the state
    this.setState({ data: fetchedData,country:country });
    
  };

  render() {
    const { data,country } = this.state;

    return (
      <div className={styles.container}>
        <h1 className={styles.h1}>Covid Reports</h1>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country = {country} />
      </div>
    );
  }
}
