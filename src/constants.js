export const URL = {
    getGroupsForUser: (userId) => getURL(`messages/groups/user/${userId}`),
    getDirectMessagesForUser: (userId) => getURL(`messages/dm/user/${userId}`),
    getDirectMessageChat: (directMessageId, userId) => getURL(`messages/dm/${directMessageId}?user=${userId}`),
    getGroupChat: (groupId, userId) => getURL(`messages/groups/${groupId}?user=${userId}`),
    addMessage: () => getURL('messages/add'),
    getAllUsers: () => getURL('all-users'),
    getImage: () => getURL('anonymous.jpg'),
    getMatchingUsers: (pattern) => getURL(`users?pattern=${pattern}`),
    createGroup: () => getURL('groups'),
    addUsersToGroup: (groupId) => getURL(`groups/${groupId}/users`),
    getOrCreateDirectMessage: (user1, user2) => getURL(`messages/dm?user1=${user1}&user2=${user2}`)
};

export const pollInterval = 10000;

const getURL = (path) => `http://localhost:8000/slack/${path}`;