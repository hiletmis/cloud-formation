

export const cut = (object, initialMatch, finalMatch, replaceQuotes = true) => {
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

export const combine = (endpoint) => {
    if (endpoint === null || endpoint === undefined || endpoint.length === 0) return []
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

export const getEndpoints = (ois) => {
    let endpoints = []
    ois.map((ois, index) => (
        ois.endpoints.filter((endpoint) => endpoint.name === "feed").map((endpoint, index) => (
            endpoints.push(endpoint)
        ))
    ))
    return endpoints
}

export const getFeeds = (endpoints) => {
    let feeds = []
    endpoints.map((endpoint) => (
        feeds.push(combine(endpoint))
    ))
    return feeds
}

const onlyInLeft = (left, right, compareFunction) =>
    left.filter(leftValue =>
        !right.some(rightValue =>
            compareFunction(leftValue, rightValue)));

export const compareFeeds = (oldFeeds, newFeeds) => {
    let newAdded = []
    let newRemoved = []
    let newUnchanged = []

    const isSameFeed = (a, b) => { return a.feed === b.feed; }

    for (let i = 0; i < oldFeeds.length; i++) {
        newAdded.push(onlyInLeft(oldFeeds[i], newFeeds[i], isSameFeed))
        newRemoved.push(onlyInLeft(newFeeds[i], oldFeeds[i], isSameFeed))
        newUnchanged.push(oldFeeds[i].filter(oldFeed => newFeeds[i].some(newFeed => isSameFeed(oldFeed, newFeed))))
    }

    return {
        added: newAdded,
        removed: newRemoved,
        unchanged: newUnchanged
    }
}

export const extractFeeds = (oldOis, newOis) => {
    const oldFeeds = getFeeds(getEndpoints(oldOis))
    const newFeeds = getFeeds(getEndpoints(newOis))

    return {
        compareFeeds: compareFeeds(oldFeeds, newFeeds),
        serverOld: oldOis[0].apiSpecifications.servers,
        serverNew: newOis[0].apiSpecifications.servers
    }
}




