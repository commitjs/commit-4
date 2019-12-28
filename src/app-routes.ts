import { Test1Component } from "./test1.component";
import { Test2Component } from "./test2.component";
import { IRoute } from './interfaces/route';

export const appRoutes: IRoute[] = [
  {
    path: '/',
    component: Test1Component
  },
  {
    path: '/test-2',
    component: Test2Component
  }
];
