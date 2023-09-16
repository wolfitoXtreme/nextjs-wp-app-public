import React from "react";

import { getTextAlign } from "utils/texts";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";

export const Paragraph = ({ textAlign, content, textColor }) => {
  return (
    <p
      dangerouslySetInnerHTML={{ __html: relativeToAbsoluteUrls(content) }}
      className={`max-w-5xl mx-auto ${getTextAlign(textAlign)}`}
      style={{ color: textColor }}
    />
  );
};
