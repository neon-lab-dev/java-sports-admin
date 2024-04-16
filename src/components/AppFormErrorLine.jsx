const AppFormErrorLine = ({ message, className = "" }) => {
  return (
    <span className={`text-primary text-xs md:text-sm ${className}`}>
      {message}
    </span>
  );
};

export default AppFormErrorLine;
