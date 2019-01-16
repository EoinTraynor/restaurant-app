import React from 'react';

const RestaurantList = ({ restaurants }) => 
  restaurants.map((restaurant, i) => (
    <div key={i} style={styles.item}>
      <p style={styles.name}>{restaurant.name}</p>
      <p style={styles.description}>{restaurant.description}</p>
    </div>
  ));

const styles = {
  item: {
    padding: 10,
    borderBottom: '2px solid #ddd'
  },
  name: { fontSize: 22 },
  description: { color: 'rgba(0, 0, 0, .45)' }
}

export default RestaurantList;
