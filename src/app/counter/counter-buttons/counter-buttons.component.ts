import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../state/counter.action';
import { CounterState } from '../state/counterState';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.css']
})
export class CounterButtonsComponent {
  constructor(private store:Store<{counter: CounterState}>){}
  OnIncrement(){
    this.store.dispatch(increment());
  }

  OnDecrement(){
   this.store.dispatch(decrement());
  }

  OnReset(){
   this.store.dispatch(reset());
  }
}
