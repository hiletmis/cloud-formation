import React from "react";
import { Text, VStack } from "@chakra-ui/react";
import ExpandableView from "./ExpandableView";
import FeedCompareRowView from "./FeedCompareRowView";

const FeedGroupView = ({ index, feed, server, title, status }) => {
  return (
    <VStack key={index} alignItems={"left"} width={"100%"}>
      <Text fontWeight={"bold"} fontSize={"lg"}>
        {title}
      </Text>
      {feed.map((feed, index) => (
        <VStack key={index} alignItems={"left"} width={"100%"}>
          <ExpandableView
            status={status}
            view={<FeedCompareRowView feed={feed} servers={server} />}
            header={feed.newFeed.feed}
          />
        </VStack>
      ))}
    </VStack>
  );
};

export default FeedGroupView;
