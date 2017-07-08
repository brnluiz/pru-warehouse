const test = require('blue-tape')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const fixtures = require('../../../db/fixtures')

const db = {
  location: {
    create: sinon.stub(),
    findOne: sinon.stub()
  }
}

const LocationService = proxyquire('./location-service', {
  '../../../db': db
})

test('should create location', async t => {
  db.location.create.withArgs(fixtures.location).resolves(true)

  const location = await LocationService.create(fixtures.location)
  t.ok(location)
})

test('should fail on create location', async t => {
  db.location.create.withArgs(fixtures.location).throws()

  const location = LocationService.create(fixtures.location)
  t.shouldFail(location)
})

test('should get location', async t => {
  db.location.findOne.withArgs(fixtures.location.id).resolves(true)

  const location = await LocationService.get(fixtures.location.id)
  t.ok(location)
})

test('should fail on get location', async t => {
  db.location.findOne.withArgs(fixtures.location.id).throws()

  const location = LocationService.get(fixtures.location.id)
  t.shouldFail(location)
})
