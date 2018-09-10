import React, { Component } from 'react';
import styles from '../styles/AdditionalProductsByType.css'
import axios from 'axios';

class AdditionalProductsByType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    axios.get('/api/product', {
      params: { type: 'fillmein' }
    })
      .then((response) => {
        this.setState({
          products: response.data
        });
      }).catch(err => { console.log(err) });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>More Work lamps</div>
        <div className={styles.displayContainer}>
          {this.state.products.map((product, i) => {
            var percentage = product.stars / 5 * 100;
            var width = percentage + "%";

            return (
              <div key={i} className={styles.product}>
                <img src={product.imageUrl} className={styles.image}></img>
                <span className={styles.productLine}>{product.productLine}</span>
                <span className={styles.title}>{product.title}</span>
                <span className={styles.price}>${product.price}.99</span>
                <div className={styles.starContainer}>
                  <div className={styles.starOff}>★★★★★</div>
                  <div style={{ 'width': width }} className={styles.starOn}>★★★★★</div>
                </div>
                <div className={styles.ratingCount}>&nbsp;({product.reviewCount})</div>
              </div>
            )
          })}
        </div>


      </div>
    );
  }
}

export default AdditionalProductsByType;