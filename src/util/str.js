export function getChatId(userId, targetId) {
  return [userId, targetId].sort().join('_')
}