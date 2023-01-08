import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useLoginState from '../../hooks/useLoginState'

function PrivateRoute(props: { children?: React.ReactElement, checkUser?: boolean }) {
    const navigate = useNavigate()
    const isAuthenticated = useLoginState()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [])
    return (
        <>
            {isAuthenticated && <> {props.children} </>}
        </>
    )
}

export default PrivateRoute