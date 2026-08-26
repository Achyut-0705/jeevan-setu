import { describeJpeg } from "@/lib/human";
import { ApiClientError } from "@/lib/api";

export type FaceEngine = "server" | "client";

/**
 * Builds the body for a face signal.
 *
 * With FACE_ENGINE=server the raw frame is posted and the API extracts the
 * descriptor. With FACE_ENGINE=client (serverless deployments, where the models are
 * far too large for a function bundle) the browser extracts it here and posts only
 * the descriptor — the server still performs the comparison and the scoring, so the
 * client cannot report its own result either way.
 */
export async function buildFacePayload(
  image: string,
  engine: FaceEngine
): Promise<Record<string, unknown>> {
  if (engine !== "client") return { image };

  const reading = await describeJpeg(image);
  if (!reading) {
    throw new ApiClientError(
      422,
      "NO_FACE_DETECTED",
      "We couldn't find a face in that photo. Try again with more light, or use another method."
    );
  }
  return { reading };
}
