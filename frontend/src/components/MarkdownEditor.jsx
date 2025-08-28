import MDEditor from "@uiw/react-md-editor";
import React from "react";

const MarkdownEditor = ({ value, onChange, height }) => {
  return (
    <div data-color-mode="dark">
      <MDEditor value={value} onChange={onChange} height={height} />
    </div>
  );
};

export default MarkdownEditor;
