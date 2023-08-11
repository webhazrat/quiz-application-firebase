import { Fragment } from "react";
import Checkbox from "./Checkbox";

export default function Answers({ options = [], handleChange, input }) {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        {options.map((option, index) => (
          <Fragment key={index}>
            {input ? (
              <Checkbox
                key={index}
                label={option.title}
                value={index}
                id={`answer${index}`}
                checked={option.checked}
                onChange={(e) => handleChange(e, index)}
                className="bg-gray-100 p-4 rounded-md cursor-pointer"
              />
            ) : (
              <Checkbox
                key={index}
                label={option.title}
                id={`answer${index}`}
                defaultChecked={option.checked}
                disabled
                className={`bg-gray-100 p-4 rounded-md ${
                  option.correct
                    ? "bg-green-200"
                    : option.checked
                    ? "bg-red-200"
                    : ""
                }`}
              />
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
}
