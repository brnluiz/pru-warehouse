const app = require('../app')
const request = require('supertest')(app)
const test = require('tape')

test('create a collection request', t =>
  request
    .post('/locations/collect')
    .set('Accept', 'application/json')
    .expect(201)
    .end((err, res) => {
      t.equals(err, null)
      t.same(res.body, {})
      t.end()
    })
)

test('execute a collect on the specified location', t =>
  request
    .post('/locations/collect/testLocation')
    .set('Accept', 'application/json')
    .expect(201)
    .end((err, res) => {
      t.equals(err, null)
      t.same(res.body, {})
      t.end()
    })
)

test.onFinish(() => process.exit(0))
