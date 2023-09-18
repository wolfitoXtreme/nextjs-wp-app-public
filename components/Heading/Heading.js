import React from "react";

import { getFontSize, getTextAlign } from "utils/texts";

// 2 is WP default value but null in DB if not specified
export const Heading = ({ textAlign, content, level = 2 }) => {
  const headingTag = React.createElement(`h${level}`, {
    dangerouslySetInnerHTML: { __html: content },
    className: `
      max-w-5xl mx-auto my-5 font-heading
      ${getFontSize(level)} ${getTextAlign(textAlign)}
    `,
  });
  return <>{headingTag}</>;
};
