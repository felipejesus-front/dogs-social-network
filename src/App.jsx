import { HashRouter, Route, Routes } from "react-router-dom";
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
			<HashRouter>
				<UserStorage>
					<Header />

					<main className="AppBody">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="login/*" element={<Login />} />
							<Route path="foto/:id" element={<Photo />} />
							<Route
								path="perfil/:user"
								element={<UserProfile />}
							/>
							<Route
								path="conta/*"
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
			</HashRouter>
		</div>
	);
}

export default App;
