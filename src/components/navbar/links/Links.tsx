"use client";

import React, { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";

export type linkType = {
  title: string;
  path: string;
};

const links: linkType[] = [
  { title: "Homepage", path: "/" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
  { title: "Blog", path: "/blog" },
];

const Links = () => {
  const [open, setOpen] = useState(false);

  const session = false;
  const isAdmin = false;
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link: linkType) => (
          <NavLink item={link} key={link.title} />
        ))}
        {!session ? (
          <NavLink item={{ title: "login", path: "/login" }} />
        ) : (
          <>
            {isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}

            <button className={styles.logout}>logout</button>
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
