import React from "react";
import { Text, VStack } from "@chakra-ui/react";
import ExpandableView from "./ExpandableView";
import FeedRowView from "./FeedRowView";

const FeedGroupView = ({ index, endpoint, feed, server, title, status }) => {
  return feed.length === 0 ? null : (
    <VStack key={index} alignItems={"left"} width={"100%"}>
      <Text fontWeight={"bold"} fontSize={"lg"}>
        {title}
      </Text>
      {feed.map((feed, index) => (
        <VStack key={index} alignItems={"left"} width={"100%"}>
          <ExpandableView
            status={status}
            view={<FeedRowView endpoint={endpoint} feed={feed} servers={server} tryit={false} />}
            header={feed.feed}
          />
        </VStack>
      ))}
    </VStack>
  );
};

export default FeedGroupView;
