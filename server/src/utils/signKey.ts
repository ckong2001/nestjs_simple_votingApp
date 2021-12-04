import * as crypto from 'crypto';

export function signKey (clientKey: string, msg: string) {
    const key = new Buffer(clientKey, 'hex');
    return crypto.createHmac('sha256', key).update(msg).digest('hex');
}
