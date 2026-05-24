import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center mb-8 rounded-lg">
      <Link
        to="/"
        className="text-2xl font-bold"
      >
        CollegeFinder
      </Link>

      <div className="flex gap-6">
        <Link to="/">Home</Link>

        <a href="#predictor">
          Predictor
        </a>

        <a href="#compare">
          Compare
        </a>
      </div>
    </nav>
  );
}

export default Navbar;