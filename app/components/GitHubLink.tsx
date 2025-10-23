import { Github } from "lucide-react";

const GitHubLink = () => {
  const githubUrl = "https://github.com/devolasvegas/book-wishlist-nextjs";

  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="border-2 border-foreground rounded-full p-2 hover:bg-foreground hover:text-background transition duration-300"
      title="View the code for this app on GitHub"
    >
      <Github />
    </a>
  );
};

export default GitHubLink;
