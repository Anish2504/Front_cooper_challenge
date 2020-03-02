import React, { Component } from "react";
import { getData } from "../modules/performanceData";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";

class DisplayPerformanceData extends Component {
  state = {
    performanceData: null
  };

  componentDidMount() {
    this.getPerformanceData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.updateIndex !== prevProps.updateIndex) {
      this.getPerformanceData();
    }
  }

  async getPerformanceData() {
    let result = await getData();
    this.setState({ performanceData: result.data.entries }, () => {
      this.props.indexUpdated();
    });
  }
  //Gets and count every entry entered by the user. We check if entry it's empty too.

  countsCollection(collection, value) {
    let count = 0;
    collection.forEach(entry => {
      count += entry.data.message === value ? 1 : 0;
    });
    return count;
  }

  onlyLabels(collection) {
    let justLabels = [];
    collection.forEach(entry => {
      if (entry.data.message && justLabels.indexOf(entry.data.message) === -1) {
        justLabels.push(entry.data.message);
      }
    });
    return justLabels;
  }

  render() {
    let dataIndex;

    if (this.state.performanceData != null) {
      dataIndex = (
        <div>
          {this.state.performanceData.map(item => {
            return (
              <div key={item.id}>
                {item.data.message} {item.data.distance}
              </div>
            );
          })}
        </div>
      );
    }
    const distances = [];
    const labels = [];
    let dataForDoughnut = {};

    if (this.state.performanceData != null) {
      this.state.performanceData.forEach(entry => {
        distances.push(entry.data.distance);
        labels.push(entry.data.message);
      });
      let justLabels = this.onlyLabels(this.state.performanceData);
      let dataDistance = [];

      justLabels.forEach(label => {
        dataDistance.push(
          this.countsCollection(this.state.performanceData, label)
        );
      });

      dataForDoughnut = {
        labels: justLabels,
        datasets: [
          {
            data: dataDistance,
            backgroundColor: [
              "#7CFC00",
              "#00BFFF",
              "#BA55D3",
              "#FFD700",
              "#8B0000"
            ]
          }
        ]
      };
    }

    return (
      <div id="index">
        {dataIndex}
        <Doughnut
          data={dataForDoughnut}
          width={400}
          height={200}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    );
  }
}

export default DisplayPerformanceData;
