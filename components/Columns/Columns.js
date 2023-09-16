export const Columns = ({
  children,
  isStackedOnMobile,
  textColor,
  backgroundColor,
}) => (
  <div className="my-10">
    <div
      className={`${
        isStackedOnMobile ? "block md:flex" : "flex"
      } max-w-5xl mx-auto`}
      style={{ color: textColor, backgroundColor }}
    >
      {children}
    </div>
  </div>
);
