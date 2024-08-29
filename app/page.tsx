"use client";

import Header from "./ui/layout/Header";
import Footer from "./ui/layout/Footer";
import AppWrapper from "./ui/AppWrapper";
import { MainUiProvider } from "./contexts/MainUiContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { CategoryProvider } from "./contexts/CategoryContext";

export default function Home() {

	return (
		<main>
			<MainUiProvider>
				<AuthProvider>
					<CategoryProvider>
						<div className="h-screen flex flex-col">
							<Header />
								<AppWrapper />
							<Footer />
						</div>
					</CategoryProvider>
				</AuthProvider>
			</MainUiProvider>
		</main>
	)
}
