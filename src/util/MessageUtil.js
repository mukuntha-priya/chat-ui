import {URL} from "../constants";
import React from "react";

export const getMessageContent = (messages, userId, addLinkForSenders, openDirectMessage, replyTo) => {
    return messages.map((message) => {
        let sender;
        if (addLinkForSenders && message.sender.id !== userId) {
            sender = <a href="#" onClick={() => openDirectMessage(message.sender.id)}>{message.sender.name}</a>;
        } else {
            sender = message.sender.name;
        }
        const color = { color: getThreadColor(message.thread_id) };
        const replyToIcon =
            <i style={color} className="fa fa-reply" title="Reply to thread"
               onClick={() => replyTo(message.id)}/>;
        return mapMessage(userId, message, sender, replyToIcon);
    });
};

function mapMessage(userId, message, sender, replyToIcon) {
    const formattedTime = new Date(message.created_at).toLocaleString();
    const messageText = <div><span>{sender} at {formattedTime}: {replyToIcon}</span><br/>{message.content}</div>;
    return {
        "type": message.sender.id === userId ? 0 : 1,
        "image": URL.getImage(),
        "text": messageText
    };
}

export const getOriginalMessage = (allMessages, userId, originalMessageId) => {
    const messages = allMessages.filter((message) => message.id === originalMessageId);
    return messages.map((message) => {
        const sender = message.sender.name;
        const color = { color: getThreadColor(message.thread_id) };
        const replyToIcon =
            <i style={color} className="fa fa-reply" title="Reply to thread"/>;
        return mapMessage(userId, message, sender, replyToIcon);
    });
};

export const getMessagesInThread = (allMessages, userId, threadId) => {
    const messages = allMessages.filter((message) => message.thread_id === threadId);
    return messages.map((message) => {
        const sender = message.sender.name;
        const color = { color: getThreadColor(message.thread_id) };
        const replyToIcon =
            <i style={color} className="fa fa-reply" title="Reply to thread"/>;
        return mapMessage(userId, message, sender, replyToIcon);
    });
};

const getThreadColor = (threadId) => threadId ? THREAD_COLORS[threadId % THREAD_COLORS.length] : DEFAULT_COLOR;

const DEFAULT_COLOR = '#FFFFFF';
const THREAD_COLORS = [
    '#F0F8FF',
    '#00FFFF',
    '#7FFFD4',
    '#000000',
    '#0000FF',
    '#8A2BE2',
    '#A52A2A',
    '#5F9EA0',
    '#7FFF00',
    '#D2691E',
    '#FF7F50',
    '#DC143C',
    '#00FFFF',
    '#00008B',
    '#B8860B',
    '#006400',
    '#8B008B',
    '#8B0000',
    '#FFD700',
    '#DAA520',
    '#ADFF2F',
    '#FF69B4',
];
