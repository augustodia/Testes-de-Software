import { sum } from './calculator';

it('should sum 2 and 2 and the result must be 4', () => {
  expect(sum(2, 2)).toBe(4);
});

it('should sum 2 and 2 even one of them is a string and the result must be 4', () => {
  expect(sum('2', '2')).toBe(4);
});

it('Quando passar algo que não é numero deve jogar erro', () => {
  expect(() => {
    sum('', '2');
  }).toThrowError();

  expect(() => {
    sum([2, 2]);
  }).toThrowError();

  expect(() => {
    sum({});
  }).toThrowError();

  expect(() => {
    sum(() => {});
  }).toThrowError();

  expect(() => {
    sum(new Date(), new Date());
  }).toThrowError();

  expect(() => {
    sum();
  }).toThrowError();
});
