import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  icon: string;
  role: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: '' },
  { state: 'category', name: 'Category', icon: 'category', role: 'admin' },
  { state: 'product', name: 'Products', icon: 'coffee', role: 'admin' },
  { state: 'order', name: 'Order', icon: 'coffee', role: '' },
  { state: 'bill', name: 'Bill', icon: 'coffee', role: '' },
  { state: 'user', name: 'Manage User', icon: 'User', role: 'admin' },
];

@Injectable()
export class MenuItems {
  getMenuItems(): Menu[] {
    return MENUITEMS;
  }
}
