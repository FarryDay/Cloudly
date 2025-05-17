import useUserStore from '@/stores/user.store'
import { Avatar } from '@nextui-org/react'

export default function HeaderAvatar() {
	const { user } = useUserStore()

	if (!user) return <></>

	return <Avatar size='sm' color='primary' name={user.username} />
}
