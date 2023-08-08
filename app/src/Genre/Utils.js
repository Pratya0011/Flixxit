// import '../Style/Content.css'


export const template = (genre, content, mediaType, img_base_url,loading,watchlist,toggleWatchlist,clickHandler,navigate) => {
  let modifiedStr = "";
  if (genre.length === 0) {
    return genre;
  } else {
    const firstLetter = genre.charAt(0);
    const remainingLetters = genre.slice(1);
    const modifiedFirstLetter = firstLetter.toUpperCase();
    modifiedStr = modifiedFirstLetter + remainingLetters;
  }
  
  return (
    <div className='util-content'>
      <div className="genre-heading">
        {modifiedStr} {mediaType === "movie" ? "Movies" : "Shows"}
      </div>
      <div className="coloum">
        {loading?(<div className="spinner-div">
        <div className="spinner"></div></div>
      ):(content && content.length > 0 ? (
          content.map((data, index) => (
            <div key={index} className="coloum-container"  style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="coloum-div">
                <img
                  src={img_base_url + data.poster_path}
                  alt={data.name || data.title}
                />
                <div className="row-content">
                      <div className="row-item">
                        <p className="title" onClick={()=>{clickHandler(data._id, navigate)}}>
                          {(
                            data.name ||
                            data.title ||
                            data.original_name
                          ).slice(0, 10) + "..."}
                        </p>
                        {data.release_date && <p className="date">{data.release_date.slice(0, 4)}</p>}
                      </div>
                      {watchlist && watchlist.some((value) => data._id === value._id) ? (
                        <div
                          className="plus"
                          onClick={() => {
                            toggleWatchlist(data._id);
                          }}
                        >
                          ✓
                        </div>
                      ) : (
                        <div
                          className="plus"
                          onClick={() => {
                            toggleWatchlist(data._id);
                          }}
                        >
                          +
                        </div>
                      )}
                    </div>
              </div>
              {mediaType === "movie" ? (
                <p onClick={()=>{clickHandler(data._id, navigate)}}>
                  {data.name || data.title === "Like Stars on Earth"
                    ? "Taare Zameen Par"
                    : data.title.length > 20
                    ? data.title.substring(0, 19) + "...":data.title}
                </p>
              ) : (
                <p onClick={()=>{clickHandler(data._id, navigate)}}>
                  {data.name.length > 20
                    ? data.name.substring(0, 19) + "..."
                    : data.name || data.title}
                </p>
              )}
            </div>
          ))
        ) : (
          <p>No item available</p>
        ))}
      </div>
    </div>
  );
};
