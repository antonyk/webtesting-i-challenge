const enhancer = require('./enhancer.js');
// require('jest')

const defaultItem = {
  name: 'Iron Sword',
  durability: 100,
  enhancement: 0
}

// VALID items
const e1d1 = {...defaultItem, enhancement:0, durability: 0}
const e1d2 = {...defaultItem, enhancement:0, durability: 50}
const e1d3 = {...defaultItem, enhancement:0, durability: 100}
const e2d1 = {...defaultItem, enhancement:10, durability: 0}
const e2d2 = {...defaultItem, enhancement:10, durability: 50}
const e2d3 = {...defaultItem, enhancement:10, durability: 100}
const e3d1 = {...defaultItem, enhancement:14, durability: 0}
const e3d2 = {...defaultItem, enhancement:14, durability: 50}
const e3d3 = {...defaultItem, enhancement:14, durability: 100}
const e4d1 = {...defaultItem, enhancement:15, durability: 0}
const e4d2 = {...defaultItem, enhancement:15, durability: 50}
const e4d3 = {...defaultItem, enhancement:15, durability: 100}
const e5d1 = {...defaultItem, enhancement:16, durability: 0}
const e5d2 = {...defaultItem, enhancement:16, durability: 50}
const e5d3 = {...defaultItem, enhancement:16, durability: 100}
const e6d1 = {...defaultItem, enhancement:17, durability: 0}
const e6d2 = {...defaultItem, enhancement:17, durability: 50}
const e6d3 = {...defaultItem, enhancement:17, durability: 100}
const e7d1 = {...defaultItem, enhancement:20, durability: 0}
const e7d2 = {...defaultItem, enhancement:20, durability: 50}
const e7d3 = {...defaultItem, enhancement:20, durability: 100}

// INVALID items
const xe1d1 = {...defaultItem, enhancement:21, durability: 110}
const xe1d2 = {...defaultItem, enhancement:21, durability: -1}
const xe1d3 = {...defaultItem, enhancement:21, durability: 50.5}

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

  describe('get(item)', () => {
    it('a method for use when working on the stretch problem', () => {
      expect(enhancer.get(e1d1)).not.toBe(e1d1)

      expect(enhancer.get(e1d2)).toEqual({...e1d2})
      expect(enhancer.get(e2d2)).toEqual({...e2d2, name: "[+10] Iron Sword"})
      expect(enhancer.get(e7d2)).toEqual({...e7d2, name: "[+20] Iron Sword"})

    })
  })

})