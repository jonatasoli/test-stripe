POETRY = poetry
UVICORN = uvicorn main:create_app
UVICORN_FLAGS = --factory --host 0.0.0.0 --port 8000 --reload

## @ Stripe install
.PHONY: activate
activate:
	${POETRY} shell

## @ Stripe install
.PHONY: install
install:
	${POETRY} install

## @ RUN python app commands
.PHONY: run
run: ## Run app with UVICORN
	${POETRY} run ${UVICORN} ${UVICORN_FLAGS}

.PHONY: help
help:
	@python help.py
