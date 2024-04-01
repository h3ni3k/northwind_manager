"use client";

import { validateRequest } from "@/lib/auth";
import { ReactNode, createContext, useContext } from "react";

type ContextType = Awaited<ReturnType<typeof validateRequest>>;

const SessionContext = createContext<ContextType>({
	session: null,
	user: null,
});

export const useSession = () => useContext(SessionContext);

function SessionProvider({
	children,
	value,
}: { children: ReactNode; value: ContextType }) {
	return (
		<SessionContext.Provider value={value}>{children}</SessionContext.Provider>
	);
}

export default SessionProvider;
