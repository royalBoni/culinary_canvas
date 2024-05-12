"use client";
import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import "./recipiesNav.css";

export const recipyHeaderItems = [
  { name: "ALL", items: [] },
  {
    name: "CATEGORIES",
    items: ["Desert", "Vegetarian", "Salad", "Pizza", "Appetizer"],
  },
  { name: "INGREDIENTS", items: ["Tofu", "Banana"] },
  { name: "COUNTRY", items: ["Greece", "Italy"] },
];

const randomColorGenerator = () => {
  const colors = [
    "border-yellow-500",
    "border-purple-500",
    "border-indigo-500, border-green-500",
  ];
  const x = 4;
  const rand = Math.floor(Math.random() * x) + 1;
  return colors[rand - 1];
};

const NavigationMenuDemo = () => {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className="flex gap-5 bg-black rounded-full p-3 text-white">
        {recipyHeaderItems.map((recipyHeaderItem, index) => (
          <NavigationMenu.Item key={index}>
            <NavigationMenu.Trigger className="p-2 font-bold">
              {recipyHeaderItem.name}
            </NavigationMenu.Trigger>
            {recipyHeaderItem.items.length > 1 && (
              <NavigationMenu.Content className="NavigationMenuContent bg-black flex gap-5 p-5 rounded-lg">
                {recipyHeaderItem.items.map((item, index) => (
                  <ListItem title={item} key={index}></ListItem>
                ))}
              </NavigationMenu.Content>
            )}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

type ListItemProps = {
  className?: string;
  children?: React.ReactNode;
  title?: string;
};

const ListItem = React.forwardRef(
  (
    { className, children, title, ...props }: ListItemProps,
    forwardedRef: React.Ref<HTMLAnchorElement>
  ) => (
    <li>
      <NavigationMenu.Link asChild>
        <a
          /* className={classNames("ListItemLink", className)} */
          {...props}
          ref={forwardedRef}
        >
          <div
            className={`ListItemHeading border-4 ${randomColorGenerator()}  p-3 rounded-full hover:bg-gray-400`}
          >
            {title}
          </div>
          <p className="ListItemText">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);

ListItem.displayName = "ListItem";

export default NavigationMenuDemo;
