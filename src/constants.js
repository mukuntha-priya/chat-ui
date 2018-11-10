export const URL = {
    getGroupsForUser: (userId) => getURL(`messages/groups/user/${userId}`),
    getDirectMessagesForUser: (userId) => getURL(`messages/dm/user/${userId}`),
    getDirectMessageChat: (directMessageId, userId) => getURL(`messages/dm/${directMessageId}?user=${userId}`),
    getGroupChat: (groupId, userId) => getURL(`messages/groups/${groupId}?user=${userId}`),
    addMessage: () => getURL('messages/add'),
    getAllUsers: () => getURL('all-users'),
    getImage: () => getURL('anonymous.jpg')
};

const getURL = (path) => `http://localhost:8000/slack/${path}`;