import { BookCheck, BookAlert } from "lucide-react";

const BookStatusIcon = ({ isRead = false }: { isRead?: boolean }) => {
  return isRead ? (
    <div title="Have Read Book">
      <BookCheck color="#00D390" size={"32px"} />
    </div>
  ) : (
    <div title="Want to Read Book">
      <BookAlert color="#E0A82E" size={"32px"} />
    </div>
  );
};

export default BookStatusIcon;
