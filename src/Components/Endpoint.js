import React from "react";
import { VStack } from "@chakra-ui/react";
import FeedRowView from "../Custom/FeedRowView";

import parserTypeScript from "prettier/parser-babel";
import prettier from "prettier/standalone";
import ExpandableView from "../Custom/ExpandableView";

const Hero = ({ endpoint, servers }) => {

    const prettify = (object) => {
        try {
            const newObject = object.map((code, index) => {
                const filtered = code.value.replaceAll(/(\\n)|( )|(\\")/g, "")
                const pret = prettier.format(filtered, {
                    parser: "babel",
                    plugins: [parserTypeScript],
                });
                return pret
            })

            if (newObject == null) return []
            const split = newObject[0].split("\n")

            const feedArray = split.map((item) => {
                return (item.replaceAll(/(")|( )|(,)/g, "").split(":"))
            })

            let final = []
            for (let i = 0; i < feedArray.length; i++) {
                if (feedArray[i].length === 0) continue
                if (!new RegExp(/[A-Z0-9]+\/[A-Z0-9]+/, "g").test(feedArray[i][0])) continue
                final.push(feedArray[i])
            }
            return final
        } catch (error) {
            return []
        }
    }

    const combine = () => {
        const postProcessingSpecifications = prettify(endpoint.postProcessingSpecifications)
        const preProcessingSpecifications = prettify(endpoint.preProcessingSpecifications)

        const combined = postProcessingSpecifications.map((item, index) => {
            return {
                feed: item[0],
                code: item[1],
                preProcessingSpecifications: preProcessingSpecifications[index][1].replaceAll("{", ""),
                preProcessingSpecificationsValue: preProcessingSpecifications[index][2].replaceAll("}", ""),
            }
        })
        return combined
    }

    return (
        <VStack alignItems={"left"}>
            {
                combine().map((feed, index) => (
                    <VStack key={index} alignItems={"left"} width={"100%"}>
                        <ExpandableView view={<FeedRowView feed={feed} servers={servers} />} header={feed.feed} />
                    </VStack>
                ))
            }
        </VStack>
    );
};

export default Hero;
