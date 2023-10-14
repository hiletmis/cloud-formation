import React from "react";
import { VStack } from "@chakra-ui/react";
import FeedRowView from "../Custom/FeedRowView";
import { combine } from "../Helpers/Utils";

import ExpandableView from "../Custom/ExpandableView";

const Endpoint = ({ endpoint, servers }) => {
  return (
    <VStack alignItems={"left"}>
      {combine(endpoint).map((feed, index) => (
        <VStack key={index} alignItems={"left"} width={"100%"}>
          <ExpandableView
            view={
              <FeedRowView endpoint={endpoint} feed={feed} servers={servers} />
            }
            header={feed.feed}
          />
        </VStack>
      ))}
    </VStack>
  );
};

export default Endpoint;
