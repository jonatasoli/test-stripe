#!/bin/bash

cross-env CI=true && yarn test --bail --findRelatedTests
