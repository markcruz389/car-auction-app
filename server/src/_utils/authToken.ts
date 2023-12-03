const splitToken = (
    token: string
): { payload: string; signatureAndHeader: string } => {
    const [header, payload, signature] = token.split(".");
    const signatureAndHeader = `${header}.${signature}`;

    return { payload, signatureAndHeader };
};

const constructToken = (
    payload: string,
    signatureAndHeader: string
): string => {
    const [header, signature] = signatureAndHeader.split(".");
    return `${header}.${payload}.${signature}`;
};

export { splitToken, constructToken };
