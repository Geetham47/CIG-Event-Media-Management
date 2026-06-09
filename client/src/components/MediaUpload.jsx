import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { uploadMedia } from "../services/mediaService";
import { getEvents } from "../services/eventService";
import DashboardLayout from "../layouts/DashboardLayout";

function MediaUpload() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [message, setMessage] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] =
    useState("");
  const [visibility, setVisibility] =
    useState("public");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();

      console.log("EVENTS:", data);

      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);

    const previewUrls =
      acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );

    setPreviews(previewUrls);
  };

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "image/*": [],
      "video/*": [],
    },
  });

  const handleUpload = async () => {
    if (!selectedEvent) {
      setMessage(
        "Please select an event"
      );
      return;
    }

    if (files.length === 0) {
      setMessage(
        "Please select files"
      );
      return;
    }

    try {
      const data =
        await uploadMedia(
          files,
          selectedEvent,
          visibility
        );

      setMessage(data.message);

      setFiles([]);
      setPreviews([]);
      setSelectedEvent("");
      setVisibility("public");
    } catch (error) {
      console.error(error);
      setMessage("Upload failed");
    }
  };

  return (
    <DashboardLayout>
      <div>
        <h2
  style={{
    color: "#1e40af",
    fontSize: "2.2rem",
    marginBottom: "20px",
  }}
>
  Upload Media
</h2>

        {/* Event Selection */}

        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <label>
            Select Event:
          </label>

          <select
            value={
              selectedEvent
            }
            onChange={(e) =>
              setSelectedEvent(
                e.target.value
              )
            }
            style={{
              padding: "8px",
              marginLeft:
                "10px",
            }}
          >
            <option value="">
              Choose Event
            </option>

            {events.map(
              (event) => (
                <option
                  key={
                    event._id
                  }
                  value={
                    event._id
                  }
                >
                  {event.title}
                </option>
              )
            )}
          </select>
        </div>

        {/* Visibility */}

        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <label>
            Visibility:
          </label>

          <select
            value={visibility}
            onChange={(e) =>
              setVisibility(
                e.target.value
              )
            }
            style={{
              padding: "8px",
              marginLeft:
                "10px",
            }}
          >
            <option value="public">
              Public
            </option>

            <option value="private">
              Private
            </option>
          </select>
        </div>

        {/* Drag & Drop */}

        <div
          {...getRootProps()}
          style={{
            border:
              "2px dashed #888",
            padding: "30px",
            marginBottom:
              "20px",
            borderRadius:
              "10px",
            cursor: "pointer",
            textAlign:
              "center",
          }}
        >
          <input
            {...getInputProps()}
          />

          <p>
            Drag & Drop files
            here
          </p>

          <p>
            or click to select
            files
          </p>
        </div>

        {/* Preview */}

        {previews.length >
          0 && (
          <div>
            <h3>Preview</h3>

            <div
              style={{
                display:
                  "flex",
                flexWrap:
                  "wrap",
                gap: "10px",
              }}
            >
              {files.map(
                (
                  file,
                  index
                ) => {
                  const preview =
                    previews[
                      index
                    ];

                  return file.type.startsWith(
                    "video"
                  ) ? (
                    <video
                      key={
                        index
                      }
                      src={
                        preview
                      }
                      width="200"
                      controls
                      style={{
                        borderRadius:
                          "8px",
                      }}
                    />
                  ) : (
                    <img
                      key={
                        index
                      }
                      src={
                        preview
                      }
                      alt="Preview"
                      width="200"
                      style={{
                        borderRadius:
                          "8px",
                      }}
                    />
                  );
                }
              )}
            </div>
          </div>
        )}

        <button
          onClick={
            handleUpload
          }
        >
          Upload
        </button>

        <p>{message}</p>
      </div>
    </DashboardLayout>
  );
}

export default MediaUpload;