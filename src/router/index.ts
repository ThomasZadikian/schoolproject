import { createRouter, createWebHistory } from "vue-router";
import { route } from "./helpers";
import PageNameEnum from "@/core/types/enums/pageNameEnum";

// ---------------------------------------------------------------------------------------------------------------------
// setup
// ---------------------------------------------------------------------------------------------------------------------

// special routes
const unmatched = "/:pathMatch(.*)*";
const unguarded = ["/login", "/logout"];

// create router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes : [
    route("/", PageNameEnum.HOME),
    route("/Register", PageNameEnum.REGISTER), 
  ]
});

// set up auth and guard routes
router.beforeEach(async (_to, _from, next) => {
  // unguarded
  next();
});

export default router;
