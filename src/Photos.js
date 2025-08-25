import "./Photos.css";

export default function Photos(props) {
  if (props.photos) {
    return (
      <div className="Photos container text-center">
        <div className="row">
          {props.photos.map(function (photo, index) {
            if (index < 3) {
              return (
                <div className="col" key={index}>
                  <a href={photo.src.original} target="_blank" rel="noreferrer">
                    <img
                      src={photo.src.landscape}
                      className="img-fluid"
                      alt={photo.alt}
                    />
                  </a>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
