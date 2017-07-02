const app = require('../app')
const request = require('supertest')(app)
const test = require('tape')

test('should get a menu from a location', t =>
  request
    .get('/menus/testLocation')
    .set('Accept', 'application/json')
    .expect(200)
    .end((err, res) => {
      t.equals(err, null)
      t.same(res.body, {})
      t.end()
    })
)

test('should get a menu from a location on a specific date', t =>
  request
    .get('/menus/testLocation')
    .query({
      date: '20-03-2017'
    })
    .set('Accept', 'application/json')
    .expect(200)
    .end((err, res) => {
      t.equals(err, null)
      t.same(res.body, {})
      t.end()
    })
)

test.onFinish(() => process.exit(0))
