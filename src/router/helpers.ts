import type { RouteRecordRaw } from "vue-router";
import LayoutEnum from "@/core/types/enums/layoutEnum";

/**
 * Create component route
 */
export const route = (
  path: string,
  view: string,
  options?: {
    layout?: LayoutEnum;
  }
): RouteRecordRaw => {
  return {
    path,
    component: () => import(`../views/${view}View.vue`),
    name: view,
    meta: {
      layout: options?.layout ?? LayoutEnum.DEFAULT,
    },
  };
};

/**
 * Create hook route
 */
export const hook = (path: string, callback: Function): RouteRecordRaw => {
  return {
    path,
    component: { render: () => null },
    beforeEnter: async (_to, _from, next) => {
      const result = await callback();
      result ? next() : next(false);
    },
  };
};
