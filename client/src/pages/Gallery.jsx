import { useEffect, useState } from "react";
import { getAllMedia } from "../services/mediaService";
import "./Gallery.css";

function Gallery() {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const data =
        await getAllMedia();

      setMedia(data);
    } catch (error) {
      console.error(
        "Error fetching media:",
        error
      );
    }
  };

  return (
    <div className="gallery-container">
      <h1
  style={{
    color: "#1e40af",
    fontSize: "42px",
    fontWeight: "700",
    marginBottom: "25px",
  }}
>
  Gallery
</h1>

      <div className="gallery-grid">
        {media.map((item) => (
          <div
            key={item._id}
            className="gallery-item"
          >
            {item.fileType ===
            "image" ? (
              <img
                src={item.fileUrl}
                alt="uploaded media"
              />
            ) : (
              <video
                src={item.fileUrl}
                controls
              />
            )}

            {/* Dynamic Watermark */}

            <div
              style={{
                marginTop: "10px",
                padding: "6px",
                background:
                  "#f5f5f5",
                borderRadius: "6px",
                fontSize: "12px",
                color: "#555",
                fontWeight: "600",
                textAlign: "center",
                wordBreak:
                  "break-word",
              }}
            >
              ©{" "}
              {item.watermark ||
                "CIG Gallery"}
            </div>

            {/* Face Detection */}

            {item.facesDetected &&
              item.facesDetected
                .length > 0 && (
                <div
                  style={{
                    marginTop:
                      "8px",
                    color:
                      "#28a745",
                    fontWeight:
                      "bold",
                    textAlign:
                      "center",
                  }}
                >
                  👤 Faces Found:{" "}
                  {
                    item
                      .facesDetected
                      .length
                  }
                </div>
              )}

            {/* Tags */}

            {item.tags &&
              item.tags.length >
                0 && (
                <div
                  style={{
                    marginTop:
                      "10px",
                    fontSize:
                      "12px",
                    color:
                      "#666",
                    textAlign:
                      "center",
                  }}
                >
                  🏷️{" "}
                  {item.tags.join(
                    ", "
                  )}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;