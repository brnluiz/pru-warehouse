const test = require('tape')

const db = require('../src/db')
const fixtures = require('../src/db/fixtures')
const request = require('../helpers/supertest')

const menu = fixtures.menu

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
      t.equals(err, null)
      t.same(res.body, {})
      t.end()
    })
)

test('should get a menu from a location on a specific date', t =>
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
