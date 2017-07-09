const test = require('tape')

const db = require('../src/db')
const fixtures = require('../src/db/fixtures')
const request = require('../helpers/supertest')

test('before all', async t => {
  await db.location.sync({ force: true })
  await db.menu.sync({ force: true })
  await db.location.create(fixtures.location)
  t.end()
})

test('create a collection request on all locations', t =>
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
    .post(`/locations/1/collect`)
    .set('Accept', 'application/json')
    .expect(201)
    .end((err, res) => {
      t.equals(err, null)
      t.same(res.body, {})
      t.end()
    })
)

test.onFinish(() => process.exit(0))
