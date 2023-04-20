import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counterState';
import { Observable, Subscription } from 'rxjs';
import { getCounter } from '../state/counter.selector';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit {
  counter:number=0;
  counter$?: Observable<number>;
 constructor(private store:Store<{counter:CounterState}>){
  
 }
  
  ngOnInit(): void {
    //without selector
    // this.store.select('counter').subscribe(data=>{
    //   this.counter=data.counter;
    // });
    //with selector
    // this.store.select(getCounter).subscribe(counter=>{
    //   console.log('Call counter only.')
    //   this.counter=counter;
    // });
    this.counter$=this.store.select(getCounter);
  }

}
