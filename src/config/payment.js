import React, { Component } from 'react';
import { View, Button } from 'react-native';
import stripe from 'tipsi-stripe';
import { doPayment } from '../config/dopayment';




stripe.setOptions({
  publishableKey: 'pk_test_mDX84SFtQCTyEpmwSndoQezx00tVCxtOLX',
});

export default class Payment extends Component {
    state = {
        isPaymentPending: false
    }
    requestPayment = () => {
        this.setState({ isPaymentPending: true });
        return stripe
          .paymentRequestWithCardForm()
          .then(stripeTokenInfo => {
            console.log("AMOUNT IN PAYMENT :  " + this.props.totalAmount);
            return doPayment(this.props.totalAmount, stripeTokenInfo.tokenId,this.props.customerId);
          })
          .then(() => {
            console.warn('Payment succeeded!');
            this.props.invoice();

            
          })
          .catch(error => {
            console.warn('Payment failed', { error });
          })
          .finally(() => {
            this.setState({ isPaymentPending: false });
            
          });
      };
  

 
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Make a payment"
          onPress={this.requestPayment}
          disabled={this.state.isPaymentPending}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};