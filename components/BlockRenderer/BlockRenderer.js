import theme from "theme";
import Image from "next/image"; // NextJS image component

import { Cover } from "components/Cover";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { Gallery } from "components/Gallery";
import { CallToActionButton } from "components/CallToActionButton";
import { Columns } from "components/Columns";
import { Column } from "components/Column";
import { PropertySearch } from "components/PropertySearch";
import { PropertyFeatures } from "components/PropertyFeatures";
import { FormSpreeForm } from "components/FormSpreeForm";
import { TickItem } from "components/TickItem";

import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";

export const BlockRenderer = ({ blocks }) => {
  return blocks.map((block) => {
    const { name, id, attributes, innerBlocks, originalContent } = block;
    console.log(
      `BlockRenderer - ${name}:::`,
      { id },
      { innerBlocks },
      { block },
      { attributes }
    );

    switch (name) {
      case "core/post-title":
      case "core/heading": {
        return (
          <Heading
            key={id}
            level={attributes.level}
            content={attributes.content}
            textAlign={attributes.textAlign}
          />
        );
      }

      case "core/paragraph": {
        return (
          <Paragraph
            key={id}
            content={attributes.content}
            textAlign={attributes.align}
            textColor={
              theme[attributes.textColor] || attributes.style?.color?.text
            }
          />
        );
      }

      case "core/list": {
        return (
          <ul key={id}>
            {/* recursive functions */}
            {innerBlocks && <BlockRenderer blocks={innerBlocks} />}
          </ul>
        );
      }

      case "core/list-item": {
        return (
          <li
            key={id}
            dangerouslySetInnerHTML={{
              __html: relativeToAbsoluteUrls(originalContent),
            }}
          />
        );
      }

      case "core/image": {
        const { url, width, height } = attributes;

        return (
          <Image key={id} alt="" src={url} width={width} height={height} />
        );
      }

      case "core/gallery": {
        const { columns, imageCrop } = attributes;
        return (
          <Gallery
            key={id}
            images={innerBlocks}
            cropImages={imageCrop}
            columns={columns}
          />
        );
      }

      case "core/block":
      case "core/group": {
        if (innerBlocks) {
          return <BlockRenderer key={id} blocks={innerBlocks} />;
        }
        return null;
      }

      case "core/cover": {
        return (
          <Cover key={id} background={attributes.url}>
            {/* recursive functions */}
            {innerBlocks && <BlockRenderer blocks={innerBlocks} />}
          </Cover>
        );
      }

      case "core/columns": {
        const { isStackedOnMobile, textColor, backgroundColor } = attributes;

        // console.log(
        //   `BlockRenderer - ${name}:::`,
        //   { id },
        //   { innerBlocks },
        //   { block },
        //   { attributes },
        //   { textColor },
        //   { backgroundColor },
        //   theme[attributes.backgroundColor],
        //   attributes.style?.color?.text
        // );

        return (
          <Columns
            key={id}
            isStackedOnMobile={isStackedOnMobile}
            textColor={
              theme[attributes.textColor] || attributes.style?.color?.text
            }
            backgroundColor={
              theme[attributes.backgroundColor] ||
              attributes.style?.color?.background
            }
          >
            {/* recursive functions */}
            {innerBlocks && <BlockRenderer blocks={innerBlocks} />}
          </Columns>
        );
      }

      case "core/column": {
        const { width } = attributes;
        return (
          <Column
            key={id}
            width={width}
            textColor={
              theme[attributes.textColor] || attributes.style?.color?.text
            }
            backgroundColor={
              theme[attributes.backgroundColor] ||
              attributes.style?.color?.background
            }
          >
            {/* recursive functions */}
            {innerBlocks && <BlockRenderer blocks={innerBlocks} />}
          </Column>
        );
      }

      // custom blocks
      case "acf/tickitem": {
        const {
          data: { label, destination, alignment },
        } = attributes;

        return (
          <TickItem key={id}>
            {/* recursive functions */}
            {innerBlocks && <BlockRenderer blocks={innerBlocks} />}
          </TickItem>
        );
      }

      case "acf/ctabutton": {
        const {
          data: { label, destination, alignment },
        } = attributes;

        return (
          <CallToActionButton
            key={id}
            label={label}
            destination={destination || "/"}
            align={alignment}
          />
        );
      }

      case "acf/propertysearch": {
        return <PropertySearch key={id} />;
      }

      case "acf/propertyfeatures": {
        const { price, bedrooms, bathrooms, hasParking, petFriendly } =
          attributes;
        return (
          <PropertyFeatures
            key={id}
            price={price}
            bedrooms={bedrooms}
            bathrooms={bathrooms}
            hasParking={hasParking}
            petFriendly={petFriendly}
          />
        );
      }

      case "acf/formspreeform": {
        const {
          data: { form_id },
        } = attributes;
        return <FormSpreeForm key={id} formId={form_id} />;
      }

      default: {
        console.log("block unknown", { name });
        return null;
      }
    }
  });
};
