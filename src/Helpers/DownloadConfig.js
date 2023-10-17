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



export const populateOis = (configData, AIRNODE_WALLET_MNEMONIC, SECURITY_SCHEME_VALUES, ois, CloudFormation, mode = "cloud", callback) => {
    const config = configData === null ? null : JSON.parse(configData);
    if (config == null) return;
    if (config.ois === null) return;
    if (config.ois.length === 0) return;

    if (config.airnodeWalletMnemonic === null) return;

    config.airnodeWalletMnemonic = AIRNODE_WALLET_MNEMONIC;
    config.apiCredentials = SECURITY_SCHEME_VALUES;

    const mnemonicTest = testMnemonic(AIRNODE_WALLET_MNEMONIC);
    if (mnemonicTest.status === false) {
        callback({ status: false, message: mnemonicTest.message, mode: mode });
        return;
    }

    let API_KEY = "";
    ois.forEach((ois) => {
        SECURITY_SCHEME_VALUES.forEach((item) => {
            API_KEY += `\\n${ois.title.toUpperCase()}_API_KEY=${item.securitySchemeValue}`;
        });
    });

    const secrets = `WALLET_MNEMONIC=${AIRNODE_WALLET_MNEMONIC}${API_KEY}`;

    switch (mode) {
        case "cloud":
            downloadCloudFormation(CloudFormation, secrets);
            break;
        case "env":
            downloadEnv(secrets);
            break;
        case "docker":
            downloadDocker(secrets);
            break;
        default:
            break;
    }

    callback({ status: true, message: "File downloaded successfully", mode: mode });
};

const downloadDocker = (SECRETS, CONFIG = "https://raw.githubusercontent.com/metobom/pusher-operations/master/data/apis/cryptocompare/deployments/11-10-2023/cryptocompare-pusher-config.json") => {
    let cmd = `bin/bash\n`
    cmd = cmd + "echo \"Downloading docker image\"\ndocker pull api3/pusher:0.1.0-rc2\n"
    cmd = cmd + "echo \"Starting docker container\"\ndocker stop pusher || true && docker rm pusher || true\n"
    cmd = cmd + `SECRETS_ENV='${SECRETS.replaceAll(/(\\)/g, "\\\\")}'\n`
    cmd = cmd + `docker run --detach --name pusher --entrypoint /bin/sh api3/pusher:0.1.0-rc2 -c "echo -e $SECRETS_ENV >> /app/config/secrets.env && wget -q -O - ${CONFIG} >> /app/config/pusher.json && node --enable-source-maps dist/index.js"`

    const jsonString = `data:text/plain;chatset=utf-8,${cmd}`;

    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "docker-pusher.sh";
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

const downloadEnv = (secrets) => {

    const jsonString = `data:text/plain;base64,${btoa(secrets.replaceAll(/(\\n)/g, "\n"))}`;

    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "secrets.env";
    link.click();
}
