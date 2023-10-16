import { useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";
import { extractFeeds } from "../Helpers/Utils";
import FeedGroupView from "../Custom/FeedGroupView";
import FeedCompareGroupView from "../Custom/FeedCompareGroupView";

const Endpoint = ({ oldOis, newOis }) => {
  const [comparison, setComparison] = useState(null);

  useEffect(() => {
    setComparison(null);

    if (oldOis.length === 0) return;
    if (newOis.length === 0) return;

    const comparison = extractFeeds(oldOis, newOis);
    setComparison(comparison);
  }, [newOis, oldOis]);

  return oldOis == null || newOis === null ? null : comparison ===
    null ? null : (
    <VStack alignItems={"left"}>
      {comparison.compareFeeds.added.map((feed, index) => (
        <FeedGroupView
          key={index}
          endpoint={comparison.endpointsNew[0]}
          index={index}
          feed={feed}
          server={comparison.serverNew}
          title={"Added"}
          status={1}
        />
      ))}
      {comparison.compareFeeds.removed.map((feed, index) => (
        <FeedGroupView
          key={index}
          endpoint={comparison.endpointsOld[0]}
          index={index}
          feed={feed}
          server={comparison.serverNew}
          title={"Removed"}
          status={2}
        />
      ))}
      {comparison.compareFeeds.updated.map((feed, index) => (
        <FeedCompareGroupView
          key={index}
          index={index}
          feed={feed}
          server={comparison.serverNew}
          title={"Updated"}
          status={3}
        />
      ))}
      {comparison.compareFeeds.unchanged.map((feed, index) => (
        <FeedGroupView
          key={index}
          endpoint={comparison.endpointsNew[0]}
          index={index}
          feed={feed}
          server={comparison.serverNew}
          title={"Unchanged"}
          status={0}
        />
      ))}
    </VStack>
  );
};

export default Endpoint;
