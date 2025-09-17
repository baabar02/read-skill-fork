export function sanitizeJsonFromAI(input: string): string {
 
  const jsonStart = input.indexOf("[");
  const jsonEnd = input.lastIndexOf("]");

  if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
    throw new Error("AI-аас ирсэн хариу JSON форматтай биш байна");
  }

  const jsonSubstring = input.substring(jsonStart, jsonEnd + 1);

  return jsonSubstring;
}
