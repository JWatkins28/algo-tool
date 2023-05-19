import React, { useState, useEffect } from "react";
// import CodeEditor from '@monaco-editor-r';
import axios from "axios";

const CodeBox = (props) => {

    const [code, setCode] = useState(props.data);
    const [processing, setProcessing] = useState(null);
    const [outputDetails, setOutputDetails] = useState(null);
    const { updateDetails } = props;

    useEffect(() => {
        if (outputDetails) {
            console.log('-----')
            console.log('outputDetails on CODEBOX updated')

            updateDetails(outputDetails)
        }
    }, [outputDetails])

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


    return (
        <>
            {/* <CodeEditor
                value={code}
                language="js"
                onChange={(e) => setCode(e.target.value)}
                className='codebox'
            /> */}
            <button onClick={handleCompile}>Test</button>
            <button>Reset</button>
        </>
    )
}

export default CodeBox;