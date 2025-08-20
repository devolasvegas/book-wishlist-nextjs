const Footer: React.FC = () => {
  return (
    <footer className="mt-8 mb-4 text-center text-sm text-gray-500">
      <p>
        &copy; {new Date().getFullYear()} Book Wishlist App. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
