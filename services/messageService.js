const db = require('../db/queries')

const createConversation = async (conversationId, next) => {
    if (conversationId) {
        return conversationId;
    } else {
        const conversation = await db.createConversation();
        return conversation.id;
    }
};

const getUserId = async (user, next) => {
    if (user && user.id) {
        return user.id;
    } else if (user && user.email) {
        const userRecord = await db.getUserByEmail(user.email);
        return userRecord.id;
    } else  {
        return Error('No user email or id');
    }
};

const createMessage = async (req, resp, next) => {
    const response = await Promise.all([
        createConversation(req.body.conversationId, next),
        getUserId(req.body.user, next)
    ]);

    const conversationId = response[0];
    const userId = response[1];
    const messageResponse = await db.createMessage(conversationId, req.body.messageText, userId);

    // error handling

    return resp.status(200).send({conversationId, userId});
};

const getConversationMessages = async (req, resp, next) => {
    const messages = await db.getMessagesByConversationId(req.params.conversationId);
    console.log(messages);
    return resp.status(200).send({messages: messages});
};

module.exports = {
    createMessage,
    getConversationMessages
}