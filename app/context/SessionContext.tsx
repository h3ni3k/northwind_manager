"use client";

import { validateRequest } from "@/lib/auth";
import { ReactNode, createContext, useContext } from "react";

type ContextType = Awaited<ReturnType<typeof validateRequest>>;

export const SessionContext = createContext<ContextType>({
	session: null,
	user: null,
});

export function SessionProvider({
	children,
	value,
}: { children: ReactNode; value: ContextType }) {
	return (
		<SessionContext.Provider value={value}>{children}</SessionContext.Provider>
	);
}

export const useSession = () => useContext(SessionContext);
