export const cut = (
  object,
  initialMatch,
  finalMatch,
  replaceQuotes = true,
  setError
) => {
  try {
    const newObject = object.map((code, index) => {
      let sanitized = code.value.replaceAll(/(\n)/g, "");
      sanitized = sanitized.replace(/ +(?= )/g, "");

      const object = sanitized.match(initialMatch);

      let filtered = replaceQuotes
        ? object[0].replaceAll(/(\\n)|(\\)|(")/g, "")
        : object[0].replaceAll(/(\\n)/g, "");
      filtered = filtered.replace(/ +(?= )/g, "");

      return filtered;
    });

    if (newObject == null || newObject === undefined) return [];
    const splitParanthesis = newObject[0].match(finalMatch);

    let final = [];

    for (let i = 0; i < splitParanthesis.length; i++) {
      const split = splitParanthesis[i].split(/:(.*)/s);
      final.push(split);
    }

    return final;
  } catch (error) {
    setError(error);
  }

  return [];
};

export const combine = (endpoint, setError) => {
  if (endpoint === null || endpoint === undefined || endpoint.length === 0)
    return [];
  const postProcessingSpecifications = cut(
    endpoint.postProcessingSpecifications,
    /{.+}/g,
    /[A-Z0-9]+\/[A-Z]+: (?:\(+)(.+?)(?:\)+) => (?:\{ +)(.+?)(?: \}+)/g,
    true,
    setError
  );
  const preProcessingSpecifications = cut(
    endpoint.preProcessingSpecifications,
    /{.+" }, },}/g,
    /["A-Z0-9]+\/[A-Z"]+: (?:\{+)(.+?)(?:, \}+)/g,
    false,
    setError
  );

  const combined = postProcessingSpecifications.map((item, index) => {
    const specifications = preProcessingSpecifications.filter(
      (j) => j[0].replaceAll(/(\\n)|(\\)|(")/g, "") === item[0]
    );
    const preProcessingSpecificationsValue =
      specifications.length > 0 ? specifications : [["", ""]];

    return {
      feed: item[0],
      code: item[1],
      preProcessingSpecificationsValue: preProcessingSpecificationsValue[0][1],
    };
  });

  return combined;
};

export const getEndpoints = (ois) => {
  let endpoints = [];
  ois.map((ois, index) =>
    ois.endpoints
      .filter((endpoint) => endpoint.name === "feed")
      .map((endpoint, index) => endpoints.push(endpoint))
  );
  return endpoints;
};

export const getFeeds = (endpoints) => {
  let feeds = [];
  endpoints.map((endpoint) => feeds.push(combine(endpoint)));
  return feeds;
};

const onlyInLeft = (left, right, compareFunction) =>
  left.filter(
    (leftValue) =>
      !right.some((rightValue) => compareFunction(leftValue, rightValue))
  );

export const compareFeeds = (newFeeds, oldFeeds) => {
  let newAdded = [];
  let newRemoved = [];
  let newUpdated = [];
  let newUnchanged = [];

  const isSameFeed = (a, b) => {
    return a.feed === b.feed;
  };
  const isCodeChanged = (a, b) => {
    return (
      a.feed === b.feed &&
      (a.code !== b.code ||
        a.preProcessingSpecificationsValue !==
        b.preProcessingSpecificationsValue)
    );
  };
  const isUnchanged = (a, b) => {
    return (
      a.feed === b.feed &&
      a.code === b.code &&
      a.preProcessingSpecificationsValue === b.preProcessingSpecificationsValue
    );
  };

  for (let i = 0; i < oldFeeds.length; i++) {
    newRemoved.push(onlyInLeft(oldFeeds[i], newFeeds[i], isSameFeed));
    newAdded.push(onlyInLeft(newFeeds[i], oldFeeds[i], isSameFeed));

    let tmp = [];
    newFeeds[i].filter((newFeed) => {
      return oldFeeds[i].some((oldFeed) => {
        const result = isCodeChanged(newFeed, oldFeed);
        if (result) {
          tmp.push({ oldFeed: oldFeed, newFeed: newFeed });
        }
        return result;
      });
    });
    newUpdated.push(tmp);
    newUnchanged.push(
      newFeeds[i].filter((newFeed) =>
        oldFeeds[i].some((oldFeed) => isUnchanged(newFeed, oldFeed))
      )
    );
  }

  return {
    added: newAdded,
    removed: newRemoved,
    updated: newUpdated,
    unchanged: newUnchanged,
  };
};

export const extractFeeds = (newOis, oldOis) => {
  const endpointsOld = getEndpoints(oldOis);
  const endpointsNew = getEndpoints(newOis);

  const oldFeeds = getFeeds(endpointsOld);
  const newFeeds = getFeeds(endpointsNew);

  return {
    compareFeeds: compareFeeds(newFeeds, oldFeeds),
    serverOld: oldOis[0].apiSpecifications.servers,
    serverNew: newOis[0].apiSpecifications.servers,
    endpointsOld: endpointsOld,
    endpointsNew: endpointsNew,
  };
};

export const jsonify = (object, setError) => {
  try {
    var correctJson = object.replace(
      /(['"])?([a-z0-9A-Z_]+)(['"])?:/g,
      '"$2": '
    );
    correctJson = correctJson.replaceAll(/}, }/g, "}}");
    const json = JSON.parse(correctJson);
    return json;
  } catch (error) {
    setError(error);
  }
};

export const getApiCallParameters = (
  preProcessingSpecificationsValue,
  setError
) => {
  const apiCallParameters = jsonify(preProcessingSpecificationsValue, setError);
  if (apiCallParameters === null) return null;
  return apiCallParameters;
};

export const getServerUrl = (servers) => {
  if (servers.length === 0) return "";
  const server = servers[0];
  const url = server.url;
  return url;
};

export const getPath = (feed, servers, setError) => {
  try {
    const path = jsonify(feed.preProcessingSpecificationsValue, setError);
    if (path === undefined) return null;
    if (servers.length === 0) return path;

    const server = servers[0];
    const url = server.url;

    let queryString = "?";

    if (path.parameters === undefined) return path;

    Object.keys(path.parameters).forEach((key) => {
      const value = path.parameters[key];
      queryString += `${key}=${value}&`;
    });

    queryString = queryString.substring(0, queryString.length - 1);

    const pathWithBase = url + "/" + path.path + queryString;
    return pathWithBase;
  } catch (error) {
    setError(error);
  }
};

export const pathFromPrePreProcessing = (parameters, servers) => {
  if (parameters === undefined) return parameters;
  if (servers.length === 0) return parameters;

  const server = servers[0];
  const url = server.url;

  let queryString = "?";
  Object.keys(parameters).forEach((key) => {
    if (key === "path") return;
    const value = parameters[key];
    queryString += `${key}=${value}&`;
  });

  queryString = queryString.substring(0, queryString.length - 1);

  const pathWithBase = url + "/" + parameters.path + queryString;
  return pathWithBase;
};

export const testMnemonic = (mnemonic) => {
  if (mnemonic.split(" ").length !== 12)
    return {
      status: false,
      message: "Invalid mnemonic: Mnemonic must be 12 words",
    };
  if (mnemonic.match(/[^a-zA-Z ]/))
    return {
      status: false,
      message: "Invalid mnemonic: Mnemonic must only contain letters",
    };
  return { status: true, message: "Valid mnemonic" };
};

export const populateOis = (configData, AIRNODE_WALLET_MNEMONIC, SECURITY_SCHEME_VALUES, ois, CloudFormation, local = false) => {
  const config = configData === null ? null : JSON.parse(configData);
  if (config == null) return;
  if (config.ois === null) return;
  if (config.ois.length === 0) return;

  if (config.airnodeWalletMnemonic === null) return;

  config.airnodeWalletMnemonic = AIRNODE_WALLET_MNEMONIC;
  config.apiCredentials = SECURITY_SCHEME_VALUES;

  const mnemonicTest = testMnemonic(AIRNODE_WALLET_MNEMONIC);
  if (mnemonicTest.status === false) {
    alert(mnemonicTest.message);
    return;
  }

  let API_KEY = "";
  ois.forEach((ois) => {
    SECURITY_SCHEME_VALUES.forEach((item) => {
      API_KEY += `\n${ois.title.toUpperCase()}_API_KEY=${item.securitySchemeValue}`;
    });
  });

  const secrets = `WALLET_MNEMONIC=${AIRNODE_WALLET_MNEMONIC}${API_KEY}`;

  if (!local) {
    downloadCloudFormation(CloudFormation, secrets);
    return;
  } else {
    downloadSecrets(secrets);
  }
};

const downloadSecrets = (secrets) => {

  const jsonString = `data:text/plain;base64,${btoa(secrets)}`;

  const link = document.createElement("a");
  link.href = jsonString;
  link.download = "secrets.env";
  link.click();
}


const downloadCloudFormation = (CloudFormation, secrets) => {
  CloudFormation.Resources.MyAppDefinition.Properties.ContainerDefinitions[0].Environment[0].Value =
    secrets;

  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(CloudFormation, null, 2)
  )}`;

  const link = document.createElement("a");
  link.href = jsonString;
  link.download = "CloudFormation.json";
  link.click();

}
