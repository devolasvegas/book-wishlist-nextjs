import GitHubLink from "./GitHubLink";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col gap-10 justify-center items-center pb-10 text-sm text-gray-500">
      <p>&copy; {new Date().getFullYear()} Story Shelf. All rights reserved.</p>
      <GitHubLink />
    </footer>
  );
};

export default Footer;
