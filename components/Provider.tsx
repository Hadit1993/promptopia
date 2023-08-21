"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { FC, PropsWithChildren } from "react";

const Provider: FC<PropsWithChildren<{ session?: Session }>> = ({
  children,
  session,
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
