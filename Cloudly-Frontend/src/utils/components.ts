export function getDefaultAPProps() {
	return {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: 0.5 },
	}
}

export function logout() {
	localStorage.removeItem('jwtToken')
	location.replace('/')
}
