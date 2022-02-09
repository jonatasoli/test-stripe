<template>
    <h1>Payments</h1>
    <button @click="pay_web">Pagar Web</button>
    <button @click="present_web">Result Web</button>
 <br/>
 <div>
    <button @click="googlePayment">Pay now!</button>
  </div>


 <br/>
 <br/>
  <div>
    <button @click="present_g_play">Present</button>
  </div>
</template>

<script setup language="ts">
import { Stripe } from '@capacitor-community/stripe'
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import { ref, watch } from 'vue'
import axios from 'axios'

const publishableKey = "pk_test_51KHSFLHEcv3SrjgHdX1NqSg2VGxGHw1IIfldrFLtRy1BlbkGPO3qQpaNEAwBdQaA51PY7fkoaryNgBbjIyM02mvO005TQXWk6Y"

const loading = false
const lineItems = [
        {
          price: 'price_1KORK0HEcv3SrjgHwUtbufSt', // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ]

const isAvailable = Stripe.isGooglePayAvailable().catch(() => undefined)


async function pay_web() {
  console.log("start")
  Stripe.initialize({
    publishableKey: "pk_test_51KHSFLHEcv3SrjgHdX1NqSg2VGxGHw1IIfldrFLtRy1BlbkGPO3qQpaNEAwBdQaA51PY7fkoaryNgBbjIyM02mvO005TQXWk6Y",
  });
  const intent = await axios.get('http://192.168.1.180:8000/intent', {header: {'content-type': 'application/json'}})
  /* const intent = await axios.get('http://localhost:8000/intent', {header: {'content-type': 'application/json'}}) */
  const intent_json = intent.data
  const paymentIntent = intent_json.paymentIntent
  const customer = intent_json.customer
  const ephemeralKey = intent_json.ephemeralKey

  console.log("intent", intent.data.customer)

  await Stripe.createPaymentSheet({
    paymentIntentClientSecret: paymentIntent,
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
  });


  await Stripe.createGooglePay({
    paymentIntentClientSecret: JSON.stringify(intent.data),
    customerId: intent.data.customer,
  });
  console.log("finish")
}

async function googlePayment() {
  console.log("start")
  Stripe.initialize({
    publishableKey: "pk_test_51KHSFLHEcv3SrjgHdX1NqSg2VGxGHw1IIfldrFLtRy1BlbkGPO3qQpaNEAwBdQaA51PY7fkoaryNgBbjIyM02mvO005TQXWk6Y",
  });
  const intent = await axios.get('http://192.168.1.180:8000/intent', {header: {'content-type': 'application/json'}})
  const intent_json = intent.data
  const paymentIntent = intent_json.paymentIntent
  const customer = intent_json.customer
  const ephemeralKey = intent_json.ephemeralKey

  console.log("intent", intent.data.customer)

  await Stripe.createGooglePay({
    paymentIntentClientSecret: JSON.stringify(intent.data),
    customerId: intent.data.customer,
  });
  console.log("finish")

  /* const result = await Stripe.presentGooglePay(); */

  /* console.log("finish present", result.paymentResult) */
}

async function present_g_play() {
  console.log("init present")
  const result = await Stripe.presentGooglePay();
  if (result.paymentResult === GooglePayEventsEnum.Completed) {
    // Happy path
    console.log("Happy Path")
  }
  console.log("finish present")
}
async function present_web() {
  console.log("init present")

  // present PaymentSheet and get result.

  const result = await Stripe.presentPaymentSheet();
  if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
    // Happy path
    console.log("Happy Path")
  }
  console.log("finish present")
}

</script>

