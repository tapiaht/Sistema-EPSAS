export function jsonResponse(statuscode, body) {
  return {
    statuscode,
    body: body,
  };
}