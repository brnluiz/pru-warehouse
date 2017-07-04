const app = require('../app')
const request = require('supertest')(app)
const test = require('tape')

const db = require('../db')
const fixtures = require('../db/fixtures')

test('before all', async t => {
  await db.location.sync({ force: true })
  await db.menu.sync({ force: true })
  await db.menu.create(fixtures.menu, {
    include: [{
      association: db.menu.location
    }]
  })
  t.end()
})

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
