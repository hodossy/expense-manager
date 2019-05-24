import { Category } from './category';
import { Expense } from './expense';

describe('Category', () => {
  it('should create an instance', () => {
    expect(new Category()).toBeTruthy();
    expect(new Category(1)).toBeTruthy();
    expect(new Category(1, 'Test Category')).toBeTruthy();
  });

  it('should not serialize expenses', () => {
    let category = new Category(1, 'Test Category');
    expect(JSON.stringify(category))
      .toEqual('{"left":0,"right":1,"lvl":0,"id":1,"name":"Test Category"}');
  });

  it('should be converted to and from JSON equally', () => {
    var expense = new Category();
    expect(Category.fromJSON(JSON.stringify(expense))).toEqual(expense);
    expense = new Category(1);
    expect(Category.fromJSON(JSON.stringify(expense))).toEqual(expense);
    expense = new Category(1, 'Test Category');
  });

  it('should show a nested display name', () => {
    let category = new Category(0, 'Category');
    let subCategory = new Category(1, 'Sub-Category')
    category.addChild(subCategory);
    expect(category.displayName).toEqual('Category');
    expect(subCategory.displayName).toEqual('Category > Sub-Category');
  });
});
