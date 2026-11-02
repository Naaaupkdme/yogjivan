import { createFileRoute, Outlet } from "@tanstack/react-router";

// Path layout: catalogue and product details are separate leaf routes.
export const Route = createFileRoute("/vi/cua-hang")({ component: ShopLayout });
function ShopLayout() { return <Outlet />; }