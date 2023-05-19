import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Editor from "@monaco-editor/react";
import { Navigate, useParams, useNavigate, useLocation } from "react-router-dom";
import { GET_ALGO } from '../utils/queries'

const CodeEditorWindow = ({ onChange, code }) => {

    const algoId = useParams();
    const algoNum = Number(algoId.algoId || 1)
    const { loading, data, error } = useQuery(GET_ALGO, { variables: { number: algoNum } })
    const algoData = data?.algo
    const [codeValue, setCodeValue] = useState(code || "");

    const handleEditorChange = (value) => {
        setCodeValue(value);
        onChange("code", value);
    };

    return (
        <div className="codebox">
            <Editor
                height="50vh"
                width={`100%`}
                language={"javascript"}
                value={codeValue}
                theme={"vs-dark"}
                defaultValue="// some comment"
                onChange={handleEditorChange}
            />
        </div>
    );
};

export default CodeEditorWindow;