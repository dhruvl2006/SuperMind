const generateAnalysis = async (inputValue) => {
    const stream = false;
    const endpoint = `/lf/${process.env.LANGFLOW_ID}/api/v1/run/${process.env.FLOW_ID}?stream=${stream}`;
    const baseURL = "https://api.langflow.astra.datastax.com";
    const url = `${baseURL}${endpoint}`;
    const tweaks = {
        "ChatInput-KxWBy": {},
        "ChatOutput-U8492": {},
        "Prompt-voioz": {},
        "Agent-dodTI": {},
        "GoogleGenerativeAIModel-1cQoY": {},
        "AstraDBToolComponent-i8Tw8": {},
    };
    const body = {
        input_value: inputValue,
        input_type: "text",
        output_type: "chat",
        tweaks: tweaks,
        sender: "client-user",
        sender_name: "client-user",
    };
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.APPLICATION_TOKEN}`,
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        });

        const responseContent = await response.json();
        console.log("Response:", JSON.stringify(responseContent, null, 2));
        if (!response.ok) {
            throw new Error(
                `${response.status} ${response.statusText} - ${JSON.stringify(
                    responseContent
                )}`
            );
        }
        const responseMessage = responseContent.outputs[0].outputs[0].results.message;
        return {
            error: false,
            text: responseMessage.text,
            stats: responseMessage.content_blocks[0].contents[1].output,
        };
    } catch (error) {
        console.error("Request Error:", error.message);
        return {
            error: true,
            text: error.message ? error.message : "Something went wrong",
        };
    }
};

export { generateAnalysis };
