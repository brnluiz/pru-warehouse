all: build up migrate

build:
	docker-compose build

up:
	docker-compose up -d

migrate:
	docker-compose run web sequelize db:migrate

stop:
	docker-compose stop

acceptance:
	docker-compose run web npm run acceptance

unit:
	docker-compose run web npm run unit

test:
	docker-compose run web npm test

attach: up
	docker-compose exec web bash
