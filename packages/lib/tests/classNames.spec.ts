import { classNames } from '../src/classNames'

test('strings and key: booleans', () => {
  expect(classNames('foo', 'bar')).toBe('foo bar')
  expect(classNames('foo', { bar: true })).toBe('foo bar')
  expect(classNames({ 'foo-bar': true })).toBe('foo-bar')
  expect(classNames({ 'foo-bar': false })).toBe('')
  expect(classNames({ foo: true }, { bar: true })).toBe('foo bar')
  expect(classNames({ foo: true, bar: true })).toBe('foo bar')
})
