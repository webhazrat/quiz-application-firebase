import { useState } from "react";
import ReactPlayer from "react-player/youtube";
export default function MiniPlayer({ youtubeId, title }) {
  const [show, setShow] = useState(false);
  const videoUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
  return (
    <>
      <div className="relative">
        <div
          className="w-12 h-12 bg-gray-900 text-white rounded-full flex justify-center items-center cursor-pointer"
          onClick={() => setShow(true)}
        >
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
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
            />
          </svg>
        </div>

        {show && (
          <div className="bg-white w-80 p-2 shadow rounded-md absolute bottom-20 right-0">
            <span
              className="absolute top-3 right-3 h-6 w-6 bg-white rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => setShow(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <ReactPlayer
              url={videoUrl}
              playing={show}
              controls
              className="!w-full !h-auto aspect-video"
            />
            <h2 className="font-medium mt-2 leading-5">{title}</h2>
          </div>
        )}
      </div>
    </>
  );
}
