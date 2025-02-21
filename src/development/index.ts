import { CreativeValidator } from "../main/creative-validator";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <button id="file-selector">Select file</button>
`;

const button = document.querySelector<HTMLButtonElement>("#file-selector")!;

button.addEventListener("click", async () => {
  const opts = {
    suggestedName: "data",
    types: [
      {
        description: "File selector",
        accept: { "image/*": [], "video/*": [] },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  };
  const [handle] = await window.showOpenFilePicker(opts);

  console.log(await handle.getFile());
});
