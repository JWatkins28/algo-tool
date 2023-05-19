import React, { useState, useEffect } from "react";
import { Navigate, useParams, useNavigate, useLocation } from "react-router-dom";
import CodeEditorWindow from '../pieces/codebox'
import axios from "axios";

const CodeWindows = (props) => {

    const [outputDetails, setOutputDetails] = useState(null);
    const [code, setCode] = useState(props.data.starterCode || null);
    const [processing, setProcessing] = useState(null);
    const [reload, setReload] = useState(false)
    const location = useLocation();

    const onChange = (action, data) => {
        switch (action) {
            case "code": {
                setCode(data);
                break;
            }
            default: {
                console.warn("case not handled!", action, data);
            }
        }
    };

    const resetCode = () => {
        console.log("RESET!")
        setCode(props.data.starterCode)
        setReload(true)
        timeFunc();
    }

    const timeFunc = () => {
        setTimeout(() => {
            setReload(false)
        }, 1)
    }

    useEffect(() => {
        resetCode();
    }, [location.pathname])

    const handleCompile = () => {
        setProcessing(true);
        const formData = {
            language_id: 93,
            // encode source code in base64
            source_code: btoa(code),
            // stdin: btoa(customInput),
        };
        console.log('-----')
        console.log('formData on CODEBOX', formData)
        console.log('code on CODEBOX', code)
        const options = {
            method: "POST",
            url: process.env.REACT_APP_RAPID_API_URL,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
            data: formData,
        };

        axios
            .request(options)
            .then(function (response) {
                console.log("res.data", response.data);
                const token = response.data.token;
                checkStatus(token);
            })
            .catch((err) => {
                let error = err.response ? err.response.data : err;
                setProcessing(false);
                console.log(error);
            });
    };

    const checkStatus = async (token) => {
        const options = {
            method: "GET",
            url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
        };
        try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;

            // Processed - we have a result
            if (statusId === 1 || statusId === 2) {
                // still processing
                setTimeout(() => {
                    checkStatus(token)
                }, 2000)
                return
            } else {
                setProcessing(false)
                setOutputDetails(response.data)
                // showSuccessToast(`Compiled Successfully!`)
                console.log('response.data', response.data)
                return
            }
        } catch (err) {
            console.log("err", err);
            setProcessing(false);
            // showErrorToast();
        }
    };

    const getOutput = () => {
        let statusId = outputDetails?.status?.id;
        console.log('outputDetails', outputDetails)
        if (statusId === 6) {
            // compilation error
            return (
                <pre className="px-2 py-1 font-normal text-xs text-red-500">
                    {atob(outputDetails?.compile_output)}
                </pre>
            );
        } else if (statusId === 3) {
            return (
                <h2>
                    {atob(outputDetails.stdout) !== null
                        ? `${atob(outputDetails.stdout)}`
                        : 'NOTHING'}
                </h2>
            );
        } else if (statusId === 5) {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-red-500">
                    {`Time Limit Exceeded`}
                </pre>
            );
        } else {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-red-500">
                    {atob(outputDetails?.stderr)}
                </pre>
            );
        }
    };


    return (
        <>
            <div className="algo-tr">
                {!reload ? (
                    <CodeEditorWindow
                        code={code}
                        onChange={onChange}
                    />
                ) : (
                    <></>
                )}
                <button onClick={handleCompile}>Test</button>
                <button onClick={resetCode}>Reset</button>
            </div>
            <div className="algo-br">
                <h1>
                    Output
                </h1>
                <div className="codeoutput">
                    {outputDetails ? <>{getOutput()}</> : <h2>Nothing!</h2>}
                </div>
            </div>
        </>
    )
}

export default CodeWindows;