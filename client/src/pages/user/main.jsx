import React from 'react'
import Card from '../admin/card'


const MainPage = () => {
    return (
        <>
            <Card ata={tasks} user={users} loading={loading} />
        </>
    )
}

export default MainPage
