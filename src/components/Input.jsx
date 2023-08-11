export default function Input({ label, type, id, ...rest }) {
  return (
    <>
      <div>
        <label
          htmlFor={id}
          className="block font-medium leading-6 text-gray-800"
        >
          {label}
        </label>
        <div className="mt-2">
          <input
            type={type}
            name={id}
            id={id}
            {...rest}
            className="block w-full rounded-md border-0 px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset  focus:ring-indigo-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </>
  );
}
