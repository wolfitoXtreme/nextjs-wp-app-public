import { v4 as uuid } from "uuid";

export const cleanAndTransformBlocks = (blocksJSON) => {
  const blocks = JSON.parse(JSON.stringify(blocksJSON)); // converts data into an object

  const assignIds = (b) => {
    b.forEach((block) => {
      block.id = uuid();
      if (block.innerBlocks?.length) {
        // recursive functions
        assignIds(block.innerBlocks);
      }
    });
  };

  assignIds(blocks);

  return blocks;
};
