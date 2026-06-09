import { useEffect, useState } from "react";
import {
  getAllMedia,
  likeMedia,
  favoriteMedia,
  deleteMedia,
  tagUser,
} from "../services/mediaService";

import { getEvents } from "../services/eventService";

import {
  createComment,
  getComments,
} from "../services/commentService";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "./MediaGallery.css";
import DashboardLayout from "../layouts/DashboardLayout";

function MediaGallery() {
  const [media, setMedia] = useState([]);
  const [filteredMedia, setFilteredMedia] =
    useState([]);

  const [events, setEvents] = useState([]);

  const [selectedEvent, setSelectedEvent] =
    useState("");

  const [selectedType, setSelectedType] =
    useState("");

  const [searchTag, setSearchTag] =
    useState("");

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const [comments, setComments] = useState(
    {}
  );

 const [commentText, setCommentText] =
  useState({});

const [tagInput, setTagInput] =
  useState({});
const user = JSON.parse(
  localStorage.getItem("user")
);

  useEffect(() => {
    fetchMedia();
    fetchEvents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [
    media,
    selectedEvent,
    selectedType,
    searchTag,
  ]);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMedia = async () => {
    try {
      const data = await getAllMedia();

      setMedia(data);

      const commentMap = {};

      for (const item of data) {
        const mediaComments =
          await getComments(item._id);

        commentMap[item._id] =
          mediaComments;
      }

      setComments(commentMap);
    } catch (error) {
      console.error(error);
    }
  };

  const applyFilters = () => {
    let filtered = [...media];

if (
  user?.role !== "admin" &&
  user?.role !== "photographer"
) {
  filtered = filtered.filter(
    (item) =>
      item.visibility ===
      "public"
  );
}

    if (selectedEvent) {
      filtered = filtered.filter(
        (item) =>
          item.eventId === selectedEvent
      );
    }

    if (selectedType) {
      filtered = filtered.filter(
        (item) =>
          item.fileType === selectedType
      );
    }

    if (searchTag.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.tags?.some((tag) =>
            tag
              .toLowerCase()
              .includes(
                searchTag.toLowerCase()
              )
          )
      );
    }

    setFilteredMedia(filtered);
  };

  const handleLike = async (
    mediaId
  ) => {
    try {
      await likeMedia(mediaId);
      fetchMedia();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavorite =
    async (mediaId) => {
      try {
        await favoriteMedia(mediaId);
        fetchMedia();
      } catch (error) {
        console.error(error);
      }
    };

  const handleShare = (url) => {
    navigator.clipboard.writeText(url);

    alert("Link copied!");
  };

  const handleComment =
    async (mediaId) => {
      try {
        if (!commentText[mediaId]) return;

        await createComment(
          commentText[mediaId],
          mediaId
        );

        setCommentText({
          ...commentText,
          [mediaId]: "",
        });

        fetchMedia();
      } catch (error) {
        console.error(error);
      }
    };
    const handleTag =
  async (mediaId) => {
    try {
      if (!tagInput[mediaId])
        return;

      await tagUser(
        mediaId,
        tagInput[mediaId]
      );

      setTagInput({
        ...tagInput,
        [mediaId]: "",
      });

      fetchMedia();
    } catch (error) {
      console.error(error);
    }
  };
const handleDelete =
  async (mediaId) => {
    const confirmDelete =
      window.confirm(
        "Delete this media?"
      );

    if (!confirmDelete)
      return;

    try {
      await deleteMedia(
        mediaId
      );

      fetchMedia();

      alert(
        "Media deleted successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Delete failed"
      );
    }
  };
  const imageSlides = filteredMedia
    .filter(
      (item) => item.fileType === "image"
    )
    .map((item) => ({
      src: item.fileUrl,
    }));

  return (
    <DashboardLayout>
    <div className="gallery-container">
      <h2
  style={{
    color: "#1e40af",
    fontSize: "36px",
    marginBottom: "25px",
  }}
>
  Uploaded Media
</h2>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <select
          value={selectedEvent}
          onChange={(e) =>
            setSelectedEvent(
              e.target.value
            )
          }
        >
          <option value="">
            All Events
          </option>

          {events.map((event) => (
            <option
              key={event._id}
              value={event._id}
            >
              {event.title}
            </option>
          ))}
        </select>

        <select
          value={selectedType}
          onChange={(e) =>
            setSelectedType(
              e.target.value
            )
          }
        >
          <option value="">
            All Types
          </option>

          <option value="image">
            Images
          </option>

          <option value="video">
            Videos
          </option>
        </select>

        <input
          type="text"
          placeholder="Search tags..."
          value={searchTag}
          onChange={(e) =>
            setSearchTag(
              e.target.value
            )
          }
        />
      </div>

      <div className="gallery-grid">
        {filteredMedia.map((item) => (
          <div
            key={item._id}
            className="gallery-item"
          >
            {item.fileType ===
            "image" ? (
              <img
                src={item.fileUrl}
                alt="Uploaded"
                onClick={() => {
                  const imageIndex =
                    filteredMedia
                      .filter(
                        (m) =>
                          m.fileType ===
                          "image"
                      )
                      .findIndex(
                        (m) =>
                          m._id ===
                          item._id
                      );

                  setIndex(
                    imageIndex
                  );
                  setOpen(true);
                }}
                style={{
                  cursor:
                    "pointer",
                }}
              />
            ) : (
              <video
                src={item.fileUrl}
                controls
                preload="metadata"
                className="gallery-video"
              />
            )}

            <div
              style={{
                marginTop: "10px",
              }}
            >
              <button
  onClick={() =>
    handleLike(item._id)
  }
  style={{
    background: "#e11d48",
    color: "white",
  }}
>
  ❤️ Like
</button>

              <p>
                {item.likesCount || 0} Likes
              </p>

              <button
  onClick={() =>
    handleFavorite(item._id)
  }
  style={{
    background: "#f59e0b",
    color: "white",
  }}
>
  ⭐ Favorite
</button>

              <p>
                {item.favoritesCount ||
                  0}{" "}
                Favorites
              </p>

              <button
  onClick={() =>
    handleShare(item.fileUrl)
  }
  style={{
    background: "#2563eb",
    color: "white",
  }}
>
  📤 Share
</button>
{(user?.role ===
  "admin" ||
  user?.role ===
    "photographer") && (
  <button
    onClick={() =>
      handleDelete(
        item._id
      )
    }
    style={{
      marginLeft: "10px",
      background:
        "#dc2626",
      color: "white",
    }}
  >
    🗑 Delete
  </button>
)}
<button
  style={{
    background: "#16a34a",
    color: "white",
  }}
  onClick={async () => {
    try {
      if (
        item.fileType !==
        "image"
      ) {
        const response =
          await fetch(
            item.fileUrl
          );

        const blob =
          await response.blob();

        const url =
          URL.createObjectURL(
            blob
          );

        const a =
          document.createElement(
            "a"
          );

        a.href = url;
        a.download =
          "media-file";

        a.click();

        URL.revokeObjectURL(
          url
        );

        return;
      }

      const image =
        new Image();

      image.crossOrigin =
        "anonymous";

      image.src =
        item.fileUrl;

      image.onload = () => {
        const canvas =
          document.createElement(
            "canvas"
          );

        canvas.width =
          image.width;

        canvas.height =
          image.height;

        const ctx =
          canvas.getContext(
            "2d"
          );

        ctx.drawImage(
          image,
          0,
          0
        );

        const watermarkText =
          item.watermark ||
          "CIG Gallery";

        ctx.font =
          "bold 30px Arial";

        ctx.fillStyle =
          "rgba(255,0,0,0.75)";

        ctx.fillRect(
          10,
          image.height - 80,
          700,
          60
        );

        ctx.fillStyle =
          "white";

        ctx.fillText(
          watermarkText,
          20,
          image.height - 40
        );

        const link =
          document.createElement(
            "a"
          );

        link.download =
          "watermarked-image.png";

        link.href =
          canvas.toDataURL(
            "image/png"
          );

        link.click();
      };
    } catch (error) {
      console.error(
        error
      );

      alert(
        "Download failed"
      );
    }
  }}
>
  ⬇️ Download
</button>
              <br />
              <br />

             <input
  type="text"
  placeholder="Add comment"
  value={
    commentText[
      item._id
    ] || ""
  }
  onChange={(e) =>
    setCommentText({
      ...commentText,
      [item._id]:
        e.target.value,
    })
  }
/>

<button
  onClick={() =>
    handleComment(
      item._id
    )
  }
>
  Post
</button>

<br />
<br />

<input
  type="text"
  placeholder="Tag Person"
  value={
    tagInput[
      item._id
    ] || ""
  }
  onChange={(e) =>
    setTagInput({
      ...tagInput,
      [item._id]:
        e.target.value,
    })
  }
/>

<button
  onClick={() =>
    handleTag(
      item._id
    )
  }
>
  🏷 Tag
</button>

<div
  style={{
    background: "#f5f5f5",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "10px",
  }}
>
  <p>
    🏷️ Tags:{" "}
    {item.tags?.join(", ") ||
      "No Tags"}
  </p>
</div>

<div
  style={{
    background: "#eef2ff",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "10px",
  }}
>
  🛡 Watermark:{" "}
  {item.watermark ||
    "Not Available"}
</div>

<p>
  👥 Tagged Users:{" "}
  {item.taggedUsers
    ?.join(", ") ||
    "None"}
</p>

<p>
  👤 Faces Detected:{" "}
  {item.facesDetected?.length || 0}
</p>
<div
  style={{
    marginTop: "10px",
    background: "#f9fafb",
    padding: "10px",
    borderRadius: "8px",
  }}
>
  {comments[
    item._id
  ]?.map(
    (comment) => (
      <p
        key={
          comment._id
        }
      >
        💬{" "}
        {comment.text}
      </p>
    )
  )}
</div>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() =>
          setOpen(false)
        }
        slides={imageSlides}
        index={index}
      />
    </div>
    </DashboardLayout>
  );
}

export default MediaGallery;