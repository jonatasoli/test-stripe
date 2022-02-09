# Environment Variables

This project use a combination of Environment Variables to be able to dynamically change configurations.

The environment variables can be set through:

* Server environment variables
* `.env` file (local development only)

## Environment Variables Available

```env
NODE_ENV

VUE_APP_API_HOST*
VUE_APP_BASE_URL*
```

* `NODE_ENV`: Node environment. Defaults to `development`
* `VUE_APP_BASE_URL`* The base URL your application bundle will be deployed at. Defaults to `/`
* `VUE_APP_API_HOST`* API host domain (without http/https),


# Local development (Front End)

```
> cp .env.sample .env
```

Then, just edit .env file to configure your local env.
