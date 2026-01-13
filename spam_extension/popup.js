async function getEmailFromGmail() {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { action: "GET_EMAIL_TEXT" },
                (response) => {
                    if (chrome.runtime.lastError || !response) {
                        resolve("");
                    } else {
                        resolve(response.text);
                    }
                }
            );
        });
    });
}


document.getElementById("checkBtn").addEventListener("click", async () => {
    let text= await getEmailFromGmail();
    console.log("TEXT FROM GMAIL:", text);
    if (!text) {
        text = document.getElementById("textInput").value;
        console.log("TEXT FROM MANUAL INPUT:", text);
    }

    


    const resultDiv = document.getElementById("result");
    const bar = document.getElementById("spamBar");
    const percentText = document.getElementById("percentText");

    // Reset UI
    resultDiv.className = "result-box";
    bar.style.width = "0%";
    percentText.innerText = "";

    
    resultDiv.innerText = "Analyzing...";

    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        const data = await response.json();
        const prob = data.spam_probability;

        // Set bar width
        bar.style.width = `${prob}%`;
        percentText.innerText = `Spam Probability: ${prob}%`;

        if (prob <= 40) {
            bar.style.backgroundColor = "#16a34a"; // green
            resultDiv.classList.add("safe");
            resultDiv.innerText = "Safe Message";
        } else if (prob>40 && prob < 60) {
            bar.style.backgroundColor = "#f59e0b"; // yellow
            resultDiv.classList.add("warning");
            resultDiv.innerText = "Suspicious Message";
        } else {
            bar.style.backgroundColor = "#dc2626"; // red
            resultDiv.classList.add("danger");
            resultDiv.innerText = "Spam Detected";
        }

    } catch (error) {
        resultDiv.innerText = "Unable to connect to server.";
    }
});


