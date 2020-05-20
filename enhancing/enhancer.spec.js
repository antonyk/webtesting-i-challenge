const enhancer = require('./enhancer.js');
// require('jest')

const defaultItem = {
  name: 'item name',
  durability: 100,
  enhancement: 0
}

describe('enhancer', () => {
  describe('repair(item)', () => {
    test('repairs item by returning a new item with durability of 100', () => {
      const item = {...defaultItem}
      // argument and return are not the same object
      expect(enhancer.repair(item)).not.toBe(item)
      expect(enhancer.repair({...item, durability: 50}).durability).toBe(100)
      expect(enhancer.repair({...item, durability: 100}).durability).toBe(100)
    })
  })

  describe('success(item)', () => {
    it('accepts an item and returns a new item modified according to the rules defined by the client for enhancement success', () => {
      const item = {...defaultItem, durability: 50}
      expect(enhancer.succeed(item)).not.toBe(item)

      expect(enhancer.succeed({...item, enhancement:0}).enhancement).toBe(1)
      expect(enhancer.succeed({...item, enhancement:20}).enhancement).toBe(20)
      expect(enhancer.succeed({...item, enhancement:0}).durability).toBe(50)
    })
  })

  describe('fail(item)', () => {
    it('accepts an item and returns a new item object modified accordint to the rule defined by the client for enhancement failure', () => {
      const item = {...defaultItem, durability: 50}
      expect(enhancer.fail(item)).not.toBe(item)

      // const first = expect(enhancer.succeed({...item, enhancement:0}).enhancement).toBe(0)
      // expect(enhancer.succeed({...item, enhancement:10}).enhancement).toBe(10)
      // expect(enhancer.succeed({...item, enhancement:16}).enhancement).toBe(16)
      // expect(enhancer.succeed({...item, enhancement:17}).enhancement).toBe(16)
      // expect(enhancer.succeed({...item, enhancement:20}).enhancement).toBe(19)

      // expect(enhancer.succeed({...item, enhancement:0}).durability).toBe(50)

      // VALID items
      const e1d1 = {...item, enhancement:0, durability: 0}
      const e1d2 = {...item, enhancement:0, durability: 50}
      const e1d3 = {...item, enhancement:0, durability: 100}
      const e2d1 = {...item, enhancement:10, durability: 0}
      const e2d2 = {...item, enhancement:10, durability: 50}
      const e2d3 = {...item, enhancement:10, durability: 100}
      const e3d1 = {...item, enhancement:14, durability: 0}
      const e3d2 = {...item, enhancement:14, durability: 50}
      const e3d3 = {...item, enhancement:14, durability: 100}
      const e4d1 = {...item, enhancement:15, durability: 0}
      const e4d2 = {...item, enhancement:15, durability: 50}
      const e4d3 = {...item, enhancement:15, durability: 100}
      const e5d1 = {...item, enhancement:16, durability: 0}
      const e5d2 = {...item, enhancement:16, durability: 50}
      const e5d3 = {...item, enhancement:16, durability: 100}
      const e6d1 = {...item, enhancement:17, durability: 0}
      const e6d2 = {...item, enhancement:17, durability: 50}
      const e6d3 = {...item, enhancement:17, durability: 100}
      const e7d1 = {...item, enhancement:20, durability: 0}
      const e7d2 = {...item, enhancement:20, durability: 50}
      const e7d3 = {...item, enhancement:20, durability: 100}

      // INVALID items
      const xe1d1 = {...item, enhancement:21, durability: 110}
      const xe1d2 = {...item, enhancement:21, durability: -1}
      const xe1d3 = {...item, enhancement:21, durability: 50.5}

      expect(enhancer.fail(e1d1)).toEqual({...e1d1})
      expect(enhancer.fail(e1d2)).toEqual({...e1d2, durability: 45})
      expect(enhancer.fail(e1d3)).toEqual({...e1d3, durability: 95})
      expect(enhancer.fail(e2d1)).toEqual({...e2d1})
      expect(enhancer.fail(e2d2)).toEqual({...e2d2, durability: 45})
      expect(enhancer.fail(e4d1)).toEqual({...e4d1})
      expect(enhancer.fail(e4d2)).toEqual({...e4d2, durability: 40})
      expect(enhancer.fail(e4d3)).toEqual({...e4d3, durability: 90})

      expect(enhancer.fail(e6d1)).toEqual({...e6d1, enhancement: 16})
      expect(enhancer.fail(e6d2)).toEqual({...e6d2, enhancement: 16, durability: 40})
      expect(enhancer.fail(e6d3)).toEqual({...e6d3, enhancement: 16, durability: 90})

    })
  })

  describe('get()', () => {
    it.todo('a method for use when working on the stretch problem')
  })

})