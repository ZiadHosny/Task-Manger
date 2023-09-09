export const getFromEnv = () => {
    const port = Number(process.env.PORT) || 5000;
    const mongoDBUrl = process.env.MONGO_DB_URL || '';
    const secretKey = process.env.SECRET_KEY || 'SECRETKEYfortaskmanger';
    const rounds = Number(process.env.ROUNDS) || 8;
    const mode = process.env.MODE;
    return {
        port,
        mongoDBUrl,
        secretKey,
        rounds,
        mode
    };
};
