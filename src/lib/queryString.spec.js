import { queryString, parse } from './queryString';

describe('Object to query string', () => {
  it('should create a valid query string when a object is provided', () => {
    const obj = {
      name: 'Luiz',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Luiz&profession=developer');
  });

  it('should create a valid query string when a array is passed as value', () => {
    const obj = {
      name: 'Luiz',
      skills: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe('name=Luiz&skills=JS,TDD');
  });

  it('should create a valid query string when a object is passed as value', () => {
    const obj = {
      name: 'Luiz',
      skills: {
        firts: 'JS',
        second: 'TDD',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string to object', () => {
    const qs = 'name=Luiz&profession=developer';
    expect(parse(qs)).toEqual({
      name: 'Luiz',
      profession: 'developer',
    });
  });

  it('should convert a query string of a single key-value pair to object', () => {
    const qs = 'name=Luiz';
    expect(parse(qs)).toEqual({
      name: 'Luiz',
    });
  });

  it('should convert a query string an object taking care of comma separated values', () => {
    const qs = 'name=Luiz&abilities=JS,TDD';
    expect(parse(qs)).toEqual({
      name: 'Luiz',
      abilities: ['JS', 'TDD'],
    });
  });
});
