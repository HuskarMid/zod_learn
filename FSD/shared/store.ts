"use client";
import {
    combineSlices,
    createSelector,
    ThunkAction,
    UnknownAction
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../modules/todo-list/todo.slice";

const rootReducer = combineSlices({
    todo: todoReducer,
})

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<R, AppState, {}, UnknownAction>;

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(),
})

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();