import Answers from "./Answers";

export default function Questions({ answers = [] }) {
  return (
    <>
      {answers.map((answer, index) => (
        <div className="p-4 bg-white shadow-sm mb-4" key={index}>
          <h2 className="font-medium mb-3">{answer.title}</h2>
          <Answers input={false} options={answer.options} />
        </div>
      ))}
    </>
  );
}
