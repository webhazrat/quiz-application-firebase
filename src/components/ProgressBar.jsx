import { useRef, useState } from "react";
import Button from "./Button";
import MiniPlayer from "./MiniPlayer";

export default function ProgressBar({
  next,
  prev,
  save,
  progress,
  youtubeId,
  title,
}) {
  const [tooltip, setTooltip] = useState(false);
  const tooltipRef = useRef();

  function toggleTooltip() {
    if (tooltip) {
      setTooltip(false);
      tooltipRef.current.style.display = "none";
    } else {
      setTooltip(true);
      tooltipRef.current.style.display = "block";
    }
  }

  return (
    <>
      <div className="fixed w-full bottom-10">
        <div className="container flex items-center gap-4 mt-4 bg-white p-4 rounded-md">
          <Button type="button" className="w-auto" onClick={prev}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
          </Button>
          <div className="flex-grow relative">
            <div className="h-1 w-full bg-gray-200 rounded-full">
              <div
                className="relative h-full bg-indigo-500 rounded-full"
                style={{ width: `${progress}%` }}
              >
                <div
                  ref={tooltipRef}
                  className="bg-gray-800 hidden text-white px-3 rounded-full absolute whitespace-nowrap bottom-4 right-0 translate-x-1/2"
                >
                  {progress}% complete!
                </div>
                <div
                  onMouseOver={toggleTooltip}
                  onMouseOut={toggleTooltip}
                  className="absolute h-4 w-4 bg-indigo-500 rounded-full right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                ></div>
              </div>
            </div>
          </div>
          <Button
            type="button"
            className="flex items-center gap-2 w-auto"
            onClick={progress === 100 ? save : next}
          >
            {progress === 100 ? "Submit Quiz" : "Next Question"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </Button>
          <MiniPlayer youtubeId={youtubeId} title={title} />
        </div>
      </div>
    </>
  );
}
