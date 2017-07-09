const proxyquire = require('proxyquire')
const sinon = require('sinon')
const test = require('blue-tape')

const fixtures = require('../../../db/fixtures')

const db = {
  menu: {
    create: sinon.stub(),
    bulkCreate: sinon.stub(),
    findAll: sinon.stub(),
    findById: sinon.stub()
  },
  location: {
    findOne: sinon.stub()
  }
}

const eventService = {
  emit: sinon.spy()
}

const MenuService = proxyquire('./menu-service', {
  '../../../db': db,
  '../../../event-service': eventService
})

test('should create menu', async t => {
  db.menu.create
    .withArgs(fixtures.menu)
    .resolves(fixtures.menu)

  const menu = await MenuService.create(fixtures.menu)
  t.equal(menu, fixtures.menu)
  t.assert(eventService.emit.calledWith('menu.create', menu), 'should emit an event')
})

test('should fail on create menu', async t => {
  db.menu.create.withArgs(fixtures.menu).throws()

  const menu = MenuService.create(fixtures.menu)
  t.shouldFail(menu)
})

test('should fail on create duplicate menu', async t => {
  t.pass('need to discover how to test')
})

test('should bulk create menus', async t => {
  const expectedMenus = [fixtures.menu]
  db.menu.bulkCreate
    .withArgs(expectedMenus)
    .resolves(expectedMenus)

  const menus = await MenuService.createBulk(expectedMenus)
  t.equal(menus, expectedMenus)
  t.assert(eventService.emit.calledWith('menu.create', menus), 'should emit an event')
})

test('should fail on create menu', async t => {
  const expectedMenus = [fixtures.menu]
  db.menu.bulkCreate.withArgs(expectedMenus).throws()

  const menu = MenuService.create(fixtures.menu)
  t.shouldFail(menu)
})

test('should fail on create duplicate menu', async t => {
  t.pass('need to discover how to test')
})

test('should get menus by location', async t => {
  db.location.findOne
    .withArgs({ where: { slug: fixtures.location.slug } })
    .resolves(fixtures.location)

  db.menu.findAll
    .withArgs({ where: { locationId: fixtures.location.id } })
    .resolves([fixtures.menu])

  const menus = await MenuService.getByLocation(fixtures.location.slug)
  t.deepEqual(menus, [fixtures.menu])
})

test('should fail on get menus by location with menu exception', async t => {
  db.location.findOne
    .withArgs({ where: { slug: fixtures.location.slug } })
    .resolves(fixtures.location)

  db.menu.findAll
    .withArgs({ where: { locationId: fixtures.location.id } })
    .throws()

  const menus = MenuService.getByLocation(fixtures.location.slug)
  t.shouldFail(menus)
})

test('should fail on get menus by location with location exception', async t => {
  db.location.findOne
    .withArgs({ where: { slug: fixtures.location.slug } })
    .throws()

  const menus = MenuService.getByLocation(fixtures.location.slug)
  t.shouldFail(menus)
})

test('should get menu by id', async t => {
  db.menu.findById.withArgs(fixtures.menu.id).resolves(fixtures.menu)

  const menu = await MenuService.get(fixtures.menu.id)
  t.deepEqual(menu, fixtures.menu)
})

test('should fail on get menu by id', async t => {
  db.menu.findById.withArgs(fixtures.menu.id).throws()

  const menus = MenuService.getByLocation(fixtures.location.slug)
  t.shouldFail(menus)
})
