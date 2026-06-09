import vision from "@google-cloud/vision";

const client =
  new vision.ImageAnnotatorClient({
    keyFilename:
      "./config/google-vision.json",
  });

export const generateTags = (
  event,
  fileType
) => {
  const tags = [];

  const titleWords =
    event.title
      .toLowerCase()
      .split(" ");

  tags.push(...titleWords);

  switch (
    event.category
  ) {
    case "Technical":
      tags.push(
        "technology",
        "innovation",
        "coding",
        "project"
      );
      break;

    case "Sports":
      tags.push(
        "sports",
        "outdoor",
        "activity",
        "competition"
      );
      break;

    case "Cultural":
      tags.push(
        "culture",
        "festival",
        "celebration",
        "performance"
      );
      break;

    case "Workshop":
      tags.push(
        "learning",
        "training",
        "skills",
        "education"
      );
      break;

    default:
      tags.push("event");
  }

  if (
    fileType === "image"
  ) {
    tags.push(
      "image",
      "photo"
    );
  }

  if (
    fileType === "video"
  ) {
    tags.push(
      "video",
      "recording"
    );
  }

  tags.push(
    event.location.toLowerCase()
  );

  return [
    ...new Set(tags),
  ];
};

export const detectFaces =
  async (imageUrl) => {
    try {
      const [result] =
        await client.faceDetection({
          image: {
            source: {
              imageUri:
                imageUrl,
            },
          },
        });

      const faces =
        result.faceAnnotations ||
        [];

      console.log(
        "GOOGLE FACES FOUND:",
        faces.length
      );

      return faces.map(
        (face) => ({
          confidence:
            face.detectionConfidence,
        })
      );
    } catch (error) {
      console.error(
        "FACE DETECTION ERROR:",
        error
      );

      return [];
    }
  };