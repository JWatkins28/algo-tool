import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown'

const ReadMe = (props) => {

    return (
        <>
            <ReactMarkdown>{props.data}</ReactMarkdown>
        </>
    )
}

export default ReadMe;