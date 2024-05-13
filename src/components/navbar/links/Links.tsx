"use client";

import React, { useState } from "react";
import styles from "./links.module.css";
import NavLink from "@/components/navbar/links/NavLink/NavLink";
import Image from "next/image";
<<<<<<< HEAD
import { Button } from "@/components/button";
import { UseUserContext } from "@/app/store/userContext";
import { useAlertDialogContext } from "@/app/store/alertDialogContext";
import { UseOperationContext } from "@/app/store/operationsContext";
import { useRouter } from "next/navigation";
import { User, Cross, CrossIcon, Plus } from "lucide-react";
import Link from "next/link";
=======
import { Button } from "@/components/Button";
>>>>>>> 2e1cfca776e0909e9a194407b603b3bb18932a23

export type linkType = {
  title: string;
  path: string;
};

const links: linkType[] = [
  { title: "Recipies", path: "/recipies" },
  { title: "Chefs", path: "/chefs" },
  { title: "Blog", path: "/blog" },
];

const Links = () => {
  const [open, setOpen] = useState(false);

  const { user } = UseUserContext();

  const { openOrCloseAlertDialog } = useAlertDialogContext();
  const { specifyOperation } = UseOperationContext();

  const selectOperation = (operation: string) => {
    openOrCloseAlertDialog(true);
    specifyOperation(operation);
  };

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link: linkType) => (
          <NavLink item={link} key={link.title} />
        ))}
        {!user ? (
          <Button onClick={() => selectOperation("loginOrCreateAccount")}>
            Login
          </Button>
        ) : (
          <>
            <Button>
              <Link href={`/chefs/${user.id}`}>
                <User />
              </Link>
            </Button>
            <Button onClick={() => selectOperation("create-recipe")}>
              <Plus />
            </Button>
            <Button>Log out</Button>
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
