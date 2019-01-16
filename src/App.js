import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listRestaurants } from './graphql/queries';
import { onCreateRestaurant } from './graphql/subscriptions'
import RestaurantForm from './components/RestaurantForm';
import RestaurantList from './components/RestaurantList';
import './App.css';

class App extends Component {
  state = { restaurants: [] }
  fetchRestaurants = async () => {
    try {
      const apiData = await API.graphql(graphqlOperation(listRestaurants));
      const restaurants = apiData.data.listRestaurants.items;
      this.setState({ restaurants });
    } catch(error) {
      console.warn(error);
    }
  }
  subscribeToRestaurant = () => {
    this.subscription = API.graphql(
      graphqlOperation(onCreateRestaurant)
    ).subscribe({
      next: restaurantData => {
        const newRestaurant = restaurantData.value.data.onCreateRestaurant;
        const restaurantAlreadyExists = this.state.restaurants.find(restaurant => restaurant.id === newRestaurant.id);
        if (restaurantAlreadyExists) return;
        this.setState({ restaurants: [
          ...this.state.restaurants,
          newRestaurant,
        ]});
      }
    });
  };
  componentDidMount() {
    this.fetchRestaurants();
    this.subscribeToRestaurant();
  }
  componentWillUnmount() {
    this.subscription.unsubscribe()
  }
  render() {
    return (
      <div className="App">
        <RestaurantList restaurants={this.state.restaurants} />
        <RestaurantForm />
      </div>
    );
  }
}

export default App;
