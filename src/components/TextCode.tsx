import Prism from "prismjs";
import React, { useEffect } from "react";

require('prismjs/components/prism-json')

type TextCodeProps = {
  code: string;
  language: string;
};

const TextCode = ({ code, language }: TextCodeProps = { code: "", language: "" }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div>
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default TextCode;
