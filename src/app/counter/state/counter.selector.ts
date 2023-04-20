import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState } from "./counterState";

const getCounterState=createFeatureSelector<CounterState>('counter');

export const getCounter=createSelector(
    getCounterState,
    (state)=>
    {
        return state.counter;
    }
);
export const getDesignation=createSelector(
    getCounterState,
    (state)=>
    {
        return state.designation;
    }
);