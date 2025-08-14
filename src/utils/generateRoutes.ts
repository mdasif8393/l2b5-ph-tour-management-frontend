import { ISidebarItem } from "@/types";

// create routes from data
export const generateRoutes = (sidebarItems: ISidebarItem[]) => {
  return sidebarItems.flatMap((section) =>
    section.items.map((route) => ({
      path: route.url,
      Component: route.component,
    }))
  );
};

/**
 * section: 
{
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },

 * route
{
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
 */
