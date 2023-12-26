import _get from 'lodash/get';
import { toast } from 'react-toastify';

export const toastError = (error: any) => {
    const errorMessages = _get(error, 'data.translation', {});
    const message = _get(errorMessages, 'en', 'Something went wrong');

    toast.error(message);
};
