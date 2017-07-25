const test = require('tape')

const auth = require('../configs').tests.auth
const db = require('../src/db')
const fixtures = require('../src/db/fixtures')
const request = require('../helpers/supertest')

const location = fixtures.location()

test('before all', async t => {
  await db.menu.truncate({ cascade: true })
  await db.location.truncate({ cascade: true })
  await db.location.create(location)
  t.end()
})

test('should create a collection request for all locations', t =>
  request
    .post('/locations/collect')
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(201)
    .end((err, res) => {
      t.equals(err, null)
      t.same(res.body, {})
      t.end()
    })
)

test('should execute a location collect', t =>
  request
    .post(`/locations/${location.slug}/collect`)
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(201)
    .end((err, res) => {
      t.equals(err, null)
      t.same(res.body, {})
      t.end()
    })
)

test('should fail on execute a location collect due to non-existent location', t =>
  request
    .post(`/locations/KLAPAUCIUS/collect`)
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(404)
    .end((err, res) => {
      t.equals(err, null)
      t.same(res.body, { error: 'Location not found' })
      t.end()
    })
)

test.onFinish(() => process.exit(0))
