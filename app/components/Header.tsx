import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="mt-4 mb-8">
      <div className="container mx-auto p-4 border border-gray-300 rounded-sm">
        <div className="flex items-center justify-between">
          <p>Book Wishlist App</p>
          <nav>
            <ul>
              <li>
                <Link href="/">Book List</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
