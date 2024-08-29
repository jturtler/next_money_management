import { BsStars } from "react-icons/bs";
import { useMainUi } from "@/contexts/MainUiContext";
import * as Constant from '@/lib/constants';
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";


export default function Header() {
	
	const { mainPage, setMainPage } = useMainUi();
	const { user, logout } = useAuth();
	const [scrolled, setScrolled] = useState(false);

	const handleLogout = () => {
		const ok = confirm("are you sure you want to logout ?");
		if( ok ) {
			logout();
			setMainPage(Constant.PAGE_LOGIN);
		}
	}

	return ( 
		<header className={`p-4 shadow-md border-b-2 border-slate-300`}>
			<div className="flex justify-between items-center ">
				<div className="flex flex-row">
					<div className="uppercase text-xl tracking-wider hidden mx-3 md:block" style={{ letterSpacing: "8px" }}>
						Personal Expense Management
					</div>
					<div className="uppercase text-xs tracking-wider md:hidden" style={{ letterSpacing: "3px" }}>
						Personal Expense Management
					</div>
					<div className="flex flex-col text-secondary uppercase text-xs">
						<BsStars size={15} className="text-red-600 "/>
					</div>
				</div>

				<div className="flex-grow"></div>
				
				{mainPage === Constant.PAGE_LOGIN  && <div onClick={() => setMainPage(Constant.PAGE_USER_REGISTRATION)} className="flex flex-row space-x-2 items-center text-sm border border-slate-400 px-4 py-1 rounded-md">
					<div className="bg-living-coral w-2 h-2 rounded-full mr-2"></div>
					<button>Register</button>
				</div>}

				{mainPage === Constant.PAGE_USER_REGISTRATION && <div  onClick={() => setMainPage(Constant.PAGE_LOGIN)} className="flex flex-row space-x-2 items-center text-sm border border-slate-400 px-4 py-1 rounded-md">
					<div className="bg-living-coral w-2 h-2 rounded-full"></div>
					<button>Login</button>
				</div>}

				{user !== null && <div  onClick={() => handleLogout()} className="flex flex-row space-x-2 items-center text-sm border border-slate-400 px-4 py-1 rounded-md">
					<div className="bg-living-coral w-2 h-2 rounded-full"></div>
					<button>Logout</button>
				</div>}
			</div>

		</header>
    )
}