import {Category} from './category';

describe('Category', () => {
  it('should create an instance', () => {
    expect(new Category()).toBeTruthy();
    expect(new Category(1)).toBeTruthy();
    expect(new Category(1, 'Test Category')).toBeTruthy();
  });

  it('should not serialize expenses', () => {
    let category = new Category(1, 'Test Category');
    expect(JSON.stringify(category))
      .toEqual('{"id":1,"name":"Test Category"}');
  });
});
