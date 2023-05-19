import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgLogOut } from 'react-icons/cg'
import Collapse from '@mui/material/Collapse';
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALGOS } from '../utils/queries'

const Sandwich = () => {

    const [open, setOpen] = useState(false);
    const { loading, data, error } = useQuery(GET_ALGOS)
    const algoList = data?.algos

    return (
        <>
            <div className="sandwich">
                {open ? (
                    // <Collapse orientation="horizontal" in={open}>
                    <div className="sandwich-open">
                        <div className='nav-t'>

                            <Link className="burger" onClick={() => setOpen(!open)}>
                                <GiHamburgerMenu className='hamburger' />
                            </Link >
                            <Link className="burger" onClick={() => setOpen(!open)}>
                                <CgLogOut className="hamburger" />
                            </Link >
                        </div>
                        <ul className="algo-list">
                            {algoList.map((item) => (
                                <li key={item.number}><Link to={`/main/${item.number}`}>{item.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                    // </Collapse>
                ) : (
                    <div className="sandwich-close">
                        <a onClick={() => setOpen(!open)}>
                            <GiHamburgerMenu className='hamburger' />
                        </a >
                    </div>
                )}
            </div>
        </>
    )
}

export default Sandwich;