import { LoggedInUser } from "./types"

let user = { name: '', token: '' } as LoggedInUser

if (localStorage['user']) {
    user = JSON.parse(localStorage['user'] ?? '')
}

export const loggedInUser = user 