const test = require('blue-tape')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const fixtures = require('../../../db/fixtures')

const db = {
  location: {
    create: sinon.stub(),
    findOne: sinon.stub(),
    findAll: sinon.stub()
  }
}
const eventService = {
  emit: sinon.spy()
}

const LocationService = proxyquire('./location-service', {
  '../../../db': db,
  '../../../helpers/event-service': eventService
})

test('should create location', async t => {
  db.location.create.withArgs(fixtures.location).resolves(true)

  const location = await LocationService.create(fixtures.location)
  t.ok(location)
  t.assert(eventService.emit.calledWith('location.create', location))
})

test('should fail on create location', async t => {
  db.location.create.withArgs(fixtures.location).throws()

  const location = LocationService.create(fixtures.location)
  t.shouldFail(location)
})

test('should get all locations', async t => {
  const expectedLocations = [fixtures.location, fixtures.location]
  db.location.findAll.withArgs().resolves(expectedLocations)

  const locations = await LocationService.getAll()
  t.equal(locations, expectedLocations)
})

test('should fail on get all locations', async t => {
  db.location.findAll.withArgs().throws()

  const locations = LocationService.getAll()
  t.shouldFail(locations)
})

test('should get location by id', async t => {
  db.location.findOne.withArgs(fixtures.location.id).resolves(true)

  const location = await LocationService.get(fixtures.location.id)
  t.ok(location)
})

test('should fail on get location by id', async t => {
  db.location.findOne.withArgs(fixtures.location.id).throws()

  const location = LocationService.get(fixtures.location.id)
  t.shouldFail(location)
})
