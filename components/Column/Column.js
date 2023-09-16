export const Column = ({ children, width, textColor, backgroundColor }) => {
  const styles = {
    ...(textColor && { color: textColor }),
    ...(backgroundColor && { backgroundColor }),
    ...(width
      ? { minWidth: width, flexGrow: 1 }
      : { flexGrow: 1, flexBasis: 0 }),
  };

  return (
    <div style={styles} className="px-2 py-5">
      {children}
    </div>
  );
};
