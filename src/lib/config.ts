function required(key: string, defaultValue: string | undefined = undefined) {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Config에 ${key} 데이터가 없습니다.`);
  }

  return value;
}

export const config = {
  gmail: {
    user: required("GMAIL_ID"),
    pass: required("GMAIL_PASS"),
  },
  mongodb: {
    uri: required("MONGO_DB_URI"),
  },
};
