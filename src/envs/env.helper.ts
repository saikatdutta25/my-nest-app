export default async () => {
    let env=(process.env.NODE_ENV||"prod").trim();
    var settings= await import(`./env.${env}`);
    return settings;
}