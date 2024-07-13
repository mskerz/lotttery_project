import { Injectable } from '@angular/core';
import { Lottery } from '../model/lottery.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Lottery[] = [];
  cartUpdated = new Subject<void>();
  constructor() {
    const cartData = sessionStorage.getItem('cart');
    if (cartData) {
      this.cart = JSON.parse(cartData);
    }
  }
  addItemtoCart(item: Lottery) {
    // ตรวจสอบว่า มีหมายเลขนี้หรือไม่  ถ้าใช่ให้เพิ่มจำนวน
    const existingItem = this.cart.find(
      (cartItem) => cartItem.idx === item.idx
    );
    if (existingItem) {
      existingItem.lottery_quantity++;
    } else {
      // หากไม่มีให้เพิ่มสลากลงในรถเข็น
      const itemToAdd = { ...item, lottery_quantity: 1 };
      this.cart.push(itemToAdd);
    }
    this.saveCartToLocalStorage();
    this.cartUpdated.next();
  }
  getCart(): Lottery[] {
    return this.cart;
  }
 
  RemoveItemFromCart(item: Lottery) {
    const index = this.cart.indexOf(item);
    if (index !== -1) {
      this.cart.splice(index, 1);
      
    }
    if (this.cart.length === 0) {
      this.clearCartFromLocalStorage();
    } else {
      this.saveCartToLocalStorage();
    }
    this.cartUpdated.next();
  }
  ResetCart() {
    this.cart = [];
    this.clearCartFromLocalStorage();
    this.cartUpdated.next();
  }
  hasLotteryInCart(): boolean {
    return this.cart.length > 0;
  }

  saveCartToLocalStorage() {
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }
  clearCartFromLocalStorage() {
    sessionStorage.removeItem('cart');
  }
}
