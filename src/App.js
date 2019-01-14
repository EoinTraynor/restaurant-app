import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listRestaurants } from './graphql/queries';
import './App.css';

class App extends Component {
  state = { restaurants: []}
  async componentDidMount() {
    try {
      const apiData = await API.graphql(graphqlOperation(listRestaurants));
      const restaurants = apiData.data.listRestaurants.items;
      this.setState({ restaurants });
    } catch(error) {
      console.warn(error);
    }
  }
  render() {
    return (
      <div className="App">
        { 
          this.state.restaurants.map((restaurant, i) => (
            <div key={i} style={styles.item}>
              <p style={styles.name}>{restaurant.name}</p>
              <p style={styles.description}>{restaurant.description}</p>
            </div>
          ))
        }
      </div>
    );
  }
}

const styles = {
  item: {
    padding: 10,
    borderBottom: '2px solid #ddd'
  },
  name: { fontSize: 22 },
  description: { color: 'rgba(0, 0, 0, .45)' }
}

export default App;
