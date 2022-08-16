const saveJSON = (data, filename) => {
  if (!filename) filename = "json.json";
  if (typeof data === "object") {
    data = JSON.stringify(data, undefined, 4);
  }
  const blob = new Blob([data], { type: "text/json" }),
    a = document.createElement("a");
  a.download = `${filename}.json`;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
  a.click()
}
export default saveJSON