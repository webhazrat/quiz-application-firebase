export default function Button({ children, type, className, ...rest }) {
  return (
    <>
      <button
        type={type}
        {...rest}
        className={`p-2.5 bg-indigo-500 text-white rounded-md font-medium ${className}`}
      >
        {children}
      </button>
    </>
  );
}
