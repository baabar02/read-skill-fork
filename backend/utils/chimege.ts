export const transcribeChimege = async (
  audioBase64: string
): Promise<string> => {
  const CHIMEGE_API_TOKEN: string | undefined = process.env.CHIMEGE_API_TOKEN;

  if (!CHIMEGE_API_TOKEN) {
    throw new Error(
      "CHIMEGE_API_TOKEN is not configured in environment variables."
    );
  }

  const chimegeApiUrl = "https://api.chimege.com/v1.2/transcribe";

  // Base64 string-ийг Buffer болгон хувиргах.
  const audioBuffer: Buffer = Buffer.from(audioBase64, "base64");

  // console.log("Buffer size in bytes:", audioBuffer.length);


  try {
    const response: Response = await fetch(chimegeApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        punctuate: "true",
        token: CHIMEGE_API_TOKEN,
      },
      body: audioBuffer,
    });

    if (!response.ok) {
      const errorBody: string = await response.text();
      // Chimege-ийн API-аас ирсэн алдааг дэлгэрэнгүй харуулах.
      throw new Error(
        `Chimege API request failed with status ${response.status}: ${errorBody}`
      );
    }

    const transcription: string = await response.text();
    return transcription;
  } catch (error) {
    console.error("Error during transcription with Chimege API:", error);
    // Алдааг дахин дамжуулж, дуудаж буй resolver-т боловсруулах боломж олгох.
    throw error;
  }
};
