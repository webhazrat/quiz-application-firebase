import { useState } from "react";
import useVideoList from "../hooks/useVideoList";
import Video from "./Video";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Videos() {
  const [page, setPage] = useState(1);
  const { loading, error, videos, hasMore } = useVideoList(page);
  return (
    <>
      <div>
        {videos.length > 0 && (
          <InfiniteScroll
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
            dataLength={videos.length}
            hasMore={hasMore}
            loader={<div className="text-center col-span-4">Loading...</div>}
            next={() => setPage(page + 8)}
          >
            {videos.map((video, index) =>
              video.noq > 0 ? (
                <Link
                  to={`/quiz/${video.youtubeID}`}
                  state={{ title: video.title }}
                  key={index}
                >
                  <Video
                    title={video.title}
                    id={video.youtubeID}
                    noq={video.noq}
                  />
                </Link>
              ) : (
                <Video
                  key={index}
                  title={video.title}
                  id={video.youtubeID}
                  noq={video.noq}
                />
              )
            )}
          </InfiniteScroll>
        )}

        {error && <div>There was an error!</div>}
        {!loading && videos.length === 0 && <div>No data found!</div>}
        {loading && <div>Loading...</div>}
      </div>
    </>
  );
}
