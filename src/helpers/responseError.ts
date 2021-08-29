import { errorMsgDefault } from '../config';

export const responseError = (data: Record<string, unknown>): string => {
    const errorsObj = data;
    const errors = [];

    if (errorsObj) {
        if (typeof errorsObj === 'string') {
            errors.push(`- ${JSON.stringify(errorsObj)}`);
        } else {
            for (let i = 0, l = Object.keys(errorsObj).length; i < l; i += 1) {
                errors.push(`- ${(errorsObj[Object.keys(errorsObj)[i]] as string[]).join('\n')}`);
            }
        }
    } else {
        errors.push(`- ${errorMsgDefault}`);
    }

    return errors.toString();
};
