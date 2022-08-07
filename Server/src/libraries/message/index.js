import { SERVER_OPCODE } from "../../consts/server_opcode";
import { CHAT } from "../../consts";

export const LoginProfile = () => {
    return [SERVER_OPCODE.LOGIN_PROFILE]
}

export const LoginAvatars = () => {
    return [SERVER_OPCODE.LOGIN_AVATARS]
}

export const LoadMessagesOnChat = (messages, chat_group_type = CHAT.GROUP.GLOBAL) => {
    return [SERVER_OPCODE.ROOM_STATE, [0, messages], chat_group_type];
}

export const ClearMyChat = () => {
    return LoadMessagesOnChat([]);
}