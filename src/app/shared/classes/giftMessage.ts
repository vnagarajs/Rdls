export interface Message {
    sender: string;
    recipient: string;
    message: string;
}

export interface GiftMessage {
    giftMessage: Message;
}