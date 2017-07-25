const test = require('tape')

const auth = require('../configs').tests.auth
const db = require('../src/db')
const fixtures = require('../src/db/fixtures')
const request = require('../helpers/supertest')

const menu = fixtures.menu()

test('before all', async t => {
  await db.menu.truncate({ cascade: true })
  await db.location.truncate({ cascade: true })
  await db.menu.create(menu, {
    include: [{
      association: db.menu.location
    }]
  })
  t.end()
})

test('should get a menu from a location', t =>
  request
    .get(`/locations/${menu.location.slug}/menus`)
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(200)
    .end((err, res) => {
      const result = res.body.map(menu => {
        delete menu.createdAt
        delete menu.updatedAt
        return menu
      })

      const expected = [ fixtures.menu() ]
      expected[0].locationId = expected[0].location.id
      delete expected[0].location

      t.equals(err, null)
      t.deepEquals(result, expected)
      t.end()
    })
)

test('should fail on get a menu from a non-existent location', t =>
  request
    .get(`/locations/KLAPAUCIUS/menus`)
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(404)
    .end((err, res) => {
      t.equals(err, null)
      t.deepEquals(res.body, { error: 'Location not found' })
      t.end()
    })
)

test('should get a specific menu', t =>
  request
    .get(`/menus/${menu.id}`)
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(200)
    .end((err, res) => {
      const result = res.body
      delete result.createdAt
      delete result.updatedAt

      const expected = fixtures.menu()
      expected.locationId = expected.location.id
      delete expected.location

      t.equals(err, null)
      t.deepEquals(result, expected)
      t.end()
    })
)

test('should fail on get a non-existent menu', t =>
  request
    .get(`/menus/10`)
    .auth(auth.user, auth.pswd)
    .set('Accept', 'application/json')
    .expect(404)
    .end((err, res) => {
      t.equals(err, null)
      t.deepEquals(res.body, { error: 'Menu not found' })
      t.end()
    })
)

test('should get a menu from a location on a specific date', t =>
  request
    .get(`/locations/${menu.location.slug}/menus`)
    .auth(auth.user, auth.pswd)
    .query({
      date: menu.date
    })
    .set('Accept', 'application/json')
    .expect(200)
    .end((err, res) => {
      const result = res.body.map(menu => {
        delete menu.createdAt
        delete menu.updatedAt
        return menu
      })

      const expected = [ fixtures.menu() ]
      expected[0].locationId = expected[0].location.id
      delete expected[0].location

      t.equals(err, null)
      t.deepEquals(result, expected)
      t.end()
    })
)

test.onFinish(() => process.exit(0))
