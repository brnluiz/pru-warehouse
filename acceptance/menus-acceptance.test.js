const test = require('tape')

const db = require('../src/db')
const fixtures = require('../src/db/fixtures')
const request = require('../helpers/supertest')

const menu = fixtures.menu()

test('before all', async t => {
  await db.location.sync({ force: true })
  await db.menu.sync({ force: true })
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

test.skip('should fail on get a menu from a non-existent location', t =>
  request
    .get(`/locations/KLAPAUCIUS/menus`)
    .set('Accept', 'application/json')
    .expect(404)
    .end((err, res) => {
      t.equals(err, null)
      t.same(res.body, { error: 'Error on fetching location: non-existent location KLAPAUCIUS' })
      t.end()
    })
)

test('should get a specific menu', t =>
  request
    .get(`/menus/${menu.id}`)
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

test.skip('should fail on get a non-existent menu', t =>
  request
    .get(`/menus/10`)
    .set('Accept', 'application/json')
    .expect(404)
    .end((err, res) => {
      console.log(res.body)
      t.equals(err, null)
      t.end()
    })
)

test.skip('should get a menu from a location on a specific date', t =>
  request
    .get(`/locations/${menu.location.slug}/menus`)
    .query({
      date: menu.date
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
