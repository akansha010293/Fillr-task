"use strict";
const NUMBER_OF_FIELDS = 6; // TODO: Create a better heuristic

const execute = () => {
  try {
    // Extract fields from the current document
    const fields = extractFields();
    // If this is the top frame, listen for messages from child frames
    if (isTopFrame()) {
      const allFields = [...fields];
      window.top.addEventListener("message", (event) => {
        // Check if the message is of type 'fields'
        if (event.data?.type === "fields") {
          allFields.push(...event.data.fields);
          if (allFields.length === NUMBER_OF_FIELDS) {
            const sortedFields = sortObjectByName(allFields);
            sendFramesLoadedEvent(sortedFields);
          }
        }
      });
    } else {
      // If this is not the top frame, post the fields to the top frame
      window.top.postMessage({ type: "fields", fields }, "*");
    }
  } catch (e) {
    console.error(e);
  }
};

// Function to extract fields from the current document
const extractFields = () => {
  const fields = [];
  const formControls = document.querySelectorAll("input, select, textarea");
  for (const control of formControls) {
    const { name = "", labels } = control;
    const label = labels?.[0]?.textContent.trim() || "";
    fields.push({ name, label });
  }
  return fields;
};

// Function to send the 'frames:loaded' event with sorted fields
const sendFramesLoadedEvent = (fields) => {
  const newData = fields.map((item) => ({ [item.name]: item.label }));
  const event = new CustomEvent("frames:loaded", {
    detail: { fields: newData },
  });
  getTopFrame().document.dispatchEvent(event);
};

const sortObjectByName = (fields) => {
  return fields.sort((a, b) =>
    Object.values(a)[0].localeCompare(Object.values(b)[0])
  );
};

const isTopFrame = () => {
  return window === getTopFrame();
};

// Function to get the top frame
const getTopFrame = () => {
  return window.top.frames[0];
};

// Execute the main logic
execute();
