import { Injectable } from '@angular/core';
import { Category } from '../models';
import { NodeService } from './node.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends NodeService<Category> {
  fromJSON = Category.fromJSON;
}