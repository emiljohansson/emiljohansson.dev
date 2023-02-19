import { add, divide, multiply, subtract } from '../utils/math'

describe('add', () => {
	test('adds 1 + 2 to equal 3', () => {
		expect(add(1, 2)).toBe(3)
	})
})

describe('subtract', () => {
	test('subtracts 3 - 2 to equal 1', () => {
		expect(subtract(3, 2)).toBe(1)
	})
})

describe('multiply', () => {
	test('multiply 3 * 2 to equal 6', () => {
		expect(multiply(3, 2)).toBe(6)
	})
})

describe('divide', () => {
	test('divide 6 / 2 to equal 3', () => {
		expect(divide(6, 2)).toBe(3)
	})
})
