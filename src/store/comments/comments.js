import { defineStore } from 'pinia'
import commentsService from '@/services/CommentsService';
import Message from '@/models/Message';

export const useComments = defineStore('comments', {
    state: () => ({
        comments: [],
        myComment: null,
    }),
    getters: {},
    actions: {
        async fetchMessages() {
            this.comments = await commentsService.fetchComments() ?? [];
        },
        async writeMessage({ message, rating }) {
            let author = await commentsService.getUser();
            const uid = author.uid;
            author = author.name;
            const getDate = new Date().toLocaleDateString('uk-UA', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }).slice(0, -3);

            const newMessage = new Message({
                author,
                rating,
                date: getDate,
                message,
            });

            const { result } = await commentsService.sendCommentByProfile(uid, newMessage);

            if (!result) {
                return {
                    result: false,
                }
            }
            return {
                result,
                message: newMessage,
            };
        }
    },
});
