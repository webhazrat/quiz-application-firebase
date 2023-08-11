export default function Checkbox({ className, id, label, ...rest }) {
  return (
    <>
      <label htmlFor={id} className={`${className} flex items-center gap-2`}>
        <input type="checkbox" name={id} id={id} {...rest} /> {label}
      </label>
    </>
  );
}
