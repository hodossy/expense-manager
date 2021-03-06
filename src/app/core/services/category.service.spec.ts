import { TestBed } from '@angular/core/testing';
import { forkJoin } from 'rxjs';

import { Category } from '../models';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let rootCategory: Category;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(CategoryService);
    rootCategory = new Category(1);
    rootCategory.addChild(new Category(2, 'Test Category'));
    service.setRoot(rootCategory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should export the categories to JSON', () => {
    expect(service.export()).toEqual(
      '[{"left":0,"right":3,"lvl":0,"id":1},' +
      '{"left":1,"right":2,"lvl":1,"id":2,"name":"Test Category"}]'
    );
  });

  it('should import categories from JSON', () => {
    let new_service = new CategoryService();
    new_service.import(service.export());
    forkJoin([new_service.all$, service.all$]).subscribe((result) => {
      expect(result[0]).toEqual(result[0]);
    });
  });

  it('should have a root Category if nothing is imported', () => {
    let new_service = new CategoryService();
    new_service.import("[]");
    new_service.all$.subscribe((result) => {
      expect(result.length).toEqual(1);
      expect(result[0].id).toEqual(0);
    });
  });
});
