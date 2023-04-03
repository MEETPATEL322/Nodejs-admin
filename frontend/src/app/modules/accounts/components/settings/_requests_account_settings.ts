import axios from 'axios'
import {IUpdatePassword} from './SettingsModel'

export function ChangePassword(currentPassword: string,
    newPassword: string,
    passwordConfirmation: string,
    id: string | undefined,
    ) {
    return axios.put<IUpdatePassword>(`${process.env.REACT_APP_API_URL}/ChangePassword/${id}`, {
        currentPassword,
        newPassword,
        passwordConfirmation
    })
}