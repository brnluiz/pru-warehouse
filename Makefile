all: build up migrate

.PHONY: build
build:
	docker-compose build

.PHONY: up
up:
	docker-compose up -d

.PHONY: migrate
migrate:
	docker-compose run web ./node_modules/.bin/sequelize db:migrate

.PHONY: rm stop
rm: stop
	docker-compose rm -f

.PHONY: stop
stop:
	docker-compose stop

.PHONY: acceptance
acceptance:
	docker-compose run web npm run acceptance

.PHONY: unit
unit:
	docker-compose run web npm run unit

.PHONY: test
test:
	docker-compose run web npm test

.PHONY: attach up
attach: up
	docker-compose exec web bash
