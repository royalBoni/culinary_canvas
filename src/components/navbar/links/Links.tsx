"use client";

import React, { useState } from "react";
import styles from "./links.module.css";
import NavLink from "@/components/navbar/links/NavLink/NavLink";
import Image from "next/image";
import { Button } from "@/components/Button";

export type linkType = {
  title: string;
  path: string;
};

const links: linkType[] = [
  { title: "Recipies", path: "/recipies" },
  { title: "Chefs", path: "/chefs" },
  { title: "Blog", path: "/blog" },
  { title: "FAQ", path: "/" },
];

const Links = () => {
  const [open, setOpen] = useState(false);

  const sessionLoggedIn = false;
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link: linkType) => (
          <NavLink item={link} key={link.title} />
        ))}
        {!sessionLoggedIn ? (
          <NavLink item={{ title: "login", path: "/login" }} />
        ) : (
          <>
            {<NavLink item={{ title: "Profile", path: "/profile" }} />}

            <Button>logout</Button>
          </>
        )}
      </div>
      <Image
        className={styles.menuButton}
        src={"/menu.png"}
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.path} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
