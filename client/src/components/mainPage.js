import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import GET_ME from "../utils/queries";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { GET_ALGO } from '../utils/queries'
import Sandwich from "../pieces/sandwich"
import ReadMe from "../pieces/markdown"
import CodeWindows from '../pieces/codeoutput'


const MainPage = () => {

    const algoId = useParams();
    const algoNum = Number(algoId.algoId || 1)
    const { loading, data, error } = useQuery(GET_ALGO, { variables: { number: algoNum } })
    const algoData = data?.algo
    const [initialData, setInitialData] = useState({});
    console.log('initialData', initialData)
    console.log('algoData', algoData)

    useEffect(() => {
        if (algoData) {
            setInitialData(algoData)
        }
    }, [algoData])

    return (
        <>
            {/* {!Auth.loggedIn() && <Navigate to="/login" />} */}
            {loading ? (
                <></>
            ) : (
                <div className="algopage-container">
                    <Sandwich />
                    <div className="algo-l">
                        <ReadMe data={initialData.readMe} />
                    </div>
                    <div className="algo-r">
                        <CodeWindows data={initialData} />
                    </div>
                </div>
            )}
        </>
    )
}

export default MainPage;