from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import datetime
import stripe


app = FastAPI()
origins = [
    "*",
    "http://dev.localhost:8000/",
    "http://dev.localhost:3000/",
    "http://dev.localhost/",
    "http://localhost:3000/",
    "http://localhost/",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def create_app():
    import ipdb; ipdb.set_trace()
    return app


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/payment")
def payment():
    stripe.api_key = 'sk_test_51KHSFLHEcv3SrjgHoQISp5Jx2MIzhKD5huOuu9cRvK0b6fRhsoNWHF0iw7OCLWMMOHFtldzx5Oi1fjAgamDfK7T300djJzPo9V'

    stripe.PaymentIntent.create(
      amount=1099,
      currency='brl',
      payment_method_types=['card'],
      metadata={
        'order_id': '6735',
      },
    )

@app.get('/secret')
def secret():

  stripe.api_key = 'sk_test_51KHSFLHEcv3SrjgHoQISp5Jx2MIzhKD5huOuu9cRvK0b6fRhsoNWHF0iw7OCLWMMOHFtldzx5Oi1fjAgamDfK7T300djJzPo9V'
  intent = stripe.PaymentIntent.create(
      amount=1099,
      currency='brl',
      automatic_payment_methods={
        'enabled': True,
      },
  )
  return dict(client_secret=intent.client_secret)


@app.get('/intent')
def intent():

  stripe.api_key = 'sk_test_51KHSFLHEcv3SrjgHoQISp5Jx2MIzhKD5huOuu9cRvK0b6fRhsoNWHF0iw7OCLWMMOHFtldzx5Oi1fjAgamDfK7T300djJzPo9V'
  customer = stripe.Customer.create(
  description="My First Test Customer (created for API docs)",
  )
  dt= datetime.datetime.now()
  ephemeralKey = stripe.EphemeralKey.create(
    customer=customer.id,
    stripe_version="2020-08-27"
  )
  intent = stripe.PaymentIntent.create(
      amount=1099,
      currency='brl',
      automatic_payment_methods={
        'enabled': True,
      },
  )
  return dict(
    paymentIntent=intent.client_secret,
    ephemeralKey=ephemeralKey.secret,
    customer=customer.id)


@app.get('/create-checkout-session')
def create_checkout_session():
    try:
        stripe.api_key = 'sk_test_51KHSFLHEcv3SrjgHoQISp5Jx2MIzhKD5huOuu9cRvK0b6fRhsoNWHF0iw7OCLWMMOHFtldzx5Oi1fjAgamDfK7T300djJzPo9V'
        intent = stripe.PaymentIntent.create(
            amount=1099,
            currency='brl',
            automatic_payment_methods={
              'enabled': True,
            },
        )
        import ipdb; ipdb.set_trace()
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    'price': intent.client_secret,
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url='https://uol.com.br',
            cancel_url='https://meiobit.com',
        )
    except Exception as e:
        return str(e)

    return redirect(checkout_session.url, code=303)
