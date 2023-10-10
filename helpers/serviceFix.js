exports.serviceFix = (service) => {
  if (service === "Afaan Oromoo") {
    return "afaanoromoo";
  }
  if (service === "Indonesian") {
    return "indonesia";
  }
  if (service === "Chinese") {
    return "zhongwen";
  }
  if (service === "Turkish") {
    return "turkce";
  }
  if (service === "Brasil") {
    return "portuguese";
  }
  return service;
};
