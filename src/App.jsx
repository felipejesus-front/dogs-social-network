import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import User from "./Components/User/User";
import Login from "./Components/Login/Login";
import { UserStorage } from "./UserContext";
import ProtectedRouter from "./Components/Helper/ProtectedRouter";
import Photo from "./Components/Photo/Photo";
import UserProfile from "./Components/User/UserProfile";
import NotFound from "./Components/NotFound";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<UserStorage>
					<Header />

					<main className="AppBody">
						<Routes>
							<Route
								path="/dogs-social-network"
								element={<Home />}
							/>
							<Route
								path="dogs-social-network/login/*"
								element={<Login />}
							/>
							<Route
								path="dogs-social-network/foto/:id"
								element={<Photo />}
							/>
							<Route
								path="dogs-social-network/perfil/:user"
								element={<UserProfile />}
							/>
							<Route
								path="dogs-social-network/conta/*"
								element={
									<ProtectedRouter>
										<User />
									</ProtectedRouter>
								}
							/>
							<Route path="*" element={<NotFound />} />
						</Routes>
					</main>

					<Footer />
				</UserStorage>
			</BrowserRouter>
		</div>
	);
}

export default App;
