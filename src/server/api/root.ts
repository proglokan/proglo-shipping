import { createTRPCRouter } from "~/server/api/trpc";
import { balanceRouter } from "./routers/balance";
import { shippingHistoryRouter } from "./routers/shippingHistory";
import { pricingRouter } from "./routers/pricing";
import { invoiceRouter } from "./routers/invoice";
import { labelRouter } from "./routers/label";
import { userDataRouter } from "./routers/userData";
import { duoplaneRouter } from "./routers/duoplane";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  balance: balanceRouter,
  shippingHistory: shippingHistoryRouter,
  pricing: pricingRouter,
  invoice: invoiceRouter,
  label: labelRouter,
  userData: userDataRouter,
  duoplane: duoplaneRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
