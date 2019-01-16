import React,{ Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createRestaurant } from '../graphql/mutations';

class RestaurantForm extends Component {
  state = { name: '', description: '' } 
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  createRestaurant = async () => {
    const { name, description } = this.state;
    if (name === '') return;
    try {
      const restaurant = { name, description }
      await API.graphql(graphqlOperation(createRestaurant, { input: restaurant }));
      this.setState({ name: '', description: '' });
      // this.props.fetchRestaurants();
    }
    catch (error) {
      console.warn(error);
    }
  }
  render() {
    return (
      <div id="restaurantForm" style={styles.form}>
        <input
          name='name'
          placeholder='restaurant name'
          onChange={this.onChange}
          value={this.state.name}
          style={styles.input}
        />
        <input
          name='description'
          placeholder='restaurant description'
          onChange={this.onChange}
          value={this.state.description}
          style={styles.input}
        />
        <button
          style={styles.button}
          onClick={this.createRestaurant}
        >Create Restaurant</button>
      </div>
    );
  }
}

const styles = {
  form: {
    margin: '0 auto', display: 'flex', flexDirection: 'column', width: 300,
  },
  input: { 
    fontSize: 18,
    border: 'none',
    margin: 10,
    height: 35,
    backgroundColor: "#ddd",
    padding: 8 
  },
  button: {
    border: 'none', backgroundColor: '#ddd', padding: '10px 30px'
  }
}

export default RestaurantForm;