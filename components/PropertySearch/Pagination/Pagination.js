export const Pagination = ({ totalPages, onPaginationClick }) => {
  const pages = Array.from({ length: totalPages }); // creates array from a number
  console.log({ totalPages }, { pages }, pages.length);
  return (
    <div className="max-w-5xl mx-auto mb-10 flex justify-center gap-2">
      {pages.map((_, index) => {
        const currentPage = index + 1;
        return (
          <div
            key={index}
            className="link-button"
            onClick={() => onPaginationClick(currentPage)}
          >
            {currentPage}
          </div>
        );
      })}
    </div>
  );
};
