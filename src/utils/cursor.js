const encodeCursor = (updatedAt, id) => {
  const payload = `${updatedAt.toISOString()}|${id}`;
  return Buffer.from(payload).toString('base64');
};

const decodeCursor = (cursor) => {
  if (!cursor) return null;
  try {
    const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
    const [updatedAtStr, id] = decoded.split('|');
    return {
      updatedAt: new Date(updatedAtStr),
      id: BigInt(id)
    };
  } catch {
    return null;
  }
};

module.exports = { encodeCursor, decodeCursor };