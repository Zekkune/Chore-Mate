import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
        <Navbar></Navbar>
        <div className="mx-auto max-w-4xl px-4 mt-6">
        <div className="bg-gray-800 py-12 px-6 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white">Welcome to Chore-Mate!</h1>
        <p className="mt-4 text-lg text-gray-300">Login Below to get started.</p>
        <div className="mt-8">
        <Link to="/login" className="bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out text-white font-semibold py-2 px-6 rounded-lg shadow-lg">Login</Link>
      </div>
    </div>
  </div>
</div>
</>

    )
}