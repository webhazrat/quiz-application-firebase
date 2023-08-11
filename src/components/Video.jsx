export default function Video({ title, id, noq }) {
  return (
    <>
      <div className="bg-white p-3 shadow-sm rounded-sm">
        <img
          src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
          alt={title}
          className="aspect-video w-full"
        />
        <div className="mt-2">
          <h2 className="text-[16px] font-medium">{title}</h2>
          <div className="flex items-center justify-between">
            <p>{noq} Questions</p>
            <p>Total Points : {noq * 5}</p>
          </div>
        </div>
      </div>
    </>
  );
}
