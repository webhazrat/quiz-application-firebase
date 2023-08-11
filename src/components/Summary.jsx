export default function Summary({ score, noq }) {
  return (
    <>
      <div className="bg-white shadow rounded-md p-5">
        <h2 className="text-xl text-center">
          Your score in{" "}
          <span className="block text-indigo-500 font-semibold">
            {score} out of {noq * 5}
          </span>
        </h2>
      </div>
    </>
  );
}
