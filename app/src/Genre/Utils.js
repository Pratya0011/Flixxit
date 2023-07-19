// import '../Style/Content.css'

export const template = (genre, content, mediaType, img_base_url,loading) => {
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
    <div>
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
                  style={{ height: "30vh", width: "12vw" }}
                  alt={data.name || data.title}
                />
              </div>
              {mediaType === "movie" ? (
                <p>
                  {data.name || data.title === "Like Stars on Earth"
                    ? "Taare Zameen Par"
                    : data.title.length > 20
                    ? data.title.substring(0, 19) + "...":data.title}
                </p>
              ) : (
                <p>
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
