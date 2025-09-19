
export function sanitizeJsonFromAI(input: string): string {
  const jsonStart = input.indexOf("[");
  const jsonEnd = input.lastIndexOf("]");

  if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
    throw new Error("AI-аас ирсэн хариу JSON форматтай биш байна");
  }

  let jsonSubstring = input.substring(jsonStart, jsonEnd + 1);

  jsonSubstring = jsonSubstring.replace(/,\s*([\]}])/g, "$1");


  jsonSubstring = jsonSubstring.replace(/\n/g, "\\n").replace(/\r/g, "");

  return jsonSubstring;
}
