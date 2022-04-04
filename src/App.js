import "./App.css";
import Todos from "./components/pages/Todos";
import Navbar from "./components/organisms/Navbar";
import Footer from "./components/organisms/Footer";

export default function App() {
	return (
		<div className="container">
			<Navbar />
			<main>
				<Todos />
			</main>
			<Footer />
		</div>
	);
}
