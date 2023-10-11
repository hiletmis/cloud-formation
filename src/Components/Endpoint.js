import React from "react";
import { VStack } from "@chakra-ui/react";
import FeedRowView from "../Custom/FeedRowView";

import ExpandableView from "../Custom/ExpandableView";

const Hero = ({ endpoint, servers }) => {

    const cut = (object, initialMatch, finalMatch, replaceQuotes = true) => {
        try {
            const newObject = object.map((code, index) => {
                const object = code.value.match(initialMatch)

                let filtered = replaceQuotes ? object[0].replaceAll(/(\\n)|(\\)|(")/g, "") : object[0].replaceAll(/(\\n)/g, "")
                filtered = filtered.replace(/ +(?= )/g, '');
                return filtered.substring(1, object[0].length - 1);
            })

            if (newObject == null || newObject === undefined) return []
            const splitParanthesis = newObject[0].match(finalMatch)

            let final = []

            for (let i = 0; i < splitParanthesis.length; i++) {
                const split = splitParanthesis[i].split(/:(.*)/s)
                final.push(split)
            }

            return final
        } catch (error) {
            console.log(error)
        }

        return []
    }

    const combine = () => {
        const postProcessingSpecifications = cut(endpoint.postProcessingSpecifications, /{.+}/g, /[A-Z0-9]+\/[A-Z]+:(?:\(+)(.+?)(?:\)+) => (?:\{+)(.+?)(?:\}+)/g)
        const preProcessingSpecifications = cut(endpoint.preProcessingSpecifications, /{.+"}}}/g, /["A-Z0-9]+\/[A-Z"]+:(?:\{+)(.+?)(?:\}+)/g, false)

        const combined = postProcessingSpecifications.map((item, index) => {
            return {
                feed: item[0],
                code: item[1],
                preProcessingSpecificationsValue: preProcessingSpecifications[index][1],
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
