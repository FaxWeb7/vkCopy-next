import { APP_URL } from "@/constants/constants";

export const Posts: Array<{link: string, avatarPath: string, firstName: string, lastName: string, time: string, text: string, image?: string}> = [
  {
    link: 'asd',
    avatarPath: `${APP_URL}/avatars/defaultAvatar.jpg`,
    firstName: 'Артем',
    lastName: 'Павловский',
    time: '9 авг 2022',
    text: 'Какой-либо текст',
    image: `${APP_URL}/avatars/defaultAvatar.jpg`
  },
  {
    link: 'asd',
    avatarPath: `${APP_URL}/avatars/defaultAvatar.jpg`,
    firstName: 'Артем',
    lastName: 'Павловский',
    time: '9 авг 2022',
    text: 'Какой-либо текст',
    image: `${APP_URL}/avatars/defaultAvatar.jpg`
  },
]