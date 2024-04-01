import { logout } from "@/actions/auth.actions";
import { Button } from "./ui/button";
import useSession from "../app/context/SessionContext";
export default function Navbar() {
	const x = useSession();
	return (
		<nav>
			<p>Navbar</p>
			<form action={logout}>
				<Button>Logout</Button>
			</form>
		</nav>
	);
}
