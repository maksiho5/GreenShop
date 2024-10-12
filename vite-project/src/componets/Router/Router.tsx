import React from 'react'
import Login from '../Login/Login'
import Home from '../Home/Home'
import { Routes, Route } from 'react-router-dom'
import ProivateRouter from '../PrivaterRouter/proivateRouter'
import { AppProvider } from '../context/AppContext'
import Basket from '../Basket/Basket'
import Search from '../Search/Search'
function Router() {
    return (
        <>
            <Routes>
                <Route element={<ProivateRouter />}>
                    <Route path='/login' element={<Login />} />
                </Route>

                <Route path='/' element={
                    <AppProvider>
                        <Home />
                    </AppProvider>
                } />
                <Route path='/basket' element={
                    <AppProvider>
                        <Basket />
                    </AppProvider>
                } /> 
                
                <Route path='/search' element={
                    <AppProvider>
                        <Search />
                    </AppProvider>
                } /> 
            </Routes>
        </>


    )
}

export default Router