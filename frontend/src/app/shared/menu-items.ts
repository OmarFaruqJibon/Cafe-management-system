import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  icon: string;
  role: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', icon: 'space_dashboard', role: '' },
  { state: 'category', name: 'Category', icon: 'category', role: 'admin' },
  { state: 'product', name: 'Products', icon: 'inventory', role: 'admin' },
  { state: 'order', name: 'Order', icon: 'shopping_cart_checkout', role: '' },
  { state: 'bill', name: 'Bill', icon: 'receipt_long', role: '' },
  { state: 'user', name: 'Manage User', icon: 'person', role: 'admin' },
];

@Injectable()
export class MenuItems {
  getMenuItems(): Menu[] {
    return MENUITEMS;
  }
}
