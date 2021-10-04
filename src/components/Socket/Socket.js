import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import { socketUrl } from '../../env';

export function SocketInit(username, roomId, password, action, options) {
    const token = Cookies.get('cards-profile');
    const socket = io(`${socketUrl}`, {
        path: '/classic-mode',
        transports: ['websocket'],
        query: {
            username,
            roomId,
            password,
            action,
            token,
            options: options && JSON.stringify(options)
        }
    });
    return socket;
}